import { useState} from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2"
import { useQuery } from "@apollo/client"; 
import {getContentItems} from "../api/apollo"
import {slugify } from "../api/storyblok";
import styles from '../../styles/Home.module.scss';
import ArticleTeaser from "../../components/ArticleTeaser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from "../../components/Footer";

export const getStaticProps = async ({params}:any) => {
	const src = await slugify(params.archive)
    if (!src) {return {notFound: true,}}
    return {props: { src }, revalidate: 10}
}

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArchiveSlug = (props:any) => {
	const {src} = props
	const limit = 9;
	const [tag, setTag] = useState("projects/*,artworks/*,blog/*")
	const {data, error, loading, fetchMore} = useQuery(getContentItems, {
        variables: { after: src?.after, before: src?.before, limit: limit,	slugs: tag,	tag: src?.tag,	page: 1}
      });
	if (error) return <div>errors</div>;
	var content_all = data?.ContentNodes?.items;
	  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const filter = e?.currentTarget.value
		setTag(`${filter}/*`); }
	  
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
	return (
		<>
		<Header name={"archives | " + src?.title}/>
		<main>
			<Link href="/archive" className={styles.closeArchive}><FontAwesomeIcon icon={faXmark}/></Link> 
			<h1>{src?.title}</h1>
			{/* <p>{src?.description}</p> */}
			<div className={styles.filterNav}> 
				<button value="projects/*,artworks/*,blog/*" onClick={(e) => handleClick(e)}>all</button>
				<button value="blog" onClick={(e) => handleClick(e)}>blog</button> 
				<button value="projects" onClick={(e) => handleClick(e)}>works</button>
				<button value="artworks" onClick={(e) => handleClick(e)}>artworks</button>
			</div>
			{(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : 
			<>
			 <InfiniteScroll
          dataLength={data?.ContentNodes?.items.length}
          next={fetchMoreButton}
          hasMore={(Math.ceil(data?.ContentNodes?.items.length/limit) + 1 < Math.ceil(data?.ContentNodes?.total/limit) || data?.ContentNodes?.items.length !== data?.ContentNodes?.total)}
          loader={<div className="loading"><div className="lds-heart"><div></div></div></div>}
        >
				{(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
				<Grid container columns={3}>
					{content_all.map((x:any) => (
					<Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x._uid}>
					<ArticleTeaser article={x.content} slug={x.full_slug}/>
					</Grid>
					))}
				</Grid>
				</>}
				</InfiniteScroll>
			</>}
		</main> 
		<Footer/>
		</>
	);
};
export default ArchiveSlug