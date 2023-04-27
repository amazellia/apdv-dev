import styles from '/styles/Home.module.scss'
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
 const SubButton = ({blok}:any) => {
   return (
    <div className={styles.subscribeForm} {...storyblokEditable(blok)}>
      <h2 {...storyblokEditable(blok)}>{!blok?.Title ? "Newsletter" : blok?.Title}</h2>
      <p {...storyblokEditable(blok)}>{!blok?.Description ? "Keep yourself up to date with art + tech news and tutorials with insights on my journey - it's free!" : blok?.Description}</p>
      <div className={styles.SubButton} > 
      <Link href={!blok?.Link ? "https://dashboard.mailerlite.com/forms/406995/85796975888303772/share": blok?.Link} {...storyblokEditable(blok)}>
        <button {...storyblokEditable(blok)}>
        {!blok?.buttonName ? "Subscribe": blok?.buttonName}
      </button></Link>
      </div>
    </div>
   );
 };
 export default SubButton;
