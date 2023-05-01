import moment from "moment";
import { storyblokEditable } from "@storyblok/react";
function Footer({ blok }:any) {
    return (
    <footer {...storyblokEditable(blok)}>
        Made with 💖 + Next.js + Storyblok CMS <br/>
        Amanda Patricia Dorado Viray © {moment().format('YYYY')} 
    </footer>)
}export default Footer;