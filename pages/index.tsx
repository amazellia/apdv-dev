import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'
import AboutLinks from '../src/components/aboutlinks'
import {  getPosts, PostType } from "../src/api/ghostCMS"
import { useState, useEffect } from 'react'
import PostCards from '../src/components/postCards'
const URL_HEADER = process.env.NEXT_PUBLIC_CORS_HEADER

const Home = () => {
	const [posts, setPosts] = useState<PostType[] | null>(null);
	const [page, setPage] = useState(1) 
	const [filter, setFilter] = useState('')
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(true);
	var works = "tag:works"

	useEffect( () => {
		// 🛏️ fetching BLOG_URL to 'poke' Heroku apps awake first (using Free plan)
		fetch(URL_HEADER).then((res) => { // fetching BLOG_URL takes around 20~ secs if all apps are asleep
			// ☕ if Heroku apps are already awake
			if (res.status === 200) {fetchPosts()} 
			// 💤 If asleep (server error 503), setting 10 secs timeout to wait for app to wake up before requesting work
			//  FYI: increase seconds (<30 secs) if response delay occurs in the future 
			// ⌛ TO-DO: create a loading screen state specific for this timeout as app builds in 30 secs
			else {setTimeout(() => {fetchPosts()}, 10000)}
		})
	}, []); // run only ONCE (page opens)

	const fetchPosts = async () => {
		await getPosts(works).then(res=>{
			setPosts(res.posts)
			setTotalPages(res.pages); 
			setLoading(false);
		}).catch(err=>{console.log(err)});
	}

	const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const dataFilter = e?.currentTarget.value
		getPosts(dataFilter).then(res=>{
			setPosts(res.posts); 
			setTotalPages(res.pages); 
		}).catch(err=>console.log(err));
		setFilter(dataFilter);
		setPage(1);
	};

	const pagginationHandler = (event, value) => {
		event.preventDefault();
		setPage(value)
		getPosts(filter, value).then(res=>{
			setPosts(res.posts);
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
				</div>
				<div className='two'>
					<AboutLinks/>
				</div>
			</div>
			<div className={styles.subContainer} >
			<h1 className='worksTitle gradient' id='works'>works</h1>
				<div className="filterNav"> 
					<button value={works} onClick={(e) => handleClick(e)}>all</button>
					<button value={works + "+tag:code"} onClick={(e) => handleClick(e)}>code</button> 
					<button value={works + "+tag:art"} onClick={(e) => handleClick(e)}>art</button>
					<button value={works + "+tag:games"} onClick={(e) => handleClick(e)}>games</button> 
					<button value={"tag:expart"} onClick={(e) => handleClick(e)}>experimental</button>
					{/* <button value={"tag:blog"} onClick={(e) => handleClick(e)}>write</button> */}
				</div>

			{loading ? (<div className={styles.container}><h2>turning pages...</h2></div>
			) : (<> {posts && PostCards(posts, page, totalPages, pagginationHandler)} </>)}	
			
			<footer>
				Amanda Patricia Dorado Viray © 2022 <br/>
				Made with 💖 + Next.js
			</footer>
			</div>
		</div>
	);
};
export default Home