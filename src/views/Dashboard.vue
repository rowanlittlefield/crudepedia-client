<template>
  <div class="dashboard">
    <!-- <dashboard-logo /> -->
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import DashboardArticleAnalytics from '@/components/DashboardArticleAnalytics.vue';
import graphQLService from '@/services/graphql';
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

  public async mounted() {
    const response = await graphQLService.performOperation(DASHBOARD_ARTICLES_QUERY);
    this.articles = response.data.articles;
    this.mostViewedArticles = response.data.mostViewed;
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
</style>
