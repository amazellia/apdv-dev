
import styles from '../styles/Home.module.scss'
import Image from 'next/image';
import AboutLinks from './SocialMedia';
import Header from './Header';
import { render, NODE_IMAGE } from 'storyblok-rich-text-react-renderer';
import Gallery from './Gallery';
import Teaser from './Teaser';
import Video from "./Video";
import ArticleImage from './ArticleImage'

const About = ( {blok} :any) => {
	// ⌛ TO-DO: Add new section called 'education' + 'experience' & a button called 'resume'
	return (
	<div>
		<Header name='amanda viray | about'/>
		<div className={styles.about}>
			<Image alt="Picture of Amanda - dressed in pink checkered shirt" className={styles.pfp} src="/pfp.png" width={433} height={577}/>
		<div className={styles.desc}>
		{render(blok.description, {
			blokResolvers: {
			['gallery']: (props) => <Gallery blok={props}/>,
			['teaser']: (props) => <Teaser {...props}/>,
			['video']: (props) => <div className="made-in-ny"><Video {...props}/></div>,
			},
			nodeResolvers: {
			[NODE_IMAGE]: (blok, props) => <ArticleImage blok={props}/> 
			},
		})}
		<div className={styles.aboutSNS}>
			<AboutLinks/>
		</div>
		</div>
		</div>
	</div>
);
};
export default About;