import {getContentItems } from "../pages/api/apollo";
import { useQuery } from "@apollo/client";
import ArchivesDates from "./ArchivesDates";
import Header from './Header';
import styles from '../styles/Home.module.scss'
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
      <div className={styles.itemGridExpand}>
    {data?.TagsItems?.items[0].content.tag.map((x:any) => {return (
      <ArticleTeaser article={x} slug={x.slug} tag={true} view="grid" key={x.uuid}/>
    )})}
      </div>

      <h2>Dates</h2>
      <ArchivesDates data={data}/>
    </>}
  </>
  )
};

export default Archive;