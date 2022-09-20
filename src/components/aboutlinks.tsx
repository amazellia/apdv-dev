import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedinIn, faTumblr, faTwitter} from '@fortawesome/free-brands-svg-icons'


function aboutLinks() {

    return (
    <div className="aboutnav">
        <Link href="https://www.linkedin.com/in/apdv">
            <div className='icon'><FontAwesomeIcon icon={faLinkedinIn}/></div>
        </Link>

        <Link href="https://github.com/amazellia">
        <div className='icon'><FontAwesomeIcon icon={faGithub}  /></div>
        </Link>

        <Link href="https://amazellia.tumblr.com">
        <div className='icon'><FontAwesomeIcon icon={faTumblr} /></div>
        </Link>

        <Link href="https://twitter.com/amazellia">
        <div className='icon'><FontAwesomeIcon icon={faTwitter} /></div>
        </Link>

        <Link href="https://www.instagram.com/_amazellia/">
        <div className='icon'><FontAwesomeIcon icon={faInstagram}/></div>
        </Link>
    </div>
    )}

export default aboutLinks;