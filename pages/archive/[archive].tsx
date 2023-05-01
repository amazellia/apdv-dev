import Link from "next/link";
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
	return (
		<>
		<Header name={"archives | " + src?.title}/>
		<main>
			<Link href="/archive" className={styles.closeArchive}><FontAwesomeIcon icon={faXmark}/></Link> 
			<h1>{src?.title}</h1>
			<Content tag={src?.tag} slugs={"projects/*,artworks/*,blog/*"} after={src?.after} before={src?.before}/>
		</main> 
		<Footer/>
		</>
	);
};
export default ArchiveSlug