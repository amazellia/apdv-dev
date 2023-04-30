import Link from "next/link";
import styles from '/styles/Home.module.scss'
import Image from "next/image";
import { motion } from "framer-motion";

const ArticleTeaser = ({ article, slug, tag, view, key}:any) => {
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
  <div className={styles.itemContainer} key={key}>
    <div className={styles.postitem}>
      <Link href={ref} as={asURL} aria-label={article.title || article.name}>
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
      </Link>
      <div className={styles.postTitle}>
        <span>{article.title || article.name}</span>
        <p>{article.published_at || ''}</p>
        {/* <p>{p?.custom_excerpt}</p> */}
      </div>
    </div>
  </div>
  :
  <div className={styles.listContainer} key={key}>
    <div className={styles.listImage}>
    <Link href={ref} as={asURL} aria-label={article.title || article.name}>
      <Image 
      alt={article.title || article.name}
      src={filename}
      fill
      style={{objectFit:"cover", objectPosition: "center center"}}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 700))}`} //475
      quality={70}
      priority
      />
    </Link> 
    </div>
   <div className={styles.listText}>
       <Link href={ref} as={asURL} aria-label={article.title || article.name}>
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

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
