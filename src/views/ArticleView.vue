<template>
  <div class="article-view">
    <ul>
      <li 
        v-for="key in Object.keys(article)"
        :key="key"
      >
        {{ key }}: {{ article[key] }}
      </li>
    </ul>
    <router-link to="/">
      Back to Dashboard
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import graphQLService from '@/services/graphQL';
import VIEW_ARTICLE_MUTATION from '@/graphql/mutation/view-article.gql';

@Component({})
export default class ArticleView extends Vue {
  private article = {};

  public async mounted() {
    const { articleId } = this.$route.params;
    const variables = {
      id: articleId,
    };

    const response = await graphQLService.performOperation(VIEW_ARTICLE_MUTATION, variables);
    const { ok, article } = response.data.data.viewArticle;

    if (ok) {
      this.article = article;
    }
  }
}
</script>