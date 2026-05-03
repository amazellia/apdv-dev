
import { useState } from 'react';
import Image from 'next/image';
import AboutLinks from './SocialMedia';
import { render, NODE_IMAGE } from 'storyblok-rich-text-react-renderer';
import Gallery from './Gallery';
import Teaser from './Teaser';
import Video from './Video';
import SingleImage from './Picture';
import { optimizeCloudinaryImage } from '../utils/cloudinary';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';

const ResumeWindow = dynamic(() => import('./ResumeWindow'), { ssr: false });

const AboutContent = ({ blok }: { blok: any }) => {
	const [showFunFacts, setShowFunFacts] = useState(false);

	return (
		<>
			<h1 className={`${styles.centerHeading} ${styles.aboutTitle}`}>{blok.title}</h1>
			<div className={styles.about}>
				<div className={styles.pfpWrapper}>
					<Image
						alt={blok.profilePicture.alt}
						className={styles.pfp}
						src={optimizeCloudinaryImage(blok.profilePicture.filename, {
							width: 433,
							height: 577,
							quality: 85,
							crop: 'limit',
						})}
						width={433}
						height={577}
					/>
					<button
						className={`${styles.funFactsToggle}${!showFunFacts ? ` ${styles.funFactsFloat}` : ''}`}
						onClick={() => setShowFunFacts(prev => !prev)}
						aria-label={showFunFacts ? 'Switch to bio' : 'Switch to fun facts'}
						title={showFunFacts ? 'Back to bio' : 'Fun facts'}
					>
						{showFunFacts ? '📖' : '🎮'}
					</button>
				</div>
				<div className={styles.desc}>
					{showFunFacts
						? render(blok.funFacts)
						: render(blok.description, {
							blokResolvers: {
								['gallery']: (props) => <Gallery blok={props} />,
								['teaser']: (props) => <Teaser {...props} />,
								['video']: (props) => <div className="made-in-ny"><Video {...props} /></div>,
							},
							nodeResolvers: {
								[NODE_IMAGE]: (blok, props) => <SingleImage blok={props} />,
							},
						})
					}
				</div>
			</div>
			{blok.resume && blok.resume.length > 0 && (
				<div className={styles.resumeSection}>
					<ResumeWindow items={blok.resume} />
				</div>
			)}
			
			<div className={styles.aboutSNS}>
				<AboutLinks />
			</div>
		</>
	);
};

export default AboutContent;
