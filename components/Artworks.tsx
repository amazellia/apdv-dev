/* ----------------------------------------
Component that loads all the articles
according to the slug you give in Storyblok
e.g. "blog/", "blog/2021". 
 ----------------------------------------*/
 import { useQuery } from "@apollo/client";
 import { useState } from "react";
 import { Pagination } from "@mui/material";
 import Grid from "@mui/material/Unstable_Grid2"
import { ListItem } from "@mui/material";
import ArtworkTeaser from "./ArtworkTeaser";
import styles from '../styles/Home.module.scss'
import { ArtworkItems } from "../pages/api/storyblok";
 
 const Artworks = ({blok}:any) => {
   const [page, setPage]= useState(1)
   const [tag, setTag] = useState(blok?.tag)
   const limit = 9
   var beforeDate = (typeof blok?.before === 'undefined') ? '' : blok?.before;
   var afterDate = (typeof blok?.after === 'undefined') ? '' : blok?.after;
   const {data, error, loading} = useQuery(ArtworkItems, {
    variables: { 
       currentPage: page,
       limit: limit,
       search_tag: tag,
       before: beforeDate,
       after: afterDate,
      }
   });
   if (error) return <div>error</div>;
 
   const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
     setPage(value);
     const element = document.getElementById("artworks") as HTMLElement
     element.scrollIntoView({behavior: 'smooth'})
   };

   const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const filter = e?.currentTarget.value

    // tags archive page
    if (blok?.tag !== undefined && blok?.tag !== '') {return setTag(`${blok?.tag}, ${filter}`)} 
    // works page 
    else if (blok?.tag === undefined && typeof blok?.after == 'undefined' ) {return setTag(filter)} 
    // years archive page
    else if (typeof blok?.before !== 'undefined' ) {return setTag(filter)} 
    // everything else
    else {return setTag(filter)} 
  };
  //console.log(`${tag} and ${blok?.tag}`)
 
   return (
     <>  
      <h1 id="artworks">🎨<span className="gradient">Artworks</span></h1>
        <div>
          <div className={styles.filterNav}> 
            <button value=" " onClick={(e) => handleClick(e)}>all</button>
            <button value="traditional" onClick={(e) => handleClick(e)}>traditional</button> 
            <button value="digital" onClick={(e) => handleClick(e)}>digital</button>
            <button value="3D" onClick={(e) => handleClick(e)}>3D</button>
          </div>
          {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> :
          <div>
          <Grid container columns={3}>
            {data?.ArtworkItems?.items?.map((x:any) => (
            <Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x.uuid} >
            <ListItem>
            <ArtworkTeaser artwork={x.content} key={x.uuid} slug={x.full_slug}/>
            </ListItem>
            </Grid>
            ))}
          </Grid>

        <Pagination
        className="pagination"
        count={Math.ceil(data.ArtworkItems.total/ limit)}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
        />
         </div>}
        </div>
        </>
    );
 };
 export default Artworks;