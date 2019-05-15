export const viewArticle = (articleId: string): string => `
  mutation viewArticle {
    viewArticle(id: ${articleId}, input: {}) {
      ok
      article {
        id
        title
        pubDate
        introduction
        description
        views
        author {
          id
          username
        }
      }
    }
  }
`;
