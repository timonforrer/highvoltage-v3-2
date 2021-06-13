const Prismic = require('prismic-javascript');

module.exports = async (documentType, customOptions) => {
  let api = await Prismic.getApi('https://voltagearc.prismic.io/api/v2');
  let options = {
    lang: '*',
    ...customOptions
  };
  return (await api.query(Prismic.Predicates.at('document.type', documentType), options)).results;
};
