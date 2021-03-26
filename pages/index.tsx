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

			<div className="topnav">
				<Link href="/">
					<a>home</a>
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

			<h1>Amanda Patricia D. Viray</h1>

		</div>
	)
}
