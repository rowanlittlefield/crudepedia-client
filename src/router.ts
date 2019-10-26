import Vue from 'vue';
import Router from 'vue-router';

const Dashboard = () => import(/* webpackChunkName: "login" */ '@/views/Dashboard.vue');
const ArticleView = () => import(/* webpackChunkName: "article" */ '@/views/ArticleView.vue');
const UserView = () => import(/* webpackChunkName: "user" */ '@/views/UserView.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/article/:articleId',
      name: 'article-view',
      component: ArticleView,
    },
    {
      path: '/user/:userId',
      name: 'user-view',
      component: UserView,
    },
  ],
});
