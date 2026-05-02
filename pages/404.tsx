import Layout from '../components/Layout';
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
  storyblokInit,
  apiPlugin,
} from "@storyblok/react";
import type { ISbStoriesParams } from 'storyblok-js-client';

// Ensures the Storyblok client is initialized when getStaticProps runs
// server-side, independently of _app.tsx module load order.
storyblokInit({
  accessToken: process.env.storyblokApiToken,
  apiOptions: { region: "us" },
  use: [apiPlugin],
});

export default function Error404({ story, preview, config }: any) {
  story = useStoryblokState(story, preview);
  return (
    <Layout story={config}>
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}

export async function getStaticProps(context?: any) {
  const slug = "home";
  const preview = context?.preview || false;

  const sbParams: ISbStoriesParams = {
    version: preview ? "draft" : "published",
    resolve_relations: ["featured-articles.articles"],
  };

  try {
    const storyblokApi = getStoryblokApi();
    const [{ data }, { data: config }] = await Promise.all([
      storyblokApi.get(`cdn/stories/${slug}`, sbParams),
      storyblokApi.get("cdn/stories/config", { version: sbParams.version }),
    ]);

    return {
      props: {
        story: data?.story || false,
        preview,
        config: config?.story || false,
      },
      revalidate: 3600,
    };
  } catch {
    return {
      props: { story: false, preview, config: false },
      revalidate: 3600,
    };
  }
}
