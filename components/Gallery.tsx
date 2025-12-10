import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {shimmer, toBase64} from '../styles/blur'
import { useState } from 'react';

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

  const handleImageClick = (img: any) => {
    setSelectedImage(img.filename);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

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
          {blok.images.map((img:any, index:number) => (
            <ImageListItem 
              key={img.filename}
              sx={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              onClick={() => handleImageClick(img)}
            >
              <Image 
                src={img.filename}
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
              zIndex: 1,
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
              src={selectedImage}
              alt="Fullscreen view"
              width={1920}
              height={1080}
              sizes="95vw"
              quality={90}
              priority
              style={{
                maxWidth: '95vw',
                maxHeight: '95vh',
                objectFit: 'contain',
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Gallery;