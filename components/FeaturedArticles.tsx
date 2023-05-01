import ArticleTeaser from "./ArticleTeaser";
import { storyblokEditable } from "@storyblok/react";
import styles from '/styles/Home.module.scss'
import Link from "next/link";

 const FeaturedArticles = ({ blok }:any) => {
  const featuredItems = [] as any;
  blok.articles.forEach((article:any) => {
    featuredItems.push(
    <ArticleTeaser article={article.content} slug={article.full_slug} view="grid" id={article.uuid}/>)
  })

   return (
     <>
     <h2 className="centerTitle" {...storyblokEditable(blok)}><span className={styles.gradient}>{blok.name}</span></h2>
      <div className={styles.itemGrid}>
      {featuredItems}
      </div>
      <div className={styles.seeMoreButton} > 
      <Link href={blok.url}><button>
            View more
        </button></Link>
      </div>
     </>
   );
 };
 export default FeaturedArticles;
