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

			<h1>works</h1>

            <p>coming soon...</p>


		</div>
	)
}
