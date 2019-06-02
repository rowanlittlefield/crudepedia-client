import { articleListItem } from '@/graphql/fragments';

export const getArticles: Readonly<string> = `
  query getArticles {
    articles {
      ...articleListItem
    }
  }
  ${articleListItem()}
`;

export const getArticle: Readonly<string> = `
    query getArticle($id: Int!) {
      article(id: $id) {
        ...articleListItem
        introduction
        description
      }
    }
    ${articleListItem()}
  `;
