import api from '@/services/api';

const SERVICE = '/graphql/';

export default {
  performOperation(operation: string, variables = {}) {
    return api.post(SERVICE, {
      query: operation,
      variables,
    });
  },
};
