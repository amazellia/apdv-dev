import dynamic from 'next/dynamic'
const ArticleTeaser = dynamic(() => import("../components/ArticleTeaser"))
import { useQuery } from "@apollo/client";
import { useState, useEffect} from "react";
import { Pagination} from "@mui/material";
import styles from '../styles/Home.module.scss';
import { getContentItems } from "../pages/api/apollo";
import { useInView } from "react-intersection-observer";
import Footer from './Footer';

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

type ScrollPreference = "scroll" | "page";
type ViewPreference = "grid" | "list";

const Content = ( {tag, slugs, after, before} :any) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [fetch, setFetch] = useState<boolean>(false);
  const [scrollPref, setScrollPref] = useState<ScrollPreference | null>(null);
  const [viewPref, setViewPref] = useState<ViewPreference>("grid");
  const [page, setPage]= useState(1)
  const limit = 12;
  const { ref, inView } = useInView({threshold:0.8});
  
  const fetchMoreButton = async () => {
    const fetchMorePages = (scrollPref == "scroll") ? newPages : page;
    await fetchMore({
        variables: {  page: fetchMorePages },
        updateQuery: (prevResult, {fetchMoreResult}) => {
          fetchMoreResult.ContentNodes.items =[...prevResult.ContentNodes.items, ...fetchMoreResult.ContentNodes.items]; 
          setFetch(false);
          return fetchMoreResult;
        }
    })
  } 

  useEffect(() => {
    if (inView && !fetch) {
      setFetch((state) => true);
      fetchMoreButton();
    }
  }, [inView]);

  const {data, error, loading, fetchMore} = useQuery(getContentItems, {
    variables: { after: after, before: before, tag: tag, limit: limit, slugs: slugs, page: page },  });
  if (error) return <div>errors</div>;
  var newPages = Math.ceil(data?.ContentNodes.items.length/limit) + 1;
  var hasMore = (newPages < Math.ceil(data?.ContentNodes.total/limit) || data?.ContentNodes.items.length !== data?.ContentNodes.total);
  var content_all = data?.ContentNodes.items;


  const handlePreferenceClick = (selectedPreference: ScrollPreference) => {
    setScrollPref(selectedPreference);
    setShowButtons(false);
  };

  const handleViewPrefClick = (selectedPreference: ViewPreference) => {
    setViewPref(selectedPreference);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({top: 0, behavior: 'smooth'})
  };

  return ( <>
      <div className={styles.viewPref} >
        <button  onClick={() => handleViewPrefClick("grid")}>📦 Grid view</button>
        <button onClick={() => handleViewPrefClick("list")}>📃 List view</button>
      </div>
      {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>
      {(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
        <div className={(viewPref == "grid") ? styles.itemGridExpand : styles.itemList}>
          {content_all.map((x:any) => (
            <ArticleTeaser article={x.content} id={x.uuid} slug={x.full_slug} view={viewPref}/>
          ))}
        </div>
      
        {(showButtons && hasMore) ? ( //setting loading preference
          <div className={styles.loadingPref} >
            <button  onClick={() => handlePreferenceClick("scroll")}>📜 Keep Scrolling</button>
            <p>or</p>
            <button onClick={() => handlePreferenceClick("page")}>📑 Turn Pages</button>
          </div>
          ) :
          (scrollPref == 'page') ? //pagination 
          <>
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
            <Footer/>
          </>
          : //scrolling 
          (hasMore == true) ? <div ref={ref} className="loading"><div className="lds-heart"><div></div></div></div> : <h3 className={styles.centerHeading}>★・・・END・・・★</h3> 
        }
      </>}
    </>}
  </>
  );
};
export default Content;