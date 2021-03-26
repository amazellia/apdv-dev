import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPalette} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
	return(
		<div className={styles.container}>

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

			<h1>works</h1>
			<a href="https://amazelliaart.tumblr.com"><FontAwesomeIcon icon={faPalette} size="xs"/> art blog</a>

		</div>
	)
}
