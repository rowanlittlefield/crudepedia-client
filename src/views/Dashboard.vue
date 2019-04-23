<template>
  <div class="home">
    <DashboardLogo msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardLogo from '@/components/DashboardLogo.vue'; // @ is an alias to /src

@Component({
  components: {
    DashboardLogo,
  },
})
export default class Home extends Vue {}
</script>