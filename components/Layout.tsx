import Footer from "./Footer";
import Config from "./Config"

const Layout = ({ children, story }:any) => (
  <>
    <Config blok={story.content} />
      {children}
    <Footer />
  </>
);

export default Layout;