import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'
import {getPosts} from "../src/api/ghostCMS"
import { useState, useEffect } from 'react'
import type { PostType } from '../src/api/ghostCMS'
import postCards from '../src/components/postCards'
import Link from 'next/link'

const Blog = () => {
    const [posts, setPosts] = useState<PostType[] | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	//const [filter, setFilter] = React.useState('')
	var blog = "tag: blog"
	useEffect(() => {
		fetchPosts();
	},[]);

	const fetchPosts = () => {
		getPosts(blog).then(res=>{
			setPosts((res.posts));
			setTotalPages(res.pages); 
			setLoading(false);
			}).catch(err=>{
				console.log(err)
			});
	}
	
	const pagginationHandler = (event, value) => {
		setPage(value)
		getPosts(blog, value).then(res=>{
			setPosts(res.posts);
		}).catch(err=>console.log(err));
    };

	return (
		<div>
			<Head>
				<title>amanda viray | blog</title>
			</Head>

			<NavBar/>

			<div className={styles.container}>
				<h1>✏️ <a className='gradient'>blog</a></h1>

				<p>in the depths of my mind</p>

				{loading ? (<div className={styles.container} ><h2>turning pages...</h2></div>
				) : (<> {posts && postCards(posts, page, totalPages, pagginationHandler)} </> )}
				<Link href="/archives">
					<a>archives</a>
				</Link>
			</div>
		</div>
	);
};
export default Blog