import styles from '../styles/Home.module.scss';
import Link from "next/link";
import Header from "./Header";
import Content from './Content';

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArticleItems = ( {blok} :any) => {
  return ( <div className="section">
    <Header name={blok.headerName} meta={blok.meta}/> 
      <h1 className={styles.gradient}>{blok.title}</h1>
      <h2 className={styles.centerHeading}>{blok.subTitle}</h2>
      <p className={styles.centerHeading}>
        {(blok.mode === 'work') && <><Link href='/artworks'>🎨 view artworks</Link> | </>}
        {(blok.mode === 'artworks') && <><Link href='/works'>🌸 view all works</Link> | </>}
        <Link href='/archive'>🗂️ view in archive</Link> |  
        <Link href="https://dashboard.mailerlite.com/forms/406995/85796975888303772/share"> 💌 subscribe</Link>
      </p>
       <Content tag={""} slugs={blok.mode}/>
  </div>
  );
};
export default ArticleItems;