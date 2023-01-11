import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const HeaderMenu = ({blok}:any) => (
    <div  {...storyblokEditable(blok)}>
        {blok.links.map((nestedBlok:any) => (
            <StoryblokComponent  className="" blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
)
export default HeaderMenu