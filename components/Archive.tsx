import {getContentItems } from "../pages/api/apollo";
import { useQuery } from "@apollo/client";
import ArchivesDates from "./ArchivesDates";
import Header from './Header';
import Grid from "@mui/material/Unstable_Grid2"
import { storyblokEditable } from "@storyblok/react";
import ArticleTeaser from "./ArticleTeaser";

const Archive = ({blok} :any) => {
  const {data, error, loading} = useQuery(getContentItems, {
    variables: { 
    slugs: "projects/*,artworks/*,blog/*",
    limit: 100
    }
  });
  if (error) return <div>errors</div>;
  return (
    <>
    <Header name={blok.metaName} meta={blok.metaDescription}/>
    {(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> :
    <>
      <h1>🗂️ Archive</h1>
      <h2>Tags</h2>
      <Grid container columns={3} >
    {data?.TagsItems?.items[0].content.tag.map((x:any) => {return (
      <Grid xs={3} sm={1.5} md={1} lg={1} xl={1}  {...storyblokEditable(data)} key={x.uuid}>
      <ArticleTeaser article={x} slug={x.slug} tag={true} />
      </Grid>
    )})}
  </Grid>

      <h2>Dates</h2>
      <ArchivesDates data={data}/>
    </>}
  </>
  )
};

export default Archive;