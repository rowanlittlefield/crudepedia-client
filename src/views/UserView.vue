<template>
  <div class="user-view">
    <ul data-test="userAttributeList">
      <li 
        v-for="key in userPrimitiveKeys"
        :key="key"
      >
        {{ key }}: {{ user[key] }}
      </li>
    </ul>

    <ul
      v-if="user.articleSet.length"
      data-test="articleLinks"
    >
      <li
        v-for="({ id, title }) in user.articleSet"
        :key="id"
      >
        <router-link
          :to="`/article/${id}`"
          data-test="articleLink"
        >
          {{ title }}
        </router-link>
      </li>
    </ul>

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
import crudepediaService from '../services/crudepedia';
import USER_QUERY from '@/graphql/query/user.gql';

@Component({})
export default class UserView extends Vue {
  private user = {
    articleSet: [],
  };

  private get userPrimitiveKeys() {
    return Object.keys(this.user).filter((key) => key !== 'articleSet');
  }

  public async mounted() {
    const variables = {
      id: this.$route.params.userId,
    };

    const response = await crudepediaService.performOperation(USER_QUERY, variables);

    this.user = response.data.user;
  }
}
</script>
