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

const getAllHomes = async () => {
  const result = await client.query({
    query: gql`
      query {
        allHomes {
          edges {
            node {
              _meta {
                lang
                uid
              }
              hero_title
            }
          }
        }
      }`
  })

  const allHomesFormatted = result.data.allHomes.edges.map((item) => {
    let data = item.node
    return {
      id: data._meta.uid,
      lang: data._meta.lang,
      title: data.hero_title
    }
  })

  return allHomesFormatted
}

module.exports = getAllHomes();
