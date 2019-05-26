<template>
  <div class="home">
    <DashboardLogo />
    <ul>
        <router-link
          v-for="article in articleList"
          :key="article.id"
          tag='li'
          :to="`/article/${article.id}`"
        >
        <a>{{ article.title }}</a>
        </router-link>
    </ul>
    <ul>
      <ArticleListItem 
        v-for="article in mockArticleList"
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
import mockArticleList from '@/mock-data/article-list';

@Component({
  components: {
    DashboardLogo,
    ArticleListItem,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];
  private mockArticleList = mockArticleList.data.data.articles;

  public async mounted() {
    const query = getArticles();
    const response = await graphQLService.performOperation(query);
    this.articleList = response.data.data.articles;
  }
}
</script>
