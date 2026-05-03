
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
import Header from './Header';

const AboutContent = dynamic(() => import('./AboutContent'), { ssr: false });

const About = ({ blok }: any) => {
	return (
		<div className='section'>
			<Header name='amanda viray | about' meta={blok.meta} />
			<AboutContent blok={blok} />
		</div>
	);
};

export default About;
