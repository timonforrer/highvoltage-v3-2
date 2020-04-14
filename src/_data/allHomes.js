const { fetchByQuery } = require('../utils/prismic.js')

const query = `{
  allHomes {
    edges {
      node {
        _meta {
          lang
          uid
        }
        hero_title
        hero_introduction
        hero_image
      }
    }
  }
}`

const getAllHomes = async () => {
  const result = await fetchByQuery(query);

  const allHomesFormatted = result.data.allHomes.edges.map((item) => {
    let data = item.node
    return {
      id: data._meta.uid,
      lang: data._meta.lang,
      title: data.hero_title,
      intro_text: data.hero_introduction,
      image: data.hero_image
    }
  })

  return allHomesFormatted
}

module.exports = getAllHomes();
