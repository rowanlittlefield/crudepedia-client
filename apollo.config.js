module.exports = {
  client: {
    service: {
      name: 'crudepedia_service',
      url: 'http://localhost:8000/graphql/',
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.ts',
      'src/**/*.gql',
    ],
  },
};
