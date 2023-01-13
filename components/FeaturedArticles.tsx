 /*
 Showing Featured articles and artworks at the home page.
 */

 import ArticleTeaser from "./ArticleTeaser";
 import { storyblokEditable } from "@storyblok/react";
 import styles from '/styles/Home.module.scss'
 import Link from "next/link";
 import Grid from "@mui/material/Unstable_Grid2"
import { ListItem } from "@mui/material";

 const FeaturedArticles = ({ blok }:any) => {
   return (
     <>
     <h2 className="centerTitle" {...storyblokEditable(blok)}><span className='gradient'>{blok.name}</span></h2>
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
      <div className={styles.seeMoreButton} > 
      <Link href={blok.url}><button>
            View more
        </button></Link>
      </div>
     </>
   );
 };
 export default FeaturedArticles;
