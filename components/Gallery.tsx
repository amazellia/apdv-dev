import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {shimmer, toBase64} from '../styles/blur'
import { useState, useMemo } from 'react';
import { optimizeCloudinaryImage } from '../utils/cloudinary';

const Gallery = ({blok}:any) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  
  const columns:number = (blok.colums === undefined) ? 3 : Number(blok.columns);
  const rowHeight:number = (blok.rowHeight === undefined) ? 164 : Number(blok.rowHeight);
  
  // Calculate responsive sizes based on columns
  const getSizes = () => {
    if (columns === 1) return '100vw';
    if (columns === 2) return '(max-width: 768px) 100vw, 50vw';
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  const handleImageClick = (filename: string) => {
    setSelectedImage(filename);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  // Memoize optimized image URLs to ensure consistency between server and client
  const optimizedImages = useMemo(() => 
    blok.images.map((img: any) => ({
      ...img,
      optimizedUrl: optimizeCloudinaryImage(img.filename, {
        width: 800,
        quality: 85,
        crop: 'limit'
      })
    })),
    [blok.images]
  );

  return ( 
    <>
      <div style={{ width: '100%' }}>
        <ImageList 
          cols={columns} 
          rowHeight={rowHeight}
          sx={{ 
            width: '100%',
            height: 'auto'
          }}
        >
          {optimizedImages.map((img:any, index:number) => (
            <ImageListItem 
              key={img.filename}
              sx={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => handleImageClick(img.filename)}
            >
              <Image 
                src={img.optimizedUrl}
                alt={img.alt || `Gallery image ${index + 1}`}
                fill
                sizes={getSizes()}
                loading={index < 6 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(rowHeight, rowHeight))}`}
                quality={85}
                style={{ 
                  objectFit: 'cover'
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
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
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              zIndex: 1001,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
            aria-label="close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          {selectedImage && (
            <Image
              src={optimizeCloudinaryImage(selectedImage, {
                width: 1920,
                quality: 90,
                crop: 'limit'
              })}
              alt="Fullscreen view"
              width={1920}
              height={1080}
              sizes="100vw"
              quality={90}
              priority
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Gallery;