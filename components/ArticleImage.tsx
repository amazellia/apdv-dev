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
            height={800}
            loading="lazy"
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