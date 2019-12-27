import api from '@/services/api';
import { DocumentNode } from 'graphql/language/ast';

const SERVICE = '/graphql/';

export default {
  performOperation(operation: DocumentNode | string, variables = {}) {
    return api.post(SERVICE, {
      query: operation,
      variables,
    });
  },
};
