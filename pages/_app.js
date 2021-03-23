import '../styles/globals.scss'
/*
import ReactDOM from 'react-dom'
import { Provider } from '@lyket/react'

ReactDOM.render(
  <Provider apiKey="c3fa0100ec0fc478a6c2233a06869e">
    <App />
  </Provider>,
  document.getElementById('root')
)*/

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp