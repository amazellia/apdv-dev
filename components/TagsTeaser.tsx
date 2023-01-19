import Link from "next/link";
import styles from '/styles/Home.module.scss'
import Image from "next/legacy/image";
import { motion } from "framer-motion";
 
const TagsTeaser = ({ tag, slug }:any) => {
return (
  <motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  whileInView="onscreen"
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <div className={styles.postitem}>
    <Link legacyBehavior href="/archive/[archive]" as={`/archive/${tag.name}`}>
        <a href="#" aria-label={tag.name}>
          <Image 
          alt={tag.name}
          src={tag.image.filename} 
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          layout='fill' 
          objectFit='cover' 
          objectPosition='center center' 
          quality={70}
          /></a>
    </Link>
    <div className='postTitle'>
      <span>{tag.name}</span>
      <p>{tag.description}</p>
    </div>
</div>
</motion.div>
)
};
export default TagsTeaser;


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
