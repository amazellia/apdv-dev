//add component to _app.tsx
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const  ArticleImage = (blok:any) => {
  let img = blok.blok;
  return (
    <div>
      <ImageList variant="masonry" cols={1} gap={0}>
        <ImageListItem >
        <Image 
            src={img.src}
            alt={img.alt}
            width={800}
            height={800}placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            quality={80}
            />
            <ImageListItemBar
              actionIcon={
                <a target="_blank" href={img.src} rel="noopener noreferrer">
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`zoom ${img.alt}`}
                >
                  <FontAwesomeIcon icon={faExpand}/>
                </IconButton>
                </a>
              }
              actionPosition="right"
            />
         </ImageListItem>
    </ImageList>
    </div>    
  );
};
export default ArticleImage;

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
