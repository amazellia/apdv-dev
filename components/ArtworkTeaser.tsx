import Link from "next/link";
import styles from '/styles/Home.module.scss'
import Image from "next/legacy/image";
 
const ArtworkTeaser = ({ artwork, slug }:any) => {
return (
  <div className={styles.postitem}>
    <Link legacyBehavior href="/[...slug]" as={`/${slug}`}>
        <a href="#" aria-label='{p?.title}'>
          <Image alt='{p?.title}' 
          src={artwork.content[0].images[0].filename} 
          layout='fill' 
          objectFit='cover' 
          objectPosition='center center' 
          quality={70}
          loading="lazy"/></a>
    </Link>
    <div className='postTitle'>
      <span>{artwork.title}</span>
      {/* <p>{p?.custom_excerpt}</p> */}
    </div>
</div>
)
};
export default ArtworkTeaser;