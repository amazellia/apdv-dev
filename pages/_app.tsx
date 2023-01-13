import '../styles/globals.scss'
import type { AppProps } from 'next/app'

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.scss'; //styles of nprogress

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat,
  HttpLink
} from "@apollo/client";
 
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Gallery from "../components/Gallery"
import Page from "../components/Page";
import Teaser from "../components/Teaser";
import Article from "../components/Article";
import Config from "../components/Config";
import HeaderMenu from "../components/HeaderMenu";
import MenuLink from "../components/MenuLink";
import Layout from "../components/Layout";
import AllArticles from "../components/AllArticles";
import ArticleTeaser from "../components/ArticleTeaser";
import FeaturedArticles from "../components/FeaturedArticles"
import FilterTags from "../components/FilterTags"
import Video from "../components/Video"
import Artwork from '../components/Artwork';
import Artworks from '../components/Artworks';
import Archive from '../components/Archive'
import Tags from '../components/Tags'
import About from '../components/AboutMe';
import FeaturedArt from '../components/FeaturedArt';

storyblokInit({
  accessToken: process.env.storyblokApiToken,
  apiOptions: {
    region: "us", // Pass this key/value if your space was created under US region
  },
  use: [apiPlugin],
  components: { //update this whenever components are created
    page: Page,
    teaser: Teaser,
    grid: Grid,
    gallery: Gallery,
    feature: Feature,
    article: Article,
    config: Config,
    layout: Layout,
    "featured-articles": FeaturedArticles,
    "all-articles": AllArticles,
    articleTeaser: ArticleTeaser,
    "header_menu": HeaderMenu,
    "menu_link": MenuLink,
    "filter_tags": FilterTags,
    video: Video,
    artwork: Artwork,
    artworks: Artworks,
    archive: Archive,
    name_tag: Tags,
    about: About,
    "featured-artworks": FeaturedArt,
  },
});

const httpLink = new HttpLink({ uri: "https://gapi-us.storyblok.com/v1/api" });
 
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: process.env.storyblokApiToken,
      version: "published",
    },
  }));
  return forward(operation);
});
 
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
  }
