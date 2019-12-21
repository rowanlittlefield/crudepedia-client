<template>
  <div class="dashboard">
    <dashboard-logo />
    <ul class="dashboard__article-list">
      <article-list-item 
        v-for="article in articleList"
        :key="article.id"
        :article="article"
      />
    </ul>
    <dashboard-article-analytics class="dashboard__article-analytics" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import ArticleListItem from '@/components/ArticleListItem.vue';
import DashboardArticleAnalytics from '@/components/DashboardArticleAnalytics.vue';
import graphQLService from '@/services/graphql';
import ARTICLES_QUERY from '@/graphql/query/articles.gql';

@Component({
  components: {
    DashboardLogo,
    ArticleListItem,
    DashboardArticleAnalytics,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];

  public async mounted() {
    const response = await graphQLService.performOperation(ARTICLES_QUERY);
    this.articleList = response.data.articles;
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
