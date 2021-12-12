import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function Home() {
	return(
		<div className={styles.container}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>apdv</title>
			</Head>
			
			<h1>
				👋 Hi, I'm Amanda Viray!
			</h1>

			<div className="topnav">
				<Link href="/">
					<a className="active">home</a>
				</Link>
				<Link href="/works">
					<a>works</a>
				</Link>
				<Link href="/blog">
					<a>blog</a>
				</Link>
				<Link href="/about">
					<a>about</a>
				</Link>
			</div>

		</div>
	)
}