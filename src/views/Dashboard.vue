<template>
  <div class="home">
    <DashboardLogo msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import graphQLService from '@/services/graphQL';
import expressGraphQLService from '@/services/expressGraphQL.ts';

@Component({
  components: {
    DashboardLogo,
  },
})
export default class Home extends Vue {
  public async mounted() {
    const response = await graphQLService.makeQuery(`
      query getArticles {
        articles {
          id
          title
        }
      }`);
    // const response = await expressGraphQLService.makeQuery(`{
    //   language
    // }`);
    // tslint:disable-next-line
    console.log(response);
  }
}
</script>
