import datetimeElapsed from '@/filters/datetime-elapsed';

export default {
  install(Vue: any) {
    Vue.filter('datetimeElapsed', datetimeElapsed);
  },
};
