import { render, NODE_IMAGE } from 'storyblok-rich-text-react-renderer';
import Gallery from './Gallery';
import Teaser from './Teaser';
import Image from 'next/image';
import { Container } from '@mui/material';
import Video from "./Video";
import { Embed } from 'hyvor-talk-react'
import { useRouter } from 'next/router';
import ArticleImage from './ArticleImage'
import styles from '../styles/Home.module.scss'
import Header from './Header';
import SubButton from './Subscribe';

const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const Article = ({ blok }:any) => {
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  return (
    <div key={blok.title}>
    <Header name={blok.title} meta={blok.title}/>
    {(!blok) ? <div className="loading"><div className="lds-heart"><div></div></div></div> : <>

      <div className={styles.articleBanner}>
        <div>
          <Image 
            alt={blok?.cover_image?.alt}
            src={blok?.cover_image?.filename}
            width={800}
            height={800}
            quality={100}
          />
        </div>
        <div className={styles.articleBanner_desc}>
          <h1 className='title'>{blok.title}</h1>
          <h2>{blok.subtitle}</h2>
          <b>Published at {blok.published_at}</b>
        </div>
      </div>
  <hr/>
  <Container maxWidth="md">
    {render(blok.content, {
      blokResolvers: {
        ['gallery']: (props) => <Gallery blok={props}/>,
        ['teaser']: (props) => <Teaser {...props}/>,
        ['video']: (props) => <div className="made-in-ny"><Video {...props}/></div>,
      },
      nodeResolvers: {
        [NODE_IMAGE]: (blok, props) => <ArticleImage blok={props}/> 
      },

    })}
    <SubButton/>
    <div className='hyvorTalk'>
    <Embed 
      websiteId={HYVOR_ID}
      id={slug}
      loadMode="onLoad"
    />
    </div>
  </Container>
  </>}
  </div>
  );
};
export default Article;