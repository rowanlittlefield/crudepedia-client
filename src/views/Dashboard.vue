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
import graphQLService from '@/services/graphQL';
import { getArticles } from '@/graphql/queries';

@Component({
  components: {
    DashboardLogo,
    ArticleListItem,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];

  public async mounted() {
    const response = await graphQLService.performOperation(getArticles);
    this.articleList = response.data.data.articles;
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
