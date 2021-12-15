import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
	return(
		<div className={styles.container}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>amanda viray | dev + art</title>
			</Head>
			
			<h1 className="headingColor">
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
			</div>

			<p>studying <b>code</b> and <b>interactive media</b> at the University of Newcastle.</p>
			<p>I love programming, art, business analysis, and stories. <br/>Let's talk at AmandaPatricia.Viray@uon.edu.au!</p>


			<div className="aboutnav">
				<Link href="https://www.linkedin.com/in/apdv">
					<a><FontAwesomeIcon icon={faLinkedinIn}/></a>
				</Link>

				<Link href="https://github.com/amazellia">
					<a><FontAwesomeIcon icon={faGithub}  /></a>
				</Link>

				<Link href="https://amazellia.tumblr.com">
					<a><FontAwesomeIcon icon={faTumblr} /></a>
				</Link>

				<Link href="https://twitter.com/amazellia">
					<a><FontAwesomeIcon icon={faTwitter} /></a>
				</Link>

				<Link href="https://www.instagram.com/_amazellia/">
					<a><FontAwesomeIcon icon={faInstagram}/></a>
				</Link>
			</div>
			

		</div>
	)
}