import { articleListItem } from '@/graphql/fragments';

export const viewArticle = (articleId: string): string => `
  mutation viewArticle {
    viewArticle(id: ${articleId}, input: {}) {
      ok
      article {
        ...articleListItem
        introduction
        description
      }
    }
  }
  ${articleListItem()}
`;
