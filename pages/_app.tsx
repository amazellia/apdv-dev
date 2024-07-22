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
import { Analytics } from'@vercel/analytics/react';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

import { ApolloProvider} from "@apollo/client";
import Apollo_Client from './api/apollo';
import { storyblokInit, apiPlugin } from "@storyblok/react";

import Feature from '../components/Feature'
import Grid from "../components/Grid"
import Gallery from  "../components/Gallery"
import Page from "../components/Page"
import Teaser from   "../components/Teaser"
import Article from  "../components/Article"
import Config from "../components/Config"
import HeaderMenu from "../components/HeaderMenu"
import MenuLink from "../components/MenuLink"
import Layout from "../components/Layout"
import ArticleTeaser from "../components/ArticleTeaser"
import FeaturedArticles from "../components/FeaturedArticles"
import Video from "../components/Video"
import Artwork from '../components/Artwork'
import Archive from "../components/Archive"
import About from "../components/AboutMe"
import ArticleItems from "../components/ContentItems"
import Intro from "../components/Intro"
import Footer from "../components/Footer"
import SubButton from "../components/Subscribe";


declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hyvor-talk-comments": any;
    }
  }
}
import localFont from '@next/font/local'

const sunroll = localFont({
  variable: "--sunroll-font",
  src:[
    {
      path:'../styles/fonts/sunroll/Sunroll_Bold.ttf',
      style: 'bold',
    },
    {
      path:'../styles/fonts/sunroll/Sunroll.ttf',
      style: 'normal'
    }
  ]
})


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
    about: About,
    ArticleItems: ArticleItems,
    intro: Intro,   
    footer: Footer,   
    signUpButton: SubButton,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={Apollo_Client}>
      <div className={sunroll.variable}>
        <Component {...pageProps} />
      </div>
      <Analytics/>
    </ApolloProvider>
  )
  }
