<template>
  <div class="article-view">
    <div>
    {{ article }}
    </div>
    <router-link to="/">
      Back to Dashboard
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import graphQLService from '@/services/graphQL';
import { getArticle } from '@/graphql/queries';

@Component({})
export default class ArticleView extends Vue {
  private article = {};

  public async mounted() {
    const { articleId } = this.$route.params;
    const query = getArticle(articleId);
    const response = await graphQLService.makeQuery(query);
    this.article = response.data.data.article;
  }
}
</script>