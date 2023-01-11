import { storyblokEditable } from "@storyblok/react";
 
const Teaser = ( blok :any) => {
  return <h2 className='centerTitle gradient' {...storyblokEditable(blok)}>{blok.headline}</h2>;
}; export default Teaser;