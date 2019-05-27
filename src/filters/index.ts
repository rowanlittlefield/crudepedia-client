import camelCase from 'lodash.camelcase';

const files = require.context('./', true, /\.ts$/).keys();
const filters: { name: string, filter: Function }[] = [];

files.forEach((path) => {
  if (path !== './index.ts') {
    const fileName = path.replace(/\.\/|\.ts/g, '');
    const filterModule = require(`@/filters/${fileName}`);

    if (filterModule && !filterModule.default) {
      throw new Error(`${fileName} must have a default export`);
    }
    
    filters.push({
      name: camelCase(fileName),
      filter: filterModule.default,
    });
  }
});

export default {
  install(Vue: any) {
    filters.forEach(({name, filter}) => Vue.filter(name, filter));
  },
};
