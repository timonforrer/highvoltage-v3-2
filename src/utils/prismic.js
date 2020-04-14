var InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
var ApolloClient = require('apollo-client').ApolloClient;
var gql = require('graphql-tag');
var PrismicLink = require('apollo-link-prismic').PrismicLink;

const client = new ApolloClient({
  link: PrismicLink({
    uri: 'https://voltagearc.prismic.io/graphql'
  }),
  cache: new InMemoryCache()
});

const fetchByQuery = async (query) => {
  const result = await client.query({
    query: gql`query ${query}`
  });
  return result;
}

module.exports = { fetchByQuery };
