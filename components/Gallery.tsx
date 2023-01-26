import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Gallery = ({blok}:any) => {
  var columns:any = (blok.colums === undefined) ?  (Math.ceil(((blok.images).length)/3)): Number(blok.columns) ;
  var type:any = (blok.variant === undefined) ?  "masonry" : blok.variant;
  return ( 
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
            quality={80}
            />
            <ImageListItemBar
              actionIcon={
                <a target="_blank" href={img.filename} rel="noopener noreferrer">
                <IconButton
                  sx={{ color: 'white' }}
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
    </ImageList>
  );
};
export default Gallery;