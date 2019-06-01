import { articleListItem } from '@/graphql/fragments';

export const getArticles = (): string => `
  query getArticles {
    articles {
      ...articleListItem
    }
  }
  ${articleListItem()}
`;

export const getArticle = (articleId: string): string => `
    query getArticle {
      article(id: ${articleId}) {
        ...articleListItem
        introduction
        description
      }
    }
    ${articleListItem()}
  `;
