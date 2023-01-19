import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    concat,
    HttpLink
  } from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://gapi-us.storyblok.com/v1/api" });
 
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: process.env.storyblokApiToken,
      version: "published",
    },
  }));
  return forward(operation);
});
 
const Apollo_Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
export default Apollo_Client;


