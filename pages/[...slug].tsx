// pages/[...slug].tsx
import Head from "next/head";
import Layout from "../components/Layout";
import type { ISbStoriesParams } from "storyblok-js-client";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page({ story, config }: any) {
  story = useStoryblokState(story);

  return (
    <>
      <Head>
        <title>{story ? story.content.title : "My Site"}</title>
      </Head>

      <Layout story={config}>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </>
  );
}

export async function getStaticProps(context: {
  params: { slug?: string[] };
  locales: string[];
  preview?: boolean;
}) {
  const { params, locales, preview = false } = context;
  const slug = params.slug ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();

  const sbParams: ISbStoriesParams = {
    version: preview ? "draft" : "published",
    resolve_relations: ["featured-articles.articles"],
    language: locales[0], // assuming a single locale – adapt if you need multi
  };

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    const { data: configData } = await storyblokApi.get(
      "cdn/stories/config",
      { version: preview ? "draft" : "published", language: locales[0] }
    );

    return {
      props: {
        locales,
        preview,
        story: data.story,
        config: configData.story,
      },
      revalidate: 3600,
    };
  } catch (error: any) {
    // turn Storyblok 404 into Next’s 404
    return { notFound: true };
  }
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const storyblokApi = getStoryblokApi();
  // fetch only published links
  const { data } = await storyblokApi.get("cdn/links/", {
    version: "published",
  });

  const paths: { params: { slug: string[] }; locale: string }[] = [];

  Object.values(data.links).forEach((link: any) => {
    if (link.is_folder || link.slug === "home") return;
    const slugParts = link.slug.split("/");
    locales.forEach((locale) => {
      paths.push({ params: { slug: slugParts }, locale });
    });
  });

  return {
    paths,
    // allow on-demand generation; non-published = 404
    fallback: "blocking",
  };
}
