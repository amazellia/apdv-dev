
import styles from '../styles/Home.module.scss'
import Image from 'next/image';
import AboutLinks from './SocialMedia';
import Header from './Header';
import { render, NODE_IMAGE } from 'storyblok-rich-text-react-renderer';
import Gallery from './Gallery';
import Teaser from './Teaser';
import Video from "./Video";
import SingleImage from './Picture'
import { optimizeCloudinaryImage } from '../utils/cloudinary';

const About = ( {blok} :any) => {
	// ⌛ TO-DO: Add new section called 'education' + 'experience' & a button called 'resume'
	return (
	<div className='section'>
		<Header name='amanda viray | about' meta={blok.meta}/>
		<h1 className={styles.centerHeading}>About her.</h1>
		<div className={styles.about}>
			<Image alt={blok.profilePicture.alt} className={styles.pfp} src={optimizeCloudinaryImage(blok.profilePicture.filename, {
				width: 433,
				height: 577,
				quality: 85,
				crop: 'limit'
			})} width={433} height={577}/>
		<div className={styles.desc}>
		{render(blok.description, {
			blokResolvers: {
			['gallery']: (props) => <Gallery blok={props}/>,
			['teaser']: (props) => <Teaser {...props}/>,
			['video']: (props) => <div className="made-in-ny"><Video {...props}/></div>,
			},
			nodeResolvers: {
			[NODE_IMAGE]: (blok, props) => <SingleImage blok={props}/> 
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