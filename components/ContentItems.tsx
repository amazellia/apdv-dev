import { useQuery } from "@apollo/client";
import { useState} from "react";
import styles from '../styles/Home.module.scss';
import Link from "next/link";
import Header from "./Header";
import { getContentItems } from "../pages/api/apollo";
import Content from './Content';

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArticleItems = ( {blok} :any) => {
  const [tag, setTag] = useState("")
  const [mode, setMode] = useState((blok.mode === "work") ? "projects/*,artworks/*" : `${blok.mode}/*`);
  const buttons = [] as any; var buttonModes = [] as any;

  const {data, error, loading} = useQuery(getContentItems, {
    variables: { tag: tag, slugs: mode},  });
  if (error) return <div>errors</div>;

  if (data && blok.mode === "work") {buttonModes = data?.ConfigItem?.content?.work_buttons}
  if (data && blok.mode == "blog" ) { buttonModes = data?.ConfigItem?.content?.blog_buttons;}
  if (data && blok.mode == "artworks") {buttonModes = data?.ConfigItem?.content?.artwork_buttons;}
  buttonModes.forEach((x:string) => {buttons.push(<button key={x} value={x} onClick={(e) => handleTag(e)}><b>{x}</b></button>);})
 
  const handleTag = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); const filter = e?.currentTarget.value;
    if (filter === "project") {setTag(''); setMode("projects/*");} 
    else if (filter ==="art") {setTag(''); setMode("artworks/*");} 
    else {setTag(filter); setMode((blok.mode === "work") ? "projects/*,artworks/*" : `${blok.mode}/*`)}
  };
  return ( <>
    <Header name={blok.headerName} meta={blok.meta}/> 
    {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>
      <h1 className={styles.gradient}>{blok.title}</h1>
      <h2 className={styles.centerHeading}>{blok.subTitle}</h2>
      <p className={styles.centerHeading}>
        {(blok.mode === 'work') && <><Link href='/artworks'>🎨 view artworks</Link> | </>}
        {(blok.mode === 'artworks') && <><Link href='/works'>🌸 view all works</Link> | </>}
        <Link href='/archive'>🗂️ view in archive</Link> |  
        <Link href="https://dashboard.mailerlite.com/forms/406995/85796975888303772/share"> 💌 subscribe</Link>
      </p>
      <div className={styles.filterNav} > 
         <button value="" onClick={(e) => handleTag(e)}><b>all</b></button>
         {buttons}
       </div>
       <Content tag={tag} slugs={mode}/>
    </>}
  </>
  );
};
export default ArticleItems;