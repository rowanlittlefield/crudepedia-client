enum Query {
  GET_ARTICLES = `
    query getArticles {
      articles {
        id
        title
      }
    }` as any,
}

export default Query;
