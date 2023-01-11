import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter} from '@fortawesome/free-brands-svg-icons'
import { storyblokEditable } from "@storyblok/react";
import styles from '../styles/Home.module.scss'
export default function aboutLinks({ blok }:any) {

    return (
    <div className={styles.aboutnav} {...storyblokEditable(blok)}>
        <a href="https://www.linkedin.com/in/apdv" aria-label='LinkedIn'>
            <FontAwesomeIcon icon={faLinkedinIn}/>
        </a>

        <a href="https://github.com/amazellia" aria-label='Github'>
        <FontAwesomeIcon icon={faGithub}  />
        </a>

        <a href="https://amazellia.tumblr.com" aria-label='Tumblr'>
        <FontAwesomeIcon icon={faTumblr} />
        </a>

        <a href="https://twitter.com/amazellia" aria-label='Twitter'>
        <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a href="https://www.instagram.com/_amazellia/" aria-label='Instagram'>
        <FontAwesomeIcon icon={faInstagram}/>
        </a>
    </div>
)}