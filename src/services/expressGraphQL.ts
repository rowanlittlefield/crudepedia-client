import { expressApi } from '@/services/api';

const SERVICE = '/graphql';

export default {
  makeQuery(query: string) {
    return expressApi.post(SERVICE, {
      query,
    });
  },
};
