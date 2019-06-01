export const articleListItem = () => `
  fragment articleListItem on ArticleType {
    id
    title
    pubDate
    views
    author {
      id
      username
    }
  }
`;
