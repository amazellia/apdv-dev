import { Container, Grid, ListItem } from '@mui/material';
import {
    StoryblokComponent,
    storyblokEditable
  } from "@storyblok/react";
import { useRouter } from 'next/router';
import Header from './Header';
import Script from 'next/script';

/* 
const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS
*/

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const Artwork = ({blok}:any) => {
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  return (
    <div className='section'>
    <Script async src="https://talk.hyvor.com/embed/embed.js" type="module" strategy='lazyOnload'/>
    <Header name={blok.name} meta={blok.metaDescription}/>

    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 7, lg: 7.5, xl: 7.5 }}>
      <ListItem>
            <Container maxWidth="md"  {...storyblokEditable(blok)}>
                {blok.content.map((blok:any) => (
                    <StoryblokComponent blok={blok} key={blok._uid}/>
                ))}
            </Container>
      </ListItem>
        </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4.5, xl: 4.5 }}><ListItem>
            <Container maxWidth="xs">
            <h1 className='title'>{blok.name}</h1>
            <p>{blok.description}</p>
            </Container>
      </ListItem>
        </Grid>
    </Grid>
  </div>
  );
};
export default Artwork;

/*
<p>{blok.description}</p> ... add after this line
<div className='hyvorTalk'> 
<hyvor-talk-comments website-id={HYVOR_ID} page-id={slug} />
</div>
*/