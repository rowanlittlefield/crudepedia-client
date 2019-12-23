import { print } from 'graphql/language/printer';
import api from '@/services/api';
import { ASTNode } from 'graphql/language/ast';

const SERVICE = '/graphql/';

export default {
  performOperation(operation: string, variables = {}) {
    return api.post(SERVICE, {
      query: operation,
      variables,
    });
  },
};
