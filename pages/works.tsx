import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'

export default function Home() {
	return(
		<div className={styles.container}>
			<Head>
				<title>works</title>
			</Head>
			<h1>works</h1>
			<div className="topnav">
				<Link href="/">
					<a>home</a>
				</Link>
				<Link href="/works">
					<a className="active">works</a>
				</Link>
				<Link href="/blog">
					<a>blog</a>
				</Link>
			</div>
			
			<p>my works in coding, art, everything in-between, and outside the box. </p>
			<a href="https://www.instagram.com/_amazellia/"><FontAwesomeIcon icon={faPalette} size="xs"/> personal art blog</a>
			
			<Link href="https://github.com/amazellia">
					<a><FontAwesomeIcon icon={faGithub}  /> coding projects</a>
			</Link>

		</div>
	)
}
