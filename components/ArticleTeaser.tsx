import Link from "next/link";
import styles from '../styles/Home.module.scss'
import Image from "next/image";
import { motion } from "framer-motion";
import {shimmer, toBase64} from '../styles/blur'

const ArticleTeaser = ({ article, slug, tag, view}:any) => {
  var ref:any = (tag === true) ?  "/archive/[archive]": "/[...slug]";
  var asURL:any = (tag === true) ? `/archive/${slug}` : `/${slug}`;
  var filename:any = (article.cover_image === undefined) ?  article.content[0].images[0].filename : article.cover_image.filename;
return (
  <motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  whileInView="onscreen"
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
> 
{(view == "grid") ?
  <div className={styles.itemContainer}>
      <Link href={ref} as={asURL} aria-label={article.title || article.name} >
        <div className={styles.postitem}>
        <Image 
        alt={article.title || article.name}
        src={filename}
        fill
        sizes="70vw"
        style={{objectFit:"cover", objectPosition: "center center"}}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 700))}`} //475
        quality={70}
        priority
        />
        </div>
      </Link>
      <div className={styles.postTitle}>
        <span>{article.title || article.name}</span>
        <p>{article.published_at || ''}</p>
        {/* <p>{p?.custom_excerpt}</p> */}
      </div>
    </div>
  :
  <div className={styles.listContainer}>
    <Link href={ref}  as={asURL} aria-label={article.title || article.name}>
    <div className={styles.listImage}>
      <Image 
      alt={article.title || article.name}
      src={filename}
      fill
      style={{objectFit:"cover", objectPosition: "center center"}}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 700))}`} //475
      quality={70}
      priority
      /></div>
    </Link> 
   <div className={styles.listText}>
       <Link href={ref}  as={asURL} aria-label={article.title || article.name}> 
       <h2>{article.title || article.name}</h2>
       </Link>
       <p>{article.published_at || ''}</p>
      <p>{article?.custom_excerpt}</p> 
     </div>
   </div>
  }
</motion.div>
)
};
export default ArticleTeaser;