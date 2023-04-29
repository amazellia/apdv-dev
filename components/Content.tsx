import dynamic from 'next/dynamic'
const ArticleTeaser = dynamic(() => import("../components/ArticleTeaser"))
import { useQuery } from "@apollo/client";
import { useState, useEffect} from "react";
import { Pagination} from "@mui/material";
import styles from '../styles/Home.module.scss';
import { getContentItems } from "../pages/api/apollo";
import { useInView } from "react-intersection-observer";

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

type ScrollPreference = "scroll" | "page";
type ViewPreference = "grid" | "list";

const Content = ( {tag, slugs, after, before} :any) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [settings, setSettings] = useState<boolean>(false);
  const [scrollPref, setScrollPref] = useState<ScrollPreference | null>(null);
  const [viewPref, setViewPref] = useState<ViewPreference>("grid");
  const [page, setPage]= useState(1)
  const limit = 9;
  const { ref, inView, entry } = useInView({threshold:0.5});

  useEffect(() => {
    if( scrollPref === "scroll" && hasMore && inView && !loading) {fetchMoreButton()} else {
        return;
    }
  });

  const handlePreferenceClick = (selectedPreference: ScrollPreference) => {
    setScrollPref(selectedPreference);
    setShowButtons(false);
  };

  const handleViewPrefClick = (selectedPreference: ViewPreference) => {
    setViewPref(selectedPreference);
    setSettings(false);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({top: 0, behavior: 'smooth'})
  };

  const handleSettingsClick = () => {
    (!settings) ? setSettings(true) : setSettings(false)
  };

  const {data, error, loading, fetchMore} = useQuery(getContentItems, {
    variables: { after: after, before: before, tag: tag, limit: limit, slugs: slugs, page: page },  });
  if (error) return <div>errors</div>;
  var newPages = Math.ceil(data?.ContentNodes?.items.length/limit) + 1
  var hasMore = (newPages < Math.ceil(data?.ContentNodes?.total/limit) || data?.ContentNodes?.items.length !== data?.ContentNodes?.total)
  var content_all = data?.ContentNodes?.items;
  
  const fetchMoreButton = () => {
    var fetchMorePages = (scrollPref == "scroll") ? newPages : page;
    fetchMore({
        variables: {  page: fetchMorePages },
        updateQuery: (prevResult, {fetchMoreResult}) => {
        fetchMoreResult.ContentNodes.items =[...prevResult.ContentNodes.items, ...fetchMoreResult.ContentNodes.items]; 
        return fetchMoreResult;
        }
    })
    }  

  return ( <>
    {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>
       { settings ?  
       <div className={styles.viewPref} >
        <button onClick={() => handleSettingsClick()}>X</button>
          <button  onClick={() => handleViewPrefClick("grid")}>📦 Grid</button>
          <button onClick={() => handleViewPrefClick("list")}>📃 List</button>
        </div>
        :
        <div className={styles.viewPref} >
            <button onClick={() => handleSettingsClick()}>🪟 View</button>
        </div>
        }
      {(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
        <div className={(viewPref == "grid") ? styles.itemGrid : styles.itemList}>
          {content_all.map((x:any) => (
            <ArticleTeaser article={x.content} key={x.uuid} slug={x.full_slug} view={viewPref}/>
          ))}
        </div>
      
      {(showButtons && hasMore) && (
        <div className={styles.loadingPref} >
          <button  onClick={() => handlePreferenceClick("scroll")}>📜 Keep Scrolling</button>
          <p>or</p>
          <button onClick={() => handlePreferenceClick("page")}>📑 Turn Pages</button>
        </div>
      )}
      </>}
      {(scrollPref == 'page') ? 
         <Pagination
         className="pagination"
         count={Math.ceil(data?.ContentNodes?.total/limit)}
         page={page}
         siblingCount={1}
         boundaryCount={1}
         variant="outlined"
         shape="rounded"
         onChange={handleChangePage}
         />
        : <>
        {(hasMore == true) ? <div ref={ref} className="loading"><div className="lds-heart"><div></div></div></div> : <h3 className={styles.centerHeading}>★・・・END・・・★</h3> }
        </>
      }
    </>}
  </>
  );
};
export default Content;