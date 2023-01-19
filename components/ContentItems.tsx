/* ----------------------------------------
Component that loads all articles/artworks
according to the modes you give in Storyblok
 ----------------------------------------*/
import ArticleTeaser from "./ArticleTeaser";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Pagination} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import styles from '../styles/Home.module.scss';
import Artworks from './Artworks'
import Link from "next/link";
import Header from "./Header";
import { motion } from "framer-motion";
import { WorkArticles , BlogArticles} from "../pages/api/storyblok";

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArticleItems = ( {blok} :any) => {
  const [page, setPage]= useState(1)
  const [tag, setTag] = useState("")
  var limit:any = (limit === undefined) ? 9 :  blok.limit;
  var query:any = (blok.mode === "work") ?  WorkArticles : BlogArticles;
  const buttons = [] as any;
  const {data, error, loading} = useQuery(query, {
    variables: { 
      currentPage: page,
      limit: limit,
      search_tag: tag,
      }
  });
  if (error) return <div>errors</div>;
  
   if (blok.mode === 'work') {
    data?.ConfigItem?.content?.work_buttons.forEach((x:string) => {buttons.push(<button value={x} onClick={(e) => handleClick(e)}><b>{x}</b></button>);})
   } else {
    data?.ConfigItem?.content?.blog_buttons.forEach((x:string) => {buttons.push(<button value={x} onClick={(e) => handleClick(e)}><b>{x}</b></button>);})}
  
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      window.scrollTo({top: 0, behavior: 'smooth'})
    };
 
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation();
     const filter = e?.currentTarget.value
     setTag(filter);
   };
    return (
      <>
      <Header name={blok.headerName} meta={blok.meta}/> 
      {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>
      <h1 className={styles.centerHeading}>{blok.title}</h1>
      <h2 className={styles.centerHeading}>{blok.subTitle}</h2>
      {(blok.mode != 'artworks' ) &&  <>
      <div className={styles.filterNav}> 
         <button value="" onClick={(e) => handleClick(e)}><b>all</b></button>
         {buttons}
       </div>
       <motion.div 
       initial="offscreen"
       whileInView="onscreen"
          viewport={{ once: true, amount: 0.8  }}
          >
      <Grid container columns={3}>
        {data?.ArticleItems?.items?.map((x:any) => (
          <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x.uuid}>
          <ArticleTeaser article={x.content} key={x.uuid} slug={x.full_slug}/>
          </Grid>
        ))}
      </Grid>

      <Pagination
      className="pagination"
      count={Math.ceil(data.ArticleItems.total/ limit)}
      page={page}
      siblingCount={1}
      boundaryCount={1}
      variant="outlined"
      shape="rounded"
      onChange={handleChangePage}
      /> </motion.div>
      {(tag == "art" || tag == "" && blok.mode != 'blog') && <h2 id="artworks" className={styles.centerHeading}>🎨 Artworks</h2>}
      </>} 
      {(tag == "art" || tag == "" && blok.mode != 'blog') && <><Artworks/></>} 
         
      <div className={styles.seeMoreButton}>
      <Link href='/archive'><button>🗂️ view in archive</button></Link>
      </div> 
      </>}
  </>
  );
};
  export default ArticleItems;