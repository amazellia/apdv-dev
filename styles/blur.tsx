export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g-${w}-${h}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#404040" stop-opacity="1" />
      <stop offset="50%" stop-color="#606060" stop-opacity="1" />
      <stop offset="100%" stop-color="#404040" stop-opacity="1" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#2a2a2a" />
  <rect id="r-${w}-${h}" width="${Math.max(200, w * 0.3)}" height="${h}" fill="url(#g-${w}-${h})" opacity="0.8">
    <animate 
      xlink:href="#r-${w}-${h}" 
      attributeName="x" 
      from="-${Math.max(200, w * 0.3)}" 
      to="${w}" 
      dur="1.5s" 
      repeatCount="indefinite" 
      calcMode="linear"
    />
  </rect>
</svg>`

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)