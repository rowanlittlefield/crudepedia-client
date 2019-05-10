enum Query {
  GET_ARTICLES = `
    query getArticles {
      articles {
        id
        title
        author {
          id
          username
        }
      }
    }` as any,
}

export default Query;
