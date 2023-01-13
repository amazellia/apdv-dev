/* ----------------------------------------
Component that loads all the articles
according to the slug you give in Storyblok
e.g. "blog/", "blog/2021". 
 ----------------------------------------*/
 import ArticleTeaser from "./ArticleTeaser";
 import { useQuery, gql } from "@apollo/client";
 import { useState } from "react";
 import { Pagination } from "@mui/material";
 import Grid from "@mui/material/Unstable_Grid2"
import { ListItem } from "@mui/material";
import styles from '../styles/Home.module.scss';
import Artworks from './Artworks'
import Link from "next/link";
import Header from "./Header";
 
 const query = gql`
 query AllArticles($currentPage: Int, $limit: Int, $search_tag: String)
  {
    ArticleItems(
      with_tag: $search_tag,
      starts_with: "projects/",
      sort_by:"items.content.published_at", 
      per_page: $limit
      page: $currentPage) 
      {
        items {
          id
          name
          content {
            comments
            component
            cover_image {
              filename
              copyright
              focus
            }
            content
            published_at
            subtitle
            teaser
            title
            updated_at
          }
          meta_data
          full_slug
          uuid
        }
        total
    }
  }
 `

 const FilterTags = ( {blok} :any) => {
   const [page, setPage]= useState(1)
   const [tag, setTag] = useState("")
   const limit = blok.limit | 12;
   const {data, error, loading} = useQuery(query, {
    variables: { 
       currentPage: page,
       limit: limit,
       search_tag: tag,
      }
   });
   if (error) return <div>errors</div>;
 
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
     <Header name='amanda viray | works'/>
     <h1 className={styles.centerHeading}>🌸<span  className='gradient'>Projects</span></h1>
     <div className={styles.filterNav}> 
        <button value="" onClick={(e) => handleClick(e)}>all</button>
        <button value="code" onClick={(e) => handleClick(e)}>code</button> 
        <button value="art" onClick={(e) => handleClick(e)}>art</button>
        <button value="games" onClick={(e) => handleClick(e)}>games</button> 
        <button value="UX/UI" onClick={(e) => handleClick(e)}>UX/UI</button>
        <button value="XR/VR/AR" onClick={(e) => handleClick(e)}>XR/VR/AR</button>
      </div>
      {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> :
        <>
        <Grid container columns={3}>
          {data?.ArticleItems?.items?.map((x:any) => (
            <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x.uuid} >
            <ListItem>
            <ArticleTeaser article={x.content} key={x.uuid} slug={x.full_slug}/>
            </ListItem>
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
        />

        {(tag == "art" || tag == "") && <><Artworks/>
        <div className={styles.seeMoreButton} > 
        <Link href='/archive'><button>🗂️ view in archive</button></Link>
      </div></>}
        </>
      }
     </>
    );
 };
 export default FilterTags;