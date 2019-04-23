import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
const Dashboard = () => import(/* webpackChunkName: "login" */ '@/views/Dashboard.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
