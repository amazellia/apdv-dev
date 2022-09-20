import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'

const Home = () => {

	// ⌛ TO-DO: Add new section called 'education' + 'experience' & a button called 'resume'
	return (
		<div>
			<NavBar/>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>amanda viray | dev + art</title>
				<meta charSet='utf-8' name='description' content="Amanda's bio"/>
			</Head>

            <div className={styles.about}>
				<img className={styles.pfp} src='/pfp.png'/>
				<div className={styles.desc}>
					<h1><a className='gradient'>About</a></h1>
					<p>	
						Hi, I'm Amanda Patricia Dorado Viray! (take a wild guess on where the
						<b> apdv</b> came from for my website). I graduated at the University of Newcastle
						with Bachelor of Information Technology majoring in Interactive Media (High Distiction average, 6.7).
						I love mixing my passion and skills for creativity, 
						communications, problem-solving, and technology together to create meaningful impact 
						on people, organisations, decisions, stories, and interactive experiences. 
					</p>
					<p>
						Furthermore, I love exploring different aspects of emerging
						technology such as business and	data analysis, artificical intelligence, and 
						human-computer interaction. 
					</p>

					<p>
					While living in 4 different countries, it enthusiastically leads me to see different cultures, 
					lifestyles, and perspectives when interacting with new people from various backgrounds! I am excited to 
					take on new challenges and learn as much as I can in each and every opportunity, big or small. 
					Because I was born and raised in Saudi Arabia for ten years since my Filipino parents are immigrants, 
					then was raised in Qatar for eight years. Now, I am independently residing in Australia for two years.
					</p>

					<p>
					In my free time, I love to join hackathons, spend time with family and friends, 
					create digital + traditional art, read books/comics/manga, and play video games (Stardew Valley, League of Legends,
					Overwatch, and more!).
					</p>
					
					<p>
						You can contact me at <a href="mailto:amanda@apdv.dev">amanda@apdv.dev</a>.
						As for my work, volunteer, club, and education experiences, you can look here at 
						<a href='https://www.linkedin.com/in/apdv/'> LinkedIn</a>.
					</p>
				</div>
            </div>

			<footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>
			
			</div>
	);
};
export default Home