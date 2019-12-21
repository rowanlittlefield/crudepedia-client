<template>
  <div class="article-view">
    <ul data-test="articleAttributeList">
      <li 
        v-for="key in articlePrimitiveKeys"
        :key="key"
      >
        {{ key }}: {{ article[key] }}
      </li>
    </ul>

    <p v-if="article.author">
      <router-link
        :to="`/user/${article.author.id}`"
        data-test="authorLink"
      >
        {{ article.author.username }}
      </router-link>
    </p>

    <p>
      <router-link
        to="/"
        data-test="dashboardLink"
      >
        Back to Dashboard
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import crudepediaService from '@/services/crudepedia';
import VIEW_ARTICLE_MUTATION from '@/graphql/mutation/view-article.gql';

@Component({})
export default class ArticleView extends Vue {
  private article = {};

  private get articlePrimitiveKeys() {
    return Object.keys(this.article).filter((key) => key !== 'author');
  }

  public async mounted() {
    const variables = {
      id: this.$route.params.articleId,
    };

    const response = await crudepediaService.performOperation(VIEW_ARTICLE_MUTATION, variables);
    // const { ok, article } = response.data.viewArticle;

    // if (ok) {
    //   this.article = article;
    // }
  }
}
</script>