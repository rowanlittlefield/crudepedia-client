<template>
  <div class="dashboard">
    <transition
      name="fade"
      mode="out-in"
    >
      <dashboard-logo v-if="showLogo"/>
      <div v-else>
        <dashboard-article-analytics
          :article-analytics="mostViewedArticles"
          class="dashboard__article-analytics" 
        />
        <ul class="dashboard__article-list">
          <article-list-item 
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import DashboardArticleAnalytics from '@/components/DashboardArticleAnalytics.vue';
import crudepediaService from '@/services/crudepedia';
import DASHBOARD_ARTICLES_QUERY from '@/graphql/query/dashboard-articles.gql';

@Component({
  components: {
    DashboardLogo,
    ArticleListItem,
    DashboardArticleAnalytics,
  },
})
export default class Dashboard extends Vue {
  private articles = [];
  private mostViewedArticles = [];
  private showLogo = !sessionStorage.getItem('hasNavigatedToDashboard');

  public async mounted() {
    const response = await crudepediaService.performOperation(DASHBOARD_ARTICLES_QUERY);
    this.articles = response.data.articles;
    this.mostViewedArticles = response.data.mostViewed;
    this.showLogo = false;
    sessionStorage.setItem('hasNavigatedToDashboard', 'true');
  }
}
</script>

<style lang="scss">
.dashboard {
  &__article-list {
    display: flex;
    flex-direction: row;
  }

  &__article-analytics {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
