import { articleListItem } from '@/graphql/fragments';

export const viewArticle: Readonly<string> = `
  mutation viewArticle($id: Int!) {
    viewArticle(id: $id, input: {}) {
      ok
      article {
        ...articleListItem
        introduction
        description
      }
    }
  }
  ${articleListItem()}`;
