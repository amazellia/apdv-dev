import moment from "moment";
import { storyblokEditable } from "@storyblok/react";
function Footer({ blok }:any) {
    return (<footer className="myFooter" {...storyblokEditable(blok)}>Amanda Patricia Dorado Viray © {moment().format('YYYY')} </footer>)
}export default Footer;