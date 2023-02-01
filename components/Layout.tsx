import Config from "./Config"

const Layout = ({ children, story }:any) => (
  <>
    <Config blok={story.content} />
      {children}
  </>
);

export default Layout;