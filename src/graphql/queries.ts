export const getArticles = (): string => `
    query getArticles {
      articles {
        id
        title
        pubDate
        views
        author {
          id
          username
        }
      }
    }`;

export const getArticle = (articleId: string): string => `
    query getArticle {
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
