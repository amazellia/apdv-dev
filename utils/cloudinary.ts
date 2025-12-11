// Simple cache to ensure deterministic output for hydration
const urlCache = new Map<string, string>();

/**
 * Optimizes Cloudinary image URLs with transformation parameters
 * Based on Cloudinary transformation reference: https://cloudinary.com/documentation/transformation_reference
 * 
 * @param url - The Cloudinary image URL
 * @param options - Optional transformation parameters
 * @returns Optimized Cloudinary URL with transformations
 */
export function optimizeCloudinaryImage(
  url: string | undefined | null,
  options?: {
    width?: number | string;
    height?: number | string;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
    crop?: 'limit' | 'fill' | 'fit' | 'scale' | 'thumb';
    progressive?: boolean;
    dpr?: number | 'auto';
  }
): string {
  if (!url) return '';
  
  // Pre-process URL to remove w_auto if present (handles URLs coming directly from CMS)
  // Remove w_auto from transformation strings and clean up resulting artifacts
  let cleanedUrl = url;
  // Match transformation strings in the URL path (between /upload/ and version or public_id)
  cleanedUrl = cleanedUrl.replace(/(\/upload\/)([^\/]+)(\/)/g, (match: string, prefix: string, transformations: string, suffix: string) => {
    // Remove w_auto from transformation string and clean up commas
    const cleaned = transformations
      .split(',')
      .filter((t: string) => t.trim() !== '' && !t.trim().startsWith('w_auto') && !t.trim().includes('w_auto'))
      .join(',');
    return cleaned ? `${prefix}${cleaned}${suffix}` : `${prefix}${suffix}`;
  });
  // Also handle case where w_auto might be standalone
  cleanedUrl = cleanedUrl.replace(/w_auto/g, '').replace(/,,+/g, ',').replace(/(^,|,$)/g, '').replace(/\/,\//g, '//');
  
  // Create cache key from cleaned URL and options
  const cacheKey = JSON.stringify({ url: cleanedUrl, options });
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!;
  }
  
  let result: string;
  
  // If it's not a Cloudinary URL, return as-is
  if (!cleanedUrl.includes('res.cloudinary.com')) {
    result = cleanedUrl;
    urlCache.set(cacheKey, result);
    return result;
  }

  // Parse the Cloudinary URL
  // Format: https://res.cloudinary.com/{cloud_name}/{resource_type}/{type}/[{transformation}/][{version}/]{public_id}.{format}
  const urlParts = cleanedUrl.split('/');
  const cloudinaryIndex = urlParts.findIndex(part => part === 'res.cloudinary.com');
  
  if (cloudinaryIndex === -1) {
    return cleanedUrl;
  }

  // Extract components
  const cloudName = urlParts[cloudinaryIndex + 1];
  const resourceType = urlParts[cloudinaryIndex + 2] || 'image';
  const type = urlParts[cloudinaryIndex + 3] || 'upload';
  
  // Find where the public_id starts
  // Check for existing transformations (contain underscores/commas) or version numbers
  let publicIdStartIndex = cloudinaryIndex + 4;
  let version = '';
  let existingTransformations = '';
  
  // Check if there's already a transformation string (contains underscores, commas, or common transformation patterns)
  if (urlParts[publicIdStartIndex] && (
    urlParts[publicIdStartIndex].includes('_') || 
    urlParts[publicIdStartIndex].includes(',') ||
    /^(f_|q_|w_|h_|c_|fl_|dpr_)/.test(urlParts[publicIdStartIndex])
  )) {
    // This is likely an existing transformation
    existingTransformations = urlParts[publicIdStartIndex];
    publicIdStartIndex++;
  }
  
  // Check if there's a version number
  if (urlParts[publicIdStartIndex] && /^v\d+$/.test(urlParts[publicIdStartIndex])) {
    version = urlParts[publicIdStartIndex];
    publicIdStartIndex++;
  }
  
  // Parse and clean existing transformations - remove w_auto which causes SSR timeouts
  // Use a Map to deduplicate and ensure deterministic processing
  let cleanedExistingTransformationsMap: Map<string, string> = new Map();
  if (existingTransformations) {
    existingTransformations
      .split(',')
      .map(t => t.trim())
      .filter(t => {
        // Remove w_auto, empty strings, and any transformation containing w_auto
        return t !== '' && !t.startsWith('w_auto') && !t.includes('w_auto');
      })
      .forEach(t => {
        const prefix = t.match(/^([a-z]+)_/)?.[1];
        if (prefix) {
          // Keep the first occurrence of each transformation type
          if (!cleanedExistingTransformationsMap.has(prefix)) {
            cleanedExistingTransformationsMap.set(prefix, t);
          }
        }
      });
  }
  const cleanedExistingTransformations = Array.from(cleanedExistingTransformationsMap.values());
  
  // Get the public_id (everything after type/version, before query params)
  const remainingPath = urlParts.slice(publicIdStartIndex).join('/');
  // Remove query parameters to ensure deterministic URLs (they can cause hydration mismatches)
  const [publicIdWithExt] = remainingPath.split('?');
  
  // Remove extension from public_id if present
  const publicId = publicIdWithExt.replace(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i, '');
  
  // Build transformation parameters using a map to handle overrides
  // Key is transformation prefix (f, q, w, h, c, fl, dpr), value is full transformation string
  const transformations: Map<string, string> = new Map();
  
  // Helper to get transformation prefix
  const getPrefix = (t: string): string => {
    const match = t.match(/^([a-z]+)_/);
    return match ? match[1] : '';
  };
  
  // If options are provided, rebuild from scratch for complete determinism
  // Otherwise, use cleaned existing transformations
  const rebuildFromScratch = options && (
    options.width !== undefined ||
    options.height !== undefined ||
    options.quality !== undefined ||
    options.format !== undefined ||
    options.crop !== undefined ||
    options.progressive !== undefined ||
    options.dpr !== undefined
  );
  
  // Start with cleaned existing transformations only if not rebuilding from scratch
  if (!rebuildFromScratch) {
    cleanedExistingTransformations.forEach(t => {
      const prefix = getPrefix(t);
      if (prefix) {
        transformations.set(prefix, t);
      }
    });
  }
  
  // Apply new options (always override when provided)
  // Format: f_auto for automatic format selection (WebP, AVIF when supported)
  if (options?.format === 'auto' || !options?.format) {
    transformations.set('f', 'f_auto');
  } else if (options?.format) {
    transformations.set('f', `f_${options.format}`);
  }
  
  // Quality: q_auto for automatic quality optimization, or use specified quality
  if (options?.quality === 'auto') {
    transformations.set('q', 'q_auto');
  } else if (options?.quality !== undefined && options?.quality !== null) {
    transformations.set('q', `q_${options.quality}`);
  } else if (!transformations.has('q')) {
    // Default to auto quality if not specified and not in existing
    transformations.set('q', 'q_auto');
  }
  
  // Progressive JPEG for better perceived performance
  if (options?.progressive !== false) {
    transformations.set('fl', 'fl_progressive');
  }
  
  // Width - avoid 'auto' as it requires Client Hints and causes SSR timeouts
  // If width is 'auto', skip it - let Next.js Image handle responsive sizing
  if (options?.width && options.width !== 'auto') {
    transformations.set('w', `w_${options.width}`);
  }
  // Explicitly remove w_auto if it somehow got in
  if (transformations.has('w') && transformations.get('w')?.startsWith('w_auto')) {
    transformations.delete('w');
  }
  
  // Height
  if (options?.height) {
    transformations.set('h', `h_${options.height}`);
  }
  
  // Crop mode
  if (options?.crop) {
    transformations.set('c', `c_${options.crop}`);
  } else if ((options?.width || options?.height) && !transformations.has('c')) {
    // Default to limit crop to maintain aspect ratio when dimensions are specified
    transformations.set('c', 'c_limit');
  }
  
  // DPR (Device Pixel Ratio) for retina displays
  if (options?.dpr === 'auto' || options?.dpr) {
    transformations.set('dpr', `dpr_${options.dpr}`);
  }
  
  // Build the optimized URL - ensure consistent order for hydration
  // Order: f (format), q (quality), w (width), h (height), c (crop), fl (flags), dpr (device pixel ratio)
  const transformationOrder = ['f', 'q', 'w', 'h', 'c', 'fl', 'dpr'];
  const transformationString = transformationOrder
    .map(key => transformations.get(key))
    .filter((t): t is string => {
      // Filter out w_auto and any transformation containing w_auto
      return !!t && !t.startsWith('w_auto') && !t.includes('w_auto');
    })
    .join(',');
  const baseUrl = `https://res.cloudinary.com/${cloudName}/${resourceType}/${type}`;
  const versionPrefix = version ? `${version}/` : '';
  
  // Construct the optimized URL with transformations
  // Don't preserve query parameters to ensure deterministic URLs
  result = `${baseUrl}/${transformationString}/${versionPrefix}${publicId}`;
  
  // Cache the result for consistency
  urlCache.set(cacheKey, result);
  return result;
}

/**
 * Optimizes Cloudinary video URLs with transformation parameters
 * 
 * @param url - The Cloudinary video URL
 * @param options - Optional transformation parameters
 * @returns Optimized Cloudinary URL with transformations
 */
export function optimizeCloudinaryVideo(
  url: string | undefined | null,
  options?: {
    width?: number | string;
    height?: number | string;
    quality?: number | 'auto';
    format?: 'auto' | 'mp4' | 'webm';
    bitRate?: number | string;
  }
): string {
  if (!url) return '';
  
  // If it's not a Cloudinary URL, return as-is
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  // Parse the Cloudinary URL
  const urlParts = url.split('/');
  const cloudinaryIndex = urlParts.findIndex(part => part === 'res.cloudinary.com');
  
  if (cloudinaryIndex === -1) {
    return url;
  }

  // Extract components
  const cloudName = urlParts[cloudinaryIndex + 1];
  const resourceType = urlParts[cloudinaryIndex + 2] || 'video';
  const type = urlParts[cloudinaryIndex + 3] || 'upload';
  
  // Find where the public_id starts
  let publicIdStartIndex = cloudinaryIndex + 4;
  let version = '';
  
  if (urlParts[publicIdStartIndex] && /^v\d+$/.test(urlParts[publicIdStartIndex])) {
    version = urlParts[publicIdStartIndex];
    publicIdStartIndex++;
  }
  
  const remainingPath = urlParts.slice(publicIdStartIndex).join('/');
  const [publicIdWithExt, queryString] = remainingPath.split('?');
  const publicId = publicIdWithExt.replace(/\.(mp4|webm|mov|avi|mkv)$/i, '');
  
  // Build transformation parameters
  const transformations: string[] = [];
  
  // Format: f_auto for automatic format selection
  if (options?.format === 'auto' || !options?.format) {
    transformations.push('f_auto');
  } else {
    transformations.push(`f_${options.format}`);
  }
  
  // Quality: q_auto for automatic quality optimization, or use specified quality
  if (options?.quality === 'auto') {
    transformations.push('q_auto');
  } else if (options?.quality !== undefined && options?.quality !== null) {
    transformations.push(`q_${options.quality}`);
  } else {
    // Default to auto quality if not specified
    transformations.push('q_auto');
  }
  
  // Width - avoid 'auto' as it requires Client Hints and causes SSR timeouts
  // If width is 'auto', skip it - let Next.js Image handle responsive sizing
  if (options?.width && options.width !== 'auto') {
    transformations.push(`w_${options.width}`);
  }
  
  // Height
  if (options?.height) {
    transformations.push(`h_${options.height}`);
  }
  
  // Bit rate for video compression
  if (options?.bitRate) {
    transformations.push(`br_${options.bitRate}`);
  }
  
  // Build the optimized URL
  const transformationString = transformations.join(',');
  const baseUrl = `https://res.cloudinary.com/${cloudName}/${resourceType}/${type}`;
  const versionPrefix = version ? `${version}/` : '';
  const optimizedUrl = `${baseUrl}/${transformationString}/${versionPrefix}${publicId}`;
  
  return queryString ? `${optimizedUrl}?${queryString}` : optimizedUrl;
}

