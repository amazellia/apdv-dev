import AboutLinks from '../components/SocialMedia';
import Header from '../components/Header';
import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout';
import { getStoryblokApi, StoryblokComponent, useStoryblokState  } from "@storyblok/react"

export default function Home({story, preview, config}:any) {
  story = useStoryblokState(story, {}, preview);
  return (
  <Layout story={config}> 
  <div>
  <Header/>
      {/* <h1>{ story ? story.name : 'My Site' }</h1> */}
        <div className={styles.storyboard}>
          <div className={styles.introduction}>
          <h1>✨<span className="gradient">Hi, I&#39;m Amanda Viray!</span></h1>
            <p><abbr title="XR/AR/VR + emerging technologies">Digital Technologist</abbr> of the School of Architecture and 
              Built Environment - <abbr title='NSW, Australia'>University of Newcastle</abbr>
            <br/>
            Let&#39;s talk at <b className="gradient"><a href="mailto:amanda@apdv.dev">amanda@apdv.dev</a></b>!</p>
          </div>
        <AboutLinks/>
      </div>
  </div>
    
    <StoryblokComponent blok={story.content} />
  </Layout>
  )
}
export async function getStaticProps(context?:any) {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";
 
  let sbParams = {
    version: "published",
    resolve_links: "url",
    resolve_relations: ["featured-articles.articles"],
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