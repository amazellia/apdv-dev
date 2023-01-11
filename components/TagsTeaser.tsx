import Link from "next/link";
import styles from '/styles/Home.module.scss'
import Image from "next/legacy/image";
 
const TagsTeaser = ({ tag, slug }:any) => {
return (
  <div className={styles.postitem}>
    <Link legacyBehavior href="/archives/[archives]" as={`/archives/${tag.name}`}>
        <a href="#" aria-label='{p?.title}'>
          <Image alt='{p?.title}' 
          src={tag.image.filename} 
          layout='fill' 
          objectFit='cover' 
          objectPosition='center center' 
          quality={70}
          loading="lazy"/></a>
    </Link>
    <div className='postTitle'>
      <span>{tag.name}</span>
      <p>{tag.description}</p>
    </div>
</div>
)
};
export default TagsTeaser;