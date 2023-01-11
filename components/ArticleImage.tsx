//add component to _app.tsx
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

let url = 'https://res.cloudinary.com/hizgjp0fn/image/upload/'

const  ArticleImage = (blok:any) => {
  let img = blok.blok;
//  let obj:any = null;
//   async function imgInfo() { 
//     try {
//       obj = await ( await fetch(`${url}fl_getinfo/${img.src.split(url).join('')}`)).json()} 
//       catch(e) {
//       console.log('error');
//     } console.log(obj);
// }
//   imgInfo();
  return (
    <div>
      <ImageList variant="masonry" cols={1} gap={0}>
        <ImageListItem >
            <img 
            src={img.src}
            alt={img.alt}
            loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
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