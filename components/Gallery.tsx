import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ImageGallery from 'react-image-gallery';

const Gallery = ({blok}:any) => {
  var columns:any = (blok.colums === undefined) ?  (Math.ceil(((blok.images).length)/3)): Number(blok.columns) ;
  var type:any = (blok.variant === undefined) ?  "masonry" : blok.variant;
  
  let images = [] as any; 
  blok.images.map((img:any) =>
  images.push( 
    {
      original: img.filename,
      thumbnail:img.filename,
      originalAlt: img.alt,
    }
  ))
  return ( 

    ( (blok.type === "gallery") ?
    <ImageGallery 
      items={images} 
      additionalClass="image-gallery"
      showIndex= {false}
      showBullets= {true}
      infinite= {true}
      showThumbnails= {true}
      showFullscreenButton= {true}
      showPlayButton= {true}
      showNav= {true}
      isRTL= {false}
      slideDuration= {450}
      slideInterval= {2000}
      slideOnThumbnailOver= {false}
      thumbnailPosition= {'bottom'}
    />
    :
    <ImageList 
    variant={type} cols={columns} gap={8}
    >
      {blok.images.map((img:any) => (
        <ImageListItem key={img.filename}  >
            <Image 
            src={img.filename}
            alt={img.alt}
            width={800}
            height={800}
            loading="lazy"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
            <ImageListItemBar
             sx={{  background: 'none', fontSize: '130%', marginBottom: '1%', marginRight: '1%'}}
              actionIcon={
                <a target="_blank" href={img.filename} rel="noopener noreferrer" >
                  <IconButton
                    sx={{ color: 'white', fontSize: '130%',"&:hover": 'transform: scale(1.5)'}}
                    aria-label={`zoom ${img.filename}`}
                  >
                    <FontAwesomeIcon icon={faExpand}/>
                  </IconButton>
                </a>
              }
              actionPosition="right"
            />
         </ImageListItem>
      ))}
    </ImageList>)

  );
};
export default Gallery;


const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
