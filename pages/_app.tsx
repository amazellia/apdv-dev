import '../styles/globals.scss'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp