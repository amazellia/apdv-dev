import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {shimmer, toBase64} from '../styles/blur'
import { useState } from 'react';
import { optimizeCloudinaryImage } from '../utils/cloudinary';

const SingleImage = (blok:any) => {
  const data = blok.blok;
  const [open, setOpen] = useState(false);

  // Use actual image dimensions if available, otherwise use sensible defaults
  const imgWidth = data.width || 1200;
  const imgHeight = data.height || 800;
  const aspectRatio = imgWidth / imgHeight;

  const handleImageClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span 
        style={{ 
          cursor: 'pointer', 
          display: 'block', 
          maxWidth: '100%',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
        onClick={handleImageClick}
        onTouchStart={handleImageClick}
      >
        <Image 
          src={optimizeCloudinaryImage(data.src, {
            width: imgWidth,
            height: imgHeight,
            quality: 85,
            crop: 'limit'
          })}
          alt={data.alt || 'Image'}
          width={imgWidth}
          height={imgHeight}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(imgWidth, imgHeight))}`}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          style={{ 
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            pointerEvents: 'auto'
          }}
        />
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullScreen={false}
        sx={{
          '& .MuiDialog-paper': {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderRadius: 0,
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
            margin: 0,
            overflow: 'hidden',
          }}
        >
          <IconButton
            onClick={handleClose}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              zIndex: 1001,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              minWidth: '48px',
              minHeight: '48px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
              '@media (max-width: 768px)': {
                top: 12,
                right: 12,
                minWidth: '44px',
                minHeight: '44px',
              },
            }}
            aria-label="close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <Image
            src={optimizeCloudinaryImage(data.src, {
              width: imgWidth,
              height: imgHeight,
              quality: 90,
              crop: 'limit'
            })}
            alt={data.alt || 'Fullscreen view'}
            width={imgWidth}
            height={imgHeight}
            sizes="100vw"
            quality={90}
            priority
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              touchAction: 'manipulation',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SingleImage;

// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`

// const toBase64 = (str: string) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)
