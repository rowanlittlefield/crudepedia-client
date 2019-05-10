<template>
  <div class="home">
    <DashboardLogo />
    <ul>
      <li 
        v-for="article in articleList"
        :key="article.id"
      >
        {{ article }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import graphQLService from '@/services/graphQL';
import queries from '@/enums/queries';

@Component({
  components: {
    DashboardLogo,
  },
})
export default class Dashboard extends Vue {
  private articleList = [];

  public async mounted() {
    const response = await graphQLService.makeQuery(queries.GET_ARTICLES);
    this.articleList = response.data.data.articles;
  }
}
</script>
