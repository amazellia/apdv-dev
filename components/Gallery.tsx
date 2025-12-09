import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {shimmer, toBase64} from '../styles/blur'

const Gallery = ({blok}:any) => {
  const type:any = (blok.variant === undefined) ?  "masonry" : blok.variant;
  const columns:number = (blok.colums === undefined) ?  (Math.ceil(((blok.images).length)/3)): Number(blok.columns) ;
  const rowHeight:number = Number(blok.rowHeight);
  const gap:number = (blok.gap === undefined) ? 8 : Number(blok.gap);
  
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

    ( (blok.type === "carousel") ?
    <div className='carousel-gallery-container'>
    <ImageGallery 
      items={images} 
      additionalClass="carousel-gallery"
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
    </div>
    :
    <ImageList 
    variant={type} 
    cols={columns} 
    gap={gap} 
    // rowHeight={rowHeight}
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
                    sx={{ color: 'white', fontSize: '130%'}}
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