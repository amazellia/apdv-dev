import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'

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
				<Link href="/about">
					<a>about</a>
				</Link>
			</div>
			
			<p>my works in coding, art, everything in-between, and outside the box. </p>
			<a href="https://amazelliaart.tumblr.com"><FontAwesomeIcon icon={faPalette} size="xs"/> art blog</a>

		</div>
	)
}
