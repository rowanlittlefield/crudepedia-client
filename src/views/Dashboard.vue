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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import graphQLService from '@/services/graphQL';
import { getArticles } from '@/graphql/queries';

@Component({
  components: {
    DashboardLogo,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];

  public async mounted() {
    const query = getArticles();
    const response = await graphQLService.makeQuery(query);
    this.articleList = response.data.data.articles;
  }
}
</script>
