import { Container, useMediaQuery, useTheme } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
    StoryblokComponent,
    storyblokEditable
  } from "@storyblok/react";
import { useRouter } from 'next/router';
import Header from './Header';
import Giscus from './Giscus';
import Image from 'next/image';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/* 
const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS
*/

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const Artwork = ({blok}:any) => {
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Responsive column count
  const getCols = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  // Extract all images from content
  const extractImages = (content: any[]): any[] => {
    const images: any[] = [];
    
    content?.forEach((item: any) => {
      if (item.component === 'gallery' && item.images) {
        // Gallery has an array of images
        item.images.forEach((img: any) => {
          images.push({
            src: img.filename,
            alt: img.alt || 'Gallery image',
            width: img.width || 800,
            height: img.height || 600,
          });
        });
      } else if (item.component === 'singleimage' || item.component === 'image') {
        // Single image component
        images.push({
          src: item.src || item.filename,
          alt: item.alt || 'Image',
          width: item.width || 1200,
          height: item.height || 800,
        });
      }
    });
    
    return images;
  };

  const allImages = extractImages(blok.content || []);
  const imageCount = allImages.length;
  const isSingleImage = imageCount === 1;
  const isMultipleImages = imageCount > 1;

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
     <div className='section'>
      <Header name={blok.name} meta={blok.metaDescription}/>

      {isSingleImage ? (
        // Full screen layout for single image
        <Container maxWidth={false} {...storyblokEditable(blok)} sx={{ padding: 0 }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
            <Image
              src={allImages[0].src}
              alt={allImages[0].alt}
              width={allImages[0].width}
              height={allImages[0].height}
              quality={100}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                height: 'auto',
                objectFit: 'contain',
                cursor: 'pointer'
              }}
              onClick={() => handleImageClick(allImages[0].src)}
            />
          </div>
        </Container>
      ) : isMultipleImages ? (
        // Masonry grid layout for multiple images using MUI
        <Container {...storyblokEditable(blok)}>
          <ImageList 
            variant="masonry" 
            cols={getCols()} 
            gap={16}
            sx={{
              width: '100%',
            }}
          >
            {allImages.map((img: any, index: number) => (
              <ImageListItem 
                key={`${img.src}-${index}`}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  quality={85}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      ) : (
        // Default layout for non-image content
        <Container {...storyblokEditable(blok)}>
          {blok.content.map((item:any) => (
            <StoryblokComponent blok={item} key={item._uid}/>
          ))}
        </Container>
      )}

      <div style={{ textAlign: 'center', padding: '2rem 0', margin: '2rem auto', maxWidth: '800px' }}>
        <h1 className='title'>{blok.name}</h1>
        <p>{blok.description}</p>
      </div>

      {/* Image dialog for fullscreen view */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '95vw',
            maxHeight: '95vh',
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
            minHeight: '95vh',
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
    </div>
    <Giscus />
    </>
   
  );
};
export default Artwork;

/*
  <div className='section'>
  <Script async src="https://talk.hyvor.com/embed/embed.js" type="module" strategy='lazyOnload'/>

<p>{blok.description}</p> ... add after this line
<div className='hyvorTalk'> 
<hyvor-talk-comments website-id={HYVOR_ID} page-id={slug} />
</div>
*/