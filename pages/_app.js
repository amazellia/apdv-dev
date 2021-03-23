import '../styles/globals.scss'
import ReactDOM from '@types/react-dom'
import { Provider } from '@lyket/react'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp


ReactDOM.render(
  <Provider apiKey="c3fa0100ec0fc478a6c2233a06869e">
    <MyApp />
  </Provider>,
  document.getElementById('root')
)