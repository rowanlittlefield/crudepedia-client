import api from '@/services/api';

const SERVICE = '/graphql/';

export default {
  makeQuery(query: string) {
    return api.post(SERVICE, {
      query,
    });
  },
};
