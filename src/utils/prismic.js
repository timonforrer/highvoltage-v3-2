const Prismic = require('prismic-javascript');

const prismicQuery = async (documentType) => {
  let api = await Prismic.getApi('https://voltagearc.prismic.io/api/v2');
  return (await api.query(Prismic.Predicates.at('document.type', documentType), { lang: '*' })).results;
};

module.exports = { prismicQuery };
