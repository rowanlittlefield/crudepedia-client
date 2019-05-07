import api from '@/services/api';
import Query from '@/enums/queries';

const SERVICE = '/graphql/';

export default {
  makeQuery(query: Query) {
    return api.post(SERVICE, {
      query,
    });
  },
};
