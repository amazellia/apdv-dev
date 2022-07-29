import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from'@fortawesome/free-solid-svg-icons'
function myFunction(e) {
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
			<Link href="/">
				<a>home</a>
			</Link>
			<Link href="/about">
				<a>about</a>
			</Link>
			<Link href="/#projects">
			<a>projects</a>
			</Link>
			<Link href="/blog">
				<a>blog</a>
			</Link>
			<a href="#!" className="icon" onClick={e => myFunction(e)} >
				<FontAwesomeIcon icon={faBars}/>
			</a>
			{/* <a onClick={() => setTheme(theme == 'light'? 'dark': 'light')}>
			<FontAwesomeIcon icon={faSun} />
			</a> */}
        </div>
    )
}
export default navBar;