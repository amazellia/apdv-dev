import Layout from '../components/Layout';
import { getStoryblokApi, StoryblokComponent, useStoryblokState  } from "@storyblok/react"
import Header from '../components/Header';
import type { ISbStoriesParams } from 'storyblok-js-client';

export default function Home({story, preview, config}:any) {
  story = useStoryblokState(story, preview);
  return (
    <>
    <Header/>
    <Layout story={config}>     
      <StoryblokComponent blok={story.content} />
    </Layout>
    </>
  )
}
export async function getStaticProps(context?:any) {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";
 
  let sbParams: ISbStoriesParams = {
    version: 'published',
    resolve_relations: ['featured-articles.articles'],
  };
 
  if (context.preview) {
    sbParams.version = 'draft';
  }
 
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  const { data: config } = await storyblokApi.get('cdn/stories/config');
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