// pages/index.tsx
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Header from '../components/Header';
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import type { ISbStoriesParams } from 'storyblok-js-client';

interface HomeProps {
  story: any;
  config: any;
  preview: any;
}

export default function Home({ story, config, preview }: HomeProps) {
  const liveStory = useStoryblokState(story, preview);

  return (
    <>
      <Header />
      <Layout story={config}>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ preview = false }) => {
  const slug = 'home'; // default homepage slug in Storyblok
  const storyblokApi = getStoryblokApi();

  // Build Storyblok params
  const sbParams: ISbStoriesParams = {
    version: preview ? 'draft' : 'published',
    resolve_relations: ['featured-articles.articles'],
  };

  try {
    // Fetch homepage and config
    const [{ data: homeData }, { data: configData }] = await Promise.all([
      storyblokApi.get(`cdn/stories/${slug}`, sbParams),
      storyblokApi.get('cdn/stories/config', {
        version: sbParams.version,
      }),
    ]);

    return {
      props: {
        story: homeData.story,
        config: configData.story,
        preview,
      },
      revalidate: 3600, // hourly ISR
    };
  } catch (error) {
    // On error, render 404
    return {
      notFound: true,
    };
  }
};
