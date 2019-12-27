<template>
  <div class="dashboard">
    <DashboardLogo />
    <ul class="dashboard__article-list">
      <ArticleListItem 
        v-for="article in articleList"
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
import crudepediaService from '@/services/crudepedia';
import ARTICLES_QUERY from '@/graphql/query/articles.gql';

@Component({
  components: {
    DashboardLogo,
    ArticleListItem,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];

  public async mounted() {
    const response = await crudepediaService.performOperation(ARTICLES_QUERY);
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
}
</style>
