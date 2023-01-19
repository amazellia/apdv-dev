import Layout from '../components/Layout';
import { getStoryblokApi, StoryblokComponent, useStoryblokState  } from "@storyblok/react"

export default function Error404({story, preview, config}:any) {
  story = useStoryblokState(story, {}, preview);
  return (
  <Layout story={config}>     
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