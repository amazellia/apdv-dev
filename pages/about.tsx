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
				<title>about</title>
			</Head>

			<h1>Amanda Patricia Dorado Viray</h1>

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
					<a className="active">about</a>
				</Link>
			</div>

			<h2>
				She is an artist that codes.
			</h2>

			<p>
			Filled with determination, she aims to be an inspiration for woman in the field of STEM that strives to 
			bridge the gap between art and technology. It all started with her exposure 
			to her father’s love for electronic gadgets at a young age, from then on - she found magic at the tip of her hands,
			especially with games that narrates meaningful stories and emotionally touches people’s hearts.
			</p>


			<div className="aboutnav">
				<Link href="https://www.linkedin.com/in/apdv">
					<a><FontAwesomeIcon icon={faLinkedinIn}/></a>
				</Link>

				<Link href="https://github.com/amazellia">
					<a><FontAwesomeIcon icon={faGithub}  /> coding projects</a>
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

				<Link href="mailto:AmandaPatricia.Viray@uon.edu.au">
					<a><FontAwesomeIcon icon={faEnvelope}/></a>
				</Link>
			</div>
			
		</div>
	)
}
