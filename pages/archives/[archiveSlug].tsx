import { useState } from 'react'
import { getArchivedPosts, PostType } from '../../src/api/ghostCMS'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import navBar from '../../src/components/nav'
import postCards from '../../src/components/postCards'
import NProgress from 'nprogress'; //nprogress module
import moment from 'moment'

export const getStaticProps = async ({params}) => {
	var title = ''
	const slugify = async (slug:string) => {
		if ( /^\d{4}$/.test(`${slug}`) == true ) {
			const slugName = (`created_at:>='${slug}-01-01'+created_at:<='${slug}-12-31'`);
			title = slug; return slugName;
		} else if (/\d{4}-\d{2}/.test(`${slug}`) == true ) {
			const lastDay = moment(moment(slug).endOf('month')).format('D');
			const slugName = (`created_at:>='${slug}-01'+created_at:<='${slug}-${lastDay}'`);
			title = moment(slug).format('MMMM YYYY'); return slugName;
		} else {const slugName = (`tag:${slug}`); title = slug; return slugName}
	}
	const slug = await slugify(params.archiveSlug)
	const data = await getArchivedPosts(slug)
	const initialPosts = data.posts
	const totalPages = data.pages

    if (!data) {return {notFound: true,}}
    return {props: { title, slug, initialPosts, totalPages}, revalidate: 10}
}

export const getStaticPaths = () => {return {paths: [], fallback: true,}}

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