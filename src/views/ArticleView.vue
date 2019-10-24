<template>
  <div class="article-view">
    <ul data-test="articleAttributeList">
      <li 
        v-for="(value, key) in article"
        :key="key"
      >
        {{ key }}: {{ value }}
      </li>
    </ul>
    <router-link
      to="/"
      data-test="dashboardLink"
    >
      Back to Dashboard
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import graphQLService from '@/services/graphql';
import VIEW_ARTICLE_MUTATION from '@/graphql/mutation/view-article.gql';

@Component({})
export default class ArticleView extends Vue {
  private article = {};

  public async mounted() {
    const variables = {
      id: this.$route.params.articleId,
    };

    const response = await graphQLService.performOperation(VIEW_ARTICLE_MUTATION, variables);
    const { ok, article } = response.data.viewArticle;

    if (ok) {
      this.article = article;
    }
  }
}
</script>