import '../styles/globals.scss'
import React from 'react'
import commentBox from 'commentbox.io'

/* Lyket API - WIP
import ReactDOM from 'react-dom'
import { Provider } from '@lyket/react'

ReactDOM.render(
  <Provider apiKey="c3fa0100ec0fc478a6c2233a06869e">
    <App />
  </Provider>,
  document.getElementById('root')
)

class reactions extends Provider {
  componentDidMount() {
    this.apiKey = lyket('c3fa0100ec0fc478a6c2233a06869e');
  }

  render() {
    return (
      <div className="reactions" />
    )
  }
}*/


// CommentBox.io API - WIP
class commentbox extends React.Component {

  componentDidMount() {

      this.removeCommentBox = commentBox('5733087912656896-proj',
        {
          className: 'commentbox', // the class of divs to look for
          defaultBoxId: 'commentbox', // the default ID to associate to the div
          tlcParam: 'tlc', // used for identifying links to comments on your page
          backgroundColor: '#000', // default transparent
          textColor: '#fff', // default black
          subtextColor: null, // default grey
          singleSignOn: null, // enables Single Sign-On (for Professional plans only)
          /**
           * Creates a unique URL to each box on your page.
           * 
           * @param {string} boxId
           * @param {Location} pageLocation - a copy of the current window.location
           * @returns {string}
           */
          createBoxUrl(boxId, pageLocation) {
      
              pageLocation.search = ''; // removes query string!
              pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
              return pageLocation.href; // return url string
          },
          /**
           * Fires once the plugin loads its comments.
           * May fire multiple times in its lifetime.
           * 
           * @param {number} count
           */
          onCommentCount(count) {
      
          }
      });
  }

  componentWillUnmount() {

      this.removeCommentBox();
  }

  render() {

      return (
          <div className="commentbox" />
      );
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp