import { useState } from 'react'
import { getPosts, PostType } from '../../src/api/ghostCMS'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import NavBar from '../../src/components/nav'
import postCards from '../../src/components/postCards'
import NProgress from 'nprogress'; //nprogress module

var works = "tag:works"
export const getStaticProps = async () => {
	const data = await getPosts(works)
	const initialPosts = data.posts
	const totalPages = data.pages

    if (!data) {return {notFound: true,}}
    return {props: { initialPosts, totalPages}, revalidate: 10}
}

const Works: React.FC<{initialPosts: PostType[], totalPages: number}> = (props) => {
	const {initialPosts, totalPages} = props
	const [posts, setPosts] = useState<PostType[] | null>(initialPosts);
	const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('')
    const [pages, setPages] = useState(totalPages)

    const handleClick = (e:React.FocusEvent<HTMLButtonElement>) => {
		NProgress.start()
		e.stopPropagation();
		const filter = e?.currentTarget.value
		getPosts(filter).then(res=>{
			setPosts(res.posts); 
			setPages(res.pages); 
			setFilter(filter);
			setPage(1);
			NProgress.done()
		}).catch(err=>console.log(err));
	};

	const pagginationHandler = (event, value) => {
		NProgress.start()
		setPage(value)
		getPosts(filter, value).then(res=>{
			setPosts(res.posts);
			NProgress.done()
		}).catch(err=>console.log(err));
    };

	return (
		<div>
			<NavBar/>
			<div className={styles.container}>
				<Head>
					<title>archive | projects</title>
					<meta charSet='utf-8' name='description' content="Amanda's projects"/>
				</Head>
				
				<div className={styles.subContainer} >
					<h1 className='projectsTitle gradient' id='projects'>archived projects</h1>
					<div className="filterNav"> 
							<button value={works} onFocus={(e) => handleClick(e)}>all</button>
							<button value={works + "+tag:code"} onFocus={(e) => handleClick(e)}>code</button> 
							<button value={works + "+tag:art"} onFocus={(e) => handleClick(e)}>art</button>
							<button value={works + "+tag:games"} onFocus={(e) => handleClick(e)}>games</button> 
							<button value={"tag:expart"} onFocus={(e) => handleClick(e)}>experimental</button>
							{/* <button value={"tag:blog"} onClick={(e) => handleClick(e)}>write</button> */}
					</div>

					{posts && postCards(posts, page, pages, pagginationHandler)}
				</div>
			</div>
		</div> //end of return
	);
};
export default Works