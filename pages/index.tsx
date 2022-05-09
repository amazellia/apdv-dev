import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'
import AboutLinks from '../src/components/aboutlinks'
import {  getPosts, PostType, initialization } from "../src/api/ghostCMS"
import { useState } from 'react'
import PostCards from '../src/components/postCards'
import NProgress from 'nprogress'; //nprogress module

var works = "tag:works"
export const getStaticProps = async () => {
	// ✨ to wake-up my heroku app 
	await initialization(); // (its a free app plan that sleeps after an hour of inactivity and takes ~30 secs to start-up)
    const data = await getPosts(works);
	const initialPosts = data.posts;
	const totalPages = data.pages;
    if (!data) {return {notFound: true,}};
    return {props: { initialPosts, totalPages}}
}

const Home: React.FC<{initialPosts: PostType[], totalPages: number}> = (props) => {
	const {initialPosts, totalPages} = props
	const [posts, setPosts] = useState<PostType[] | null>(initialPosts);
	const [page, setPage] = useState(1) 
	const [filter, setFilter] = useState('')
	const [pages, setTotalPages] = useState(totalPages)

	const handleClick = (e:React.FocusEvent<HTMLButtonElement>) => {
		NProgress.start()
		e.stopPropagation();
		const dataFilter = e?.currentTarget.value
		getPosts(dataFilter).then(res=>{
			setPosts(res.posts); 
			setTotalPages(res.pages); 
			setFilter(dataFilter);
			setPage(1);
			NProgress.done()
		}).catch(err=>console.log(err));
	};

	const pagginationHandler = (event, value) => {
		NProgress.start()
		event.preventDefault();
		setPage(value)
		getPosts(filter, value).then(res=>{
			setPosts(res.posts);
			NProgress.done()
		}).catch(err=>console.log(err));
    };

	// ⌛ TO-DO: Add new section called 'experience' + 'education' and a button called 'resume'
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>amanda viray | dev + art</title>
			</Head>

			<NavBar/>
			<div className='storyboard'>
				<div className='one'>
					<div className='introduction'>
						<h1>✨<a className='gradient'>Hi, I'm Amanda Viray!</a></h1>
						<p>studying <b className='gradient'>code</b> + <b className='gradient'>interactive media</b> at Newcastle. <br/>
						Let's talk at AmandaPatricia.Viray@uon.edu.au!</p>
					</div>
					<AboutLinks/>
				</div>
			</div>
			<div className={styles.subContainer} >
				<h1 className='worksTitle gradient' id='works'>works</h1>
				<div className="filterNav"> 
					<button value={works} onFocus={(e) => handleClick(e)}>all</button>
					<button value={works + "+tag:code"} onFocus={(e) => handleClick(e)}>code</button> 
					<button value={works + "+tag:art"} onFocus={(e) => handleClick(e)}>art</button>
					<button value={works + "+tag:games"} onFocus={(e) => handleClick(e)}>games</button> 
					<button value={"tag:expart"} onFocus={(e) => handleClick(e)}>experimental</button>
					{/* <button value={"tag:blog"} onClick={(e) => handleClick(e)}>write</button> */}
			</div>

			{posts && PostCards(posts, page, pages, pagginationHandler)} 

			<footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>
			</div>
		</div>
	);
};
export default Home