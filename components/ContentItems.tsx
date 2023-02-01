import dynamic from 'next/dynamic'
const ArticleTeaser = dynamic(() => import("../components/ArticleTeaser"))
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"
import styles from '../styles/Home.module.scss';
import Link from "next/link";
import Header from "./Header";
import { getContentItems } from "../pages/api/apollo";
import InfiniteScroll from 'react-infinite-scroll-component';

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArticleItems = ( {blok} :any) => {
  const [tag, setTag] = useState("")
  const [mode, setMode] = useState((blok.mode === "work") ? "projects/*,artworks/*" : `${blok.mode}/*`);
  const buttons = [] as any; var buttonModes = [] as any;
  const limit = 9;
  const {data, error, loading, fetchMore} = useQuery(getContentItems, {
    variables: { tag: tag, limit: limit, slugs: mode, page: 1 },  });
  if (error) return <div>errors</div>;

	var content_all = data?.ContentNodes?.items;
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
  const fetchMoreButton = () => {
    var setPage = Math.ceil(data?.ContentNodes?.items.length/limit) + 1
    fetchMore({
      variables: {  page: setPage },
      updateQuery: (prevResult, {fetchMoreResult}) => {
        fetchMoreResult.ContentNodes.items =[...prevResult.ContentNodes.items, ...fetchMoreResult.ContentNodes.items]; 
        return fetchMoreResult;
      }
    })
  }
  
  return ( <>
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
       <InfiniteScroll
          dataLength={data?.ContentNodes?.items.length}
          next={fetchMoreButton}
          hasMore={(Math.ceil(data?.ContentNodes?.items.length/limit) + 1 < Math.ceil(data?.ContentNodes?.total/limit) || data?.ContentNodes?.items.length !== data?.ContentNodes?.total)}
          loader={<div className="loading"><div className="lds-heart"><div></div></div></div>}
        >
      {(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
        <Grid container columns={3}>
          {content_all.map((x:any) => (
            <Grid xs={3} sm={1.5} md={1} lg={1} xl={0.5} key={x.uuid}>
            <ArticleTeaser article={x.content} key={x.uuid} slug={x.full_slug}/>
            </Grid>
          ))}
        </Grid>
      </>}</InfiniteScroll>
    </>}
  </>
  );
};
export default ArticleItems;