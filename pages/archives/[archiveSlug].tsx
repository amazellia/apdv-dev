import { useState } from 'react'
import { getArchivedPosts, PostType } from '../../src/api/ghostCMS'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import navBar from '../../src/components/nav'
import postCards from '../../src/components/postCards'
import NProgress from 'nprogress'; //nprogress module

export const getStaticProps = async ({params}) => {
	const slugify = async (slug:string) => {
		if ( /\d/.test(`${slug}`) == true ) {
			const slugName = (`created_at:>=${slug}-01-0+created_at:<=${slug}-12-31`);
			return slugName
		} else {const slugName = (`tag:${slug}`); return slugName}
	}
	const slug = await slugify(params.archiveSlug)
	const data = await getArchivedPosts(slug)
	const initialPosts = data.posts
	const totalPages = data.pages
	const title = params.archiveSlug

    if (!data) {return {notFound: true,}}
    return {props: { title, slug, initialPosts, totalPages}}
}

export const getStaticPaths = () => {return {paths: [], fallback: true,}}

//const ArchiveSlug: React.FC<{posts: PostType[]}> = (props) => {
const ArchiveSlug: React.FC<{title: string, slug: string, initialPosts: PostType[], totalPages: number}> = (props) => {
	const {title, slug, initialPosts, totalPages} = props
	const [posts, setPosts] = useState<PostType[] | null>(initialPosts);
	const [page, setPage] = useState(1)

	const pagginationHandler = (event, value) => {
		NProgress.start()
		setPage(value)
		getArchivedPosts(slug, value).then(res=>{
			setPosts(res.posts);
			NProgress.done()
		}).catch(err=>console.log(err));
    };

	return (
		<div className={styles.container}>
			<Head>
				<title>blog | {title}</title>
			</Head>
			{navBar()}
			<h1>{title}</h1>

			{posts && postCards(posts, page, totalPages, pagginationHandler)}
		</div> //end of return
	);
};
export default ArchiveSlug