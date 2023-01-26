import { useState} from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2"
import { Pagination } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getArchives, slugify } from "../api/storyblok";
import styles from '../../styles/Home.module.scss';
import ArticleTeaser from "../../components/ArticleTeaser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import moment from 'moment'

export const getStaticProps = async ({params}:any) => {
	const src = await slugify(params.archive)
    if (!src) {return {notFound: true,}}
    return {props: { src }, revalidate: 10}
}

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArchiveSlug = (props:any) => {
	const {src} = props
	const [tag, setTag] = useState("")
	const {data, error, loading} = useQuery(getArchives, {
        variables: { 
		after: src?.after,
		before: src?.before,
		limit: 100,
		slug: tag,
		artworkItems: tag,
		tag: src?.tag,
        }
      });
	if (error) return <div>errors</div>;
	if (data) { CombineContent(data)}
	var content_all:any;
	function CombineContent(data:any) {
		const raw = [...data?.ArticleItems?.items, ...data?.ArtworkItems?.items]
		content_all = raw.sort((a:any,b:any) => moment(b.first_published_at).diff(a.first_published_at));
	}
	  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const filter = e?.currentTarget.value
		setTag(filter); }
	  
	return (
		<>
		<Header name={"archives | " + src?.title}/>
		<main>
			<Link href="/archive" className={styles.closeArchive}><FontAwesomeIcon icon={faXmark}/></Link> 
			<h1>{src?.title}</h1>
			{/* <p>{src?.description}</p> */}
			<div className={styles.filterNav}> 
				<button value="" onClick={(e) => handleClick(e)}>all</button>
				<button value="blog" onClick={(e) => handleClick(e)}>blog</button> 
				<button value="projects" onClick={(e) => handleClick(e)}>works</button>
				<button value="artworks" onClick={(e) => handleClick(e)}>artworks</button>
			</div>
			{(loading || !data) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : 
			<>
				{(content_all.length === 0 ) ? <h2 className={styles.centerHeading}>no data found, still a work in progress!</h2>: <>
				<Grid container columns={3}>
					{content_all.map((x:any) => (
					<Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x._uid}>
					<ArticleTeaser article={x.content} slug={x.full_slug}/>
					</Grid>
					))}
				</Grid>
				</>}
			</>}
			
		</main> 
		</>
		//end of return
	);
};
export default ArchiveSlug