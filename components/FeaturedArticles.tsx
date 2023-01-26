 /*
 Showing Featured articles and artworks at the home page.
 */

import ArticleTeaser from "./ArticleTeaser";
import { storyblokEditable } from "@storyblok/react";
import styles from '/styles/Home.module.scss'
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2"

 const FeaturedArticles = ({ blok }:any) => {

  const featuredItems = [] as any;
  blok.articles.forEach((article:any) => {
    featuredItems.push(
    <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={article.uuid}> 
    <ArticleTeaser article={article.content} slug={article.full_slug}/>
    </Grid>)
  })

   return (
     <>
     <h2 className="centerTitle" {...storyblokEditable(blok)}><span className={styles.gradient}>{blok.name}</span></h2>
      <Grid container columns={3}>
          {featuredItems}
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
