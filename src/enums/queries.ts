enum Query {
  GET_ARTICLES = <any>`
    query getArticles {
      articles {
        id
        title
      }
    }`
};

export default Query;