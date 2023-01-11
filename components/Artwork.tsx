import { Container, Grid } from '@mui/material';
import {
    StoryblokComponent,
    storyblokEditable
  } from "@storyblok/react";
import { Embed } from 'hyvor-talk-react'
import { useRouter } from 'next/router';

const HYVOR_PROCESS:any = process.env.hyvorTalkId 
const HYVOR_ID: number = HYVOR_PROCESS

const Artwork = ({blok}:any) => {
  const { asPath } = useRouter()
  const slug = asPath.substring(asPath.lastIndexOf('/') + 1)
  return (
    <>
    <Grid container columns={2}>
        <Grid>
            <Container maxWidth="md" {...storyblokEditable(blok)}>
                {blok.content.map((blok:any) => (
                    <StoryblokComponent blok={blok} key={blok._uid}/>
                ))}
            </Container>
        </Grid>
        <Grid>
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
        </Grid>
    </Grid>
  </>
  );
};
export default Artwork;