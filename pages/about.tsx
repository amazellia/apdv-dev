import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
	return(
		<div className={styles.container}>

            <p className={styles.goback}>
				<Link href="/">
					<a><Image src="/backArrow.png" alt="back" width="17" height="30"/></a>
				</Link>
			</p>

			<h1>about</h1>

			<Link href="https://www.linkedin.com/in/apdv">
				<a>linkedin</a>
			</Link>

			<Link href="https://github.com/amazellia">
				<a>github</a>
			</Link>

			<Link href="https://amazellia.tumblr.com">
				<a>tumblr</a>
			</Link>

			<Link href="https://twitter.com/amazellia">
				<a>twitter</a>
			</Link>

		</div>
	)
}
