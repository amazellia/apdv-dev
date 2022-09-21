import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from'@fortawesome/free-solid-svg-icons'
function openMobileNav(e) {
	e.preventDefault();
	var x = document.getElementById("myTopnav");
	if (x.className === "navigation") {
	  x.className += " responsive";
	} else {
	  x.className = "navigation";
	}
}

function navBar() {
	// const [theme, setTheme] = useState('light')
    return (
        <div className="navigation" id='myTopnav'>
				<Link href="/">home</Link>
				<Link href="/about">about</Link>
				<Link href="/#projects">projects</Link>
				<Link href="/blog">blog</Link>
			<a href="#!" aria-label='navigation menu' className="icon" onClick={e => openMobileNav(e)} >
				<FontAwesomeIcon icon={faBars}/>
			</a>
			<a href="#!" aria-label='navigation menu' className="closeIcon" onClick={e => openMobileNav(e)}>
				&times;
			</a>
			{/* <a onClick={() => setTheme(theme == 'light'? 'dark': 'light')}>
			<FontAwesomeIcon icon={faSun} />
			</a> */}
        </div>
    )
}
export default navBar;