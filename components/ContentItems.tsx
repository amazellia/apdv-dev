import dynamic from 'next/dynamic'
const ArticleTeaser = dynamic(() => import("../components/ArticleTeaser"))
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"
import styles from '../styles/Home.module.scss';
import Link from "next/link";
import Header from "./Header";
import { motion } from "framer-motion";
import { getArchives} from "../pages/api/storyblok";
import moment from "moment";

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArticleItems = ( {blok} :any) => {
  const [tag, setTag] = useState("")
  const [folder, setFolder] = useState("")
  const [mode, setMode] = useState((blok.mode === "work") ? "projects/" : blok.mode);
  const buttons = [] as any;
  const {data, error, loading, fetchMore} = useQuery(getArchives, {
    variables: { 
		tag: tag,
    limit: 100, 
    slug: mode,
    artworkItems: folder,
    }
  });
  if (error) return <div>errors</div>;
  
  var buttonModes = [] as any;
	var content_all:any;
  if (data && blok.mode === "work") {
		const raw = [...data?.ArticleItems?.items, ...data?.ArtworkItems?.items]
    content_all = raw.sort((a:any,b:any) => moment(b.first_published_at).diff(a.first_published_at));
    buttonModes = data?.ConfigItem?.content?.work_buttons
  }
 if (data && blok.mode == "blog" ) { 
    content_all = data.ArticleItems.items; 
    buttonModes = data?.ConfigItem?.content?.blog_buttons;
  }
 if (data && blok.mode == "artworks") {
    content_all = data.ArtworkItems.items; 
    buttonModes = data?.ConfigItem?.content?.artwork_buttons;
  }
  buttonModes.forEach((x:string) => {buttons.push(<button value={x} onClick={(e) => handleTag(e)}><b>{x}</b></button>);})
 
    const handleTag = (e:React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation();
     const filter = e?.currentTarget.value
     if (filter === "project") {
      setTag(''); 
      setFolder("projects/");
      setMode((blok.mode === "work") ? "projects/" : blok.mode);
     } else if (filter ==="art") {
      setFolder("artworks/");
      setTag(''); // set "art" if wanting to get tags
      setMode("artworks");  //set "" if wanting to get both articles and artworks
     } else {
      setTag(filter); 
      setFolder(""); 
      setMode((blok.mode === "work") ? "projects/" : blok.mode)
     }
   };
    return (
    <>
    <Header name={blok.headerName} meta={blok.meta}/> 
    {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>
      <h1 className={styles.gradient}>{blok.title}</h1>
      <h2 className={styles.centerHeading}>{blok.subTitle}</h2>
      <p className={styles.centerHeading}>
        {(blok.mode === 'work') && <><Link href='/artworks'>🎨 view artworks</Link> | </>}
        {(blok.mode === 'artworks') && <><Link href='/works'>🌸 view all works</Link> | </>}
        <Link href='/archive'>🗂️ view in archive</Link>
      </p>
      <div className={styles.filterNav}> 
         <button value="" onClick={(e) => handleTag(e)}><b>all</b></button>
         {buttons}
       </div>
      {(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
        <motion.div 
        initial="offscreen"
        whileInView="onscreen"
            viewport={{ once: true, amount: 0.8  }}
          >
        <Grid container columns={3}>
          {content_all.map((x:any) => (
            <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x.uuid}>
            <ArticleTeaser article={x.content} key={x.uuid} slug={x.full_slug}/>
            </Grid>
          ))}
        </Grid>
        </motion.div>
      </>}  
    </>}
  </>
  );
};
  export default ArticleItems;