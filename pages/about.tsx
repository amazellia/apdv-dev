import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import NavBar from '../src/components/nav'

const Home = () => {

	// ⌛ TO-DO: Add new section called 'education' + 'experience' & a button called 'resume'
	return (
		<div>
			<NavBar/>
			<div className={styles.slugContainer}>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>amanda viray | dev + art</title>
			</Head>
			

            <div  >
				<h1><a className='gradient'>About</a></h1>
			    <p>	Hi, I'm Amanda Patricia Dorado Viray but I simply go by Amanda! </p>
				<p> I am an aspiring software developer/technical artist/business and data analyst!</p>

				<p>I have a wide-ranging experiences seen in my LinkedIn.</p>
                <p>
                    Bachelor of Information Technology majoring in Interactive Media at the
					University of Newcastle (UoN), Australia of '22.
                </p>
				<p>  
					At UoN, I serve as a lab demonstrator for INFT2031: Systems and Network
					Administration and SENG1050: Web Technologies. 
				</p>
				<p> Currently based in Newcastle, Australia </p>
				<p> Email: amandaviray@yahoo.com </p>
            </div>

			<footer>Amanda Patricia Dorado Viray © 2022 <br/>Made with 💖 + Next.js</footer>
			
			</div>
			
		</div>
	);
};
export default Home