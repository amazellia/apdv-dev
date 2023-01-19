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

import { ApolloProvider} from "@apollo/client";
import Apollo_Client from './api/apollo';
import dynamic from 'next/dynamic'
import { storyblokInit, apiPlugin } from "@storyblok/react";

const Feature = dynamic(() => import('../components/Feature'))
const Grid = dynamic(() => import("../components/Grid"))
const Gallery = dynamic(() => import("../components/Gallery"))
const Page = dynamic(() => import("../components/Page"))
const Teaser = dynamic(() => import("../components/Teaser"))
const Article = dynamic(() => import("../components/Article"))
const Config = dynamic(() => import("../components/Config"))
const HeaderMenu = dynamic(() => import("../components/HeaderMenu"))
const MenuLink = dynamic(() => import("../components/MenuLink"))
const Layout = dynamic(() => import("../components/Layout"))
const ArticleTeaser = dynamic(() => import("../components/ArticleTeaser"))
const FeaturedArticles = dynamic(() => import("../components/FeaturedArticles"))
const Video = dynamic(() => import("../components/Video"))
const Artwork = dynamic(() => import('../components/Artwork'))
const Archive = dynamic(() => import("../components/Archive"))
const Tags = dynamic(() => import('../components/Tags'))
const About = dynamic(() => import("../components/AboutMe"))
const ArticleItems = dynamic(() => import("../components/ContentItems"))
const Intro = dynamic(() => import("../components/Intro"))

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
    articleTeaser: ArticleTeaser,
    "header_menu": HeaderMenu,
    "menu_link": MenuLink,
    video: Video,
    artwork: Artwork,
    archive: Archive,
    name_tag: Tags,
    about: About,
    ArticleItems: ArticleItems,
    intro: Intro,    
  },
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={Apollo_Client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
  }
