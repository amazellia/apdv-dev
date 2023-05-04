import Head from "next/head";
import Layout from "../components/Layout";
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Page({ story, preview, config }:any) {
  story = useStoryblokState(story, {}, preview);

  return (
    <div>
      <Head>
        <title>{story ? story.content.title : "My Site"}</title>
      </Head>

      <Layout story={config}>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({params, locales}:any, context?:any) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams = {
    version: "published", // version: "draft",
    resolve_links:"url",
    resolve_relations: ["featured-articles.articles"],
    language: locales,
  };

  if (context?.preview) {
    sbParams.version = "draft";
  }

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  let { data:config } = await storyblokApi.get('cdn/stories/config');

  return {
    props: {
      locales,
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      config: config ? config.story : false,
      preview: context?.preview || false,
    },
    revalidate: 3600, // revalidate every hour
  };
}

export async function getStaticPaths({locales}: any) {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");
  let paths:any[] = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");

    for (const locale of locales) {
      paths.push({ params: { slug: splittedSlug }, locale });
    }
  });

  return {
    paths: paths,
    fallback: false,
  };
}