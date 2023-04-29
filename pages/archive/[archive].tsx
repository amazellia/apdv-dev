import { useState} from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client"; 
import {getContentItems} from "../api/apollo"
import {slugify } from "../api/storyblok";
import styles from '../../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Content from "../../components/Content";

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
	const {data, error, loading} = useQuery(getContentItems, {
        variables: { after: src?.after, before: src?.before, limit: limit,	slugs: tag,	tag: src?.tag,	page: 1}
      });
	  if (error) return <div>errors</div>;

	  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const filter = e?.currentTarget.value
		setTag(`${filter}/*`); }
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
			<Content tag={src?.tag} slugs={tag} after={src?.after} before={src?.before}/>
			</>}
		</main> 
		<Footer/>
		</>
	);
};
export default ArchiveSlug