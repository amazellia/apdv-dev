import { Container, Grid, ListItem } from '@mui/material';
import {
    StoryblokComponent,
    storyblokEditable
  } from "@storyblok/react";
import { Embed } from 'hyvor-talk-react'
import { useRouter } from 'next/router';
import Header from './Header';

const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS

export const getStaticPaths = async (props:any) => {return {paths: [], fallback: true,}}

const Artwork = ({blok}:any) => {
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  return (
    <>
    <Header name={blok.name} meta={blok.name}/>
    <Grid container columns={2}>
      
      <Grid xs={3} sm={2} md={1.4} lg={1.5} xl={1.5} >
      <ListItem >
            <Container maxWidth="md"  {...storyblokEditable(blok)}>
                {blok.content.map((blok:any) => (
                    <StoryblokComponent blok={blok} key={blok._uid}/>
                ))}
            </Container>
      </ListItem>
        </Grid>
      
      <Grid xs={3} sm={2} md={0.6} lg={0.5} xl={0.5} ><ListItem>
            <Container maxWidth="xs">
            <h1 className='title'>{blok.name}</h1>
            <p>{blok.description}</p>
            <div className='hyvorTalk'>
            <Embed 
            websiteId={HYVOR_ID}
            id={slug}
            loadMode="onLoad"
            />
            </div>
            </Container>
      </ListItem>
        </Grid>
    </Grid>
  </>
  );
};
export default Artwork;