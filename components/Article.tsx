import { render, NODE_IMAGE, MARK_LINK, MARK_ANCHOR } from 'storyblok-rich-text-react-renderer';
import Gallery from './Gallery';
import Teaser from './Teaser';
import Image from 'next/image';
import { Container } from '@mui/material';
import Video from "./Video";
import { useRouter } from 'next/router';
import SingleImage from './Picture'
import styles from '../styles/Home.module.scss'
import Header from './Header';
import SubscribeForm from './Subscribe';
import Script from 'next/script';
import Link from 'next/link';

const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const Article = ({ blok }:any) => {
 
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  
  return (
    <>
    <Script async src="https://talk.hyvor.com/embed/embed.js" type="module" strategy='lazyOnload'/>
    <div key={blok.title}>
    <Header name={blok.title} meta={blok.metaDescription}/>
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
      markResolvers: {
        [MARK_LINK]: (children, props) => {
            const { linktype, href, target, anchor }:any = props;
            if (linktype === 'email') {
                // Email links: add `mailto:` scheme and map to <a>
                return <a href={`mailto:${href}`}>{children}</a>;
            }
            if (href.match(/^(https?:)?\/\//)) {
                // External links: map to <a>
                return <a href={href} target={target}>{children}</a>;
            }
            var internalHref = (!anchor) ? href : (href+"#"+anchor);
            // Internal links: map to <Link>
            return <Link href={internalHref}>{children}</Link>;
        }
    },
      blokResolvers: {
        ['gallery']: (props) => <Gallery blok={props}/>,
        ['teaser']: (props) => <Teaser {...props}/>,
        ['video']: (props) => <div className="made-in-ny"><Video {...props}/></div>,
      },
      nodeResolvers: {
        [NODE_IMAGE]: (blok, props) => <SingleImage blok={props}/> 
      },

    })}
    <SubscribeForm/>
    <div className='hyvorTalk'>
    <hyvor-talk-comments website-id={HYVOR_ID} page-id={slug} />
     </div>
  </Container>
  </>}
  </div>
    </>
    
  );
};
export default Article;