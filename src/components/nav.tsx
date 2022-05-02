import Link from 'next/link'
function navBar() {
	// const [theme, setTheme] = useState('light')
    return (
        <div className="navigation">
			<Link href="/">
				<a>about</a>
			</Link>
			<Link href="/#works">
			<a>works</a>
			</Link>
			<Link href="/blog">
				<a>blog</a>
			</Link>
			{/* <a onClick={() => setTheme(theme == 'light'? 'dark': 'light')}>
			<FontAwesomeIcon icon={faSun} />
			</a> */}
        </div>
    )
}
export default navBar;