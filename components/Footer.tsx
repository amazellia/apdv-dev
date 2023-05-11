import moment from "moment";
import { storyblokEditable } from "@storyblok/react";
function Footer({ blok }:any) {
    return (
    <footer {...storyblokEditable(blok)}>
        Made with 💖 <br/>
        Amanda Patricia Dorado Viray © {moment().format('YYYY')} <br/>
        <i>Maraming salamat 🙏 | Thank you! | شكرًا لك</i>
    </footer>)
}export default Footer;