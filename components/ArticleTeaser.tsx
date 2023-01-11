import Link from "next/link";
import styles from '/styles/Home.module.scss'
import Image from "next/legacy/image";
 
const ArticleTeaser = ({ article, slug }:any) => {
return (
  <div className={styles.postitem}>
    <Link legacyBehavior href="/[...slug]" as={`/${slug}`}>
        <a href="#" aria-label='{p?.title}'>
          <Image alt='{p?.title}' 
          src={article.cover_image.filename} 
          layout='fill' 
          objectFit='cover' 
          objectPosition='center center' 
          quality={70}
          loading="lazy"/></a>
    </Link>
    <div className='postTitle'>
      <span>{article.title}</span>
      <p>{article.published_at}</p>
      {/* <p>{p?.custom_excerpt}</p> */}
    </div>
</div>
)
};
export default ArticleTeaser;