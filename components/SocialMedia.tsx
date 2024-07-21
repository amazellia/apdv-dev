import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter, faItchIo} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { storyblokEditable } from "@storyblok/react";
import styles from '../styles/Home.module.scss'
export default function aboutLinks({ blok }:any) {

    return (
    <div className={styles.aboutnav} {...storyblokEditable(blok)}>
        <a href="https://www.linkedin.com/in/apdv" aria-label='LinkedIn'>
            <FontAwesomeIcon icon={faLinkedinIn}/>
        </a>

        <a href="mailto:amanda@apdv.dev" aria-label='E-mail'>
            <FontAwesomeIcon icon={faEnvelope}/>
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

        <a href="https://amazellia.itch.io/" aria-label='itch.io Game Store'>
        <FontAwesomeIcon icon={faItchIo}/>
        </a>
    </div>
)}