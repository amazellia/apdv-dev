import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter, faItchIo, faEtsy} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { storyblokEditable } from "@storyblok/react";
import styles from '../styles/Home.module.scss'
export default function aboutLinks({ blok }:any) {

    return (
    <div className={styles.SocialMedia} {...storyblokEditable(blok)}>
        <a href="https://www.linkedin.com/in/apdv" aria-label='LinkedIn' target='_blank'>
            <FontAwesomeIcon icon={faLinkedinIn}/>
        </a>

        <a href="mailto:amanda@apdv.dev" aria-label='E-mail'>
            <FontAwesomeIcon icon={faEnvelope}/>
        </a>

        <a href="https://github.com/amazellia" aria-label='Github' target='_blank'>
        <FontAwesomeIcon icon={faGithub}  />
        </a>

        <a href="https://amazellia.tumblr.com" aria-label='Tumblr' target='_blank'>
        <FontAwesomeIcon icon={faTumblr} />
        </a>

        <a href="https://twitter.com/amazellia" aria-label='Twitter' target='_blank'>
        <FontAwesomeIcon icon={faTwitter} />
        </a>

        <a href="https://www.instagram.com/_amazellia/" aria-label='Instagram' target='_blank'>
        <FontAwesomeIcon icon={faInstagram}/>
        </a>

        <a href="https://amazellia.itch.io/" aria-label='itch.io Game Store' target='_blank'>
        <FontAwesomeIcon icon={faItchIo}/>
        </a>

        {/* <a href="" aria-label='Etsy' target='_blank'><FontAwesomeIcon icon={faEtsy}/> </a>  */}
    </div>
)}