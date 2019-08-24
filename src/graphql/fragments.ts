export const articleListItem: Readonly<string> = `
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
