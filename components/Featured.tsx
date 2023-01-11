 /*
 Showing Featured articles and artworks at the home page.
 */

 import ArticleTeaser from "./ArticleTeaser";
 import { storyblokEditable } from "@storyblok/react";
 import styles from '/styles/Home.module.scss'
 import Link from "next/link";
 import Grid from "@mui/material/Unstable_Grid2"
import { ListItem } from "@mui/material";

 const Featured = ({ blok }:any) => {
   return (
     <>
     <h2 className='centerTitle gradient' {...storyblokEditable(blok)}>{blok.name}</h2>
      <Grid container columns={3}>
      {blok.articles.map((article:any) => {
          //article.content.slug = article.slug
          return ( 
            <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={article.uuid} >
              <ListItem  >
                <ArticleTeaser article={article.content} slug={article.full_slug}/>
              </ListItem>     
          </Grid>    
          )
        })}        
      </Grid>
       <Link className={styles.seeMoreButton} href={blok.name}>
					<button>View more</button>
				</Link>
     </>
   );
 };
 export default Featured;
