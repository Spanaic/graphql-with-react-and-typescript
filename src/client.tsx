import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// https://www.apollographql.com/docs/react/networking/authentication/#header
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

console.log({GITHUB_TOKEN})
const endpoint = 'https://api.github.com/graphql'

const httpLink = createHttpLink({
  uri: endpoint,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
