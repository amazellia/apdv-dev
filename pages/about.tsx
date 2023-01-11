import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout';
import Image from 'next/image';
import { getStoryblokApi, StoryblokComponent, useStoryblokState  } from "@storyblok/react"

export default function About ({story, preview, config}:any) {
	story = useStoryblokState(story, {}, preview);

	// ⌛ TO-DO: Add new section called 'education' + 'experience' & a button called 'resume'
	return (
		<div>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />
				<title>amanda viray | dev + art</title>
				<meta charSet="utf-8" name="description" content="Amanda's bio"/>
			</Head>
      <Layout story={config}> 
	  <div className={styles.about}>
				<Image alt="Picture of Amanda - dressed in pink checkered shirt" className={styles.pfp} src="/pfp.png" width={433} height={577}/>
				<div className={styles.desc}>
					<h1><span className="gradient">About</span></h1>
					<p>	
						Hi, I&#39;m Amanda Patricia Dorado Viray! &#40;take a wild guess on where the
						<b> apdv</b> came from for my website&#41;. I graduated at the University of Newcastle
						with Bachelor of Information Technology majoring in Interactive Media &#40;High Distiction average, 6.7&#41;.
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
						<a href="https://www.linkedin.com/in/apdv/"> LinkedIn</a>.
					</p>
				</div>
            </div>
			</Layout>
			</div>
	);
};

export async function getStaticProps(context?:any) {
  // home is the default slug for the homepage in Storyblok
  let slug = "pages/about";
 
  let sbParams = {
    version: "published",
    resolve_links: "url",
  };
 
  if (context.preview) {
    sbParams.version = "draft";
  }
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data: config } = await storyblokApi.get('cdn/stories/config');
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      preview: context.preview || false,
      config: config ? config.story : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}