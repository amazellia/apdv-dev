import { useState} from "react";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2"
import { ListItem, Pagination } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getArchives, slugify } from "../api/storyblok";
import styles from '../../styles/Home.module.scss';
import ArticleTeaser from "../../components/ArticleTeaser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Artworks from "../../components/Artworks";
import Header from "../../components/Header";

export const getStaticProps = async ({params}:any) => {
	const src = await slugify(params.archives)
    if (!src) {return {notFound: true,}}

    return {props: { src }, revalidate: 10}
}

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const ArchiveSlug = (props:any) => {
//const ArchiveSlug: React.FC<{src:any}> = (props) => {
	const {src} = props
	const [page, setPage]= useState(1)
	const [tag, setTag] = useState("")
	const limit = 12;
	const {data, error, loading} = useQuery(getArchives, {
        variables: { 
		after: src?.after,
		before: src?.before,
		currentPage: page,
		limit: limit,
		slug: tag,
		tag: src?.tag,
        }
      });
	if (error) return <div>errors</div>;

	  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const filter = e?.currentTarget.value
		setTag(filter);}
	
	  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		window.scrollTo({top: 0, behavior: 'smooth'})
	  };

	return (
		<>
		<Header name={"archives | " + src?.title}/>
		<main>
			<Link href="/archives" className={styles.closeArchive}><FontAwesomeIcon icon={faXmark}/></Link> 
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
			<Grid container columns={3}>
				{data?.ArticleItems?.items?.map((x:any) => (
				<Grid xs={3} sm={1.5} md={1} lg={1} xl={1} key={x.uuid}>
				<ListItem key={x.uuid}>
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
			</>}
			
			{(tag == "artworks" || tag == "") && 
			<Artworks blok={src}/>
			}
		</main> 
		</>
		//end of return
	);
};
export default ArchiveSlug