export const getArticles = (): string => `
    query getArticles {
      articles {
        id
        title
        author {
          id
          username
        }
      }
    }`;

export const getArticle = (articleId: string): string => `
    query getArticles {
      article(id: ${articleId}) {
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
    }`;
