import { useState, useEffect } from 'react'
import { getArchivedPosts, PostType } from '../../src/api/ghostCMS'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import navBar from '../../src/components/nav'
import postCards from '../../src/components/postCards'

export const getStaticProps = async ({params}) => {
	const title = params.archiveSlug
	if ( /\d/.test(`${params.archiveSlug}`) == true ) {
		const slug = (`created_at:>=${params.archiveSlug}-01-0+created_at:<=${params.archiveSlug}-12-31`)
		return { props :{slug, title} }
	} else {
		const slug = (`tag:${params.archiveSlug}`)
		return { props :{slug, title} }
	}
}

export const getStaticPaths = () => {return {paths: [], fallback: true,}}

//const ArchiveSlug: React.FC<{posts: PostType[]}> = (props) => {
const ArchiveSlug = (props) => {
	const [posts, setPosts] = useState<PostType[] | null>(null);
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [archiveTitle, setTitle] = useState('')
	const [filter, setFilter] = useState('')
	const {slug, title} = props

	useEffect(() => {
		fetchData();
	},[]);

	const fetchData = () => {
		getArchivedPosts(slug).then(res=>{
			setTotalPages(res.pages)
			setPosts(res.posts)
			}).catch(err=>console.log(err));
		setFilter(slug)
		setTitle(title)
	}
	
	const pagginationHandler = (event, value) => {
		setPage(value)
		getArchivedPosts(filter, value).then(res=>{
			setPosts(res.posts);
		}).catch(err=>console.log(err));
    };

	return (
		<div className={styles.container}>
			<Head>
				<title>blog | {archiveTitle}</title>
			</Head>
			{navBar()}
			<h1>{archiveTitle}</h1>

			{posts && postCards(posts, page, totalPages, pagginationHandler)}
		</div> //end of return
	);
};
export default ArchiveSlug
