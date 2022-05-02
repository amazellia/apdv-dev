import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter} from '@fortawesome/free-brands-svg-icons'


function aboutLinks() {

    return (
    <div className="aboutnav">
        <Link href="https://www.linkedin.com/in/apdv">
            <a><FontAwesomeIcon icon={faLinkedinIn}/></a>
        </Link>

        <Link href="https://github.com/amazellia">
            <a><FontAwesomeIcon icon={faGithub}  /></a>
        </Link>

        <Link href="https://amazellia.tumblr.com">
            <a><FontAwesomeIcon icon={faTumblr} /></a>
        </Link>

        <Link href="https://twitter.com/amazellia">
            <a><FontAwesomeIcon icon={faTwitter} /></a>
        </Link>

        <Link href="https://www.instagram.com/_amazellia/">
            <a><FontAwesomeIcon icon={faInstagram}/></a>
        </Link>
    </div>
    )}

export default aboutLinks;