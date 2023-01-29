import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  HttpLink,
  gql
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
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

export const getContentItems =gql`
query ContentItems($page: Int, $limit: Int, $after: String, $before: String, $tag: String, $slugs: String) {
  ContentNodes(filter_query: {component: {not_in: "page"}}, per_page: $limit, by_slugs: $slugs, page: $page, first_published_at_gt: $after, first_published_at_lt: $before, with_tag: $tag, sort_by: "items.content.published_at") {
    total
    items {
      name
      full_slug
      content
      slug
      tag_list
      uuid
      first_published_at
    }
  }
  ConfigItem(id: "8404") {
    content {
      artwork_buttons
      work_buttons
      blog_buttons
      archive_buttons
    }
  }
  TagsItems {
    items {
      content {
        tag
        _uid
        component
      }
    }
  }
}
`