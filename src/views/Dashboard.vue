<template>
  <div class="home">
    <DashboardLogo msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue';
import graphQLService from '@/services/graphQL';
// import queries from '@/enums/queries';
import queries from '@/enums/queries';

@Component({
  components: {
    DashboardLogo,
  },
})
export default class Dashboard extends Vue {
  public async mounted() {
    // const response = await graphQLService.makeQuery(queries.GET_ARTICLES);
    const response = await graphQLService.makeQuery(queries.GET_ARTICLES);
    // tslint:disable-next-line
    console.log(response);
  }
}
</script>
