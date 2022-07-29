import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'
import AboutLinks from '../src/components/aboutlinks'
import {  getPosts, PostType } from "../src/api/ghostCMS"
import PostCards from '../src/components/postCards'
import Link from 'next/link'

var works = "featured:true"
export const getStaticProps = async () => {
	// ✨ to wake-up my heroku app (free plan sleeps after an hour of inactivity and takes ~30 secs to start-up)
	// await initialization(); // comment when using DigitalOcean droplet
    const data = await getPosts(works);
	const posts = data.posts;
    if (!data) {return {notFound: true,}};
    return {props: { posts}, revalidate: 10}
}

const Home: React.FC<{posts: PostType[]}> = (props) => {
	const {posts} = props

	// ⌛ TO-DO: a button called 'resume'
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
			<div className={styles.container} >
				<h1 className='projectsTitle gradient' id='projects'>projects</h1>

				{posts && PostCards(posts)} 

				<Link href="/archives/projects">
					<a>see more</a>								
				</Link>
			</div>
			
			<footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>
		</div>
	);
};
export default Home