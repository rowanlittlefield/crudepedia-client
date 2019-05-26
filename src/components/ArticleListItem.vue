<template>
  <li class="article-list-item">
    <img 
      :src="article.imageUrl"
      width="210px"
      height="117.5px"
    >
    <div class="article-list-item__detail">
      <h3 class="article-list-item__detail-title">
        <a class="article-list-item__detail-title-link">
          {{ article.title }}
        </a>
      </h3>
      <div class="article-list-item__detail-data">
        <div class="article-list-item__detail-data-author">
          <a class="article-list-item__detail-data-author-link">
            {{ article.author.username }}
          </a>
        </div>
        <div class="article-list-item__detail-data-meta">
          <span class="article-list-item__detail-data-meta-views">
            {{ article.views }} views *
          </span>
          <span class="article-list-item__detail-data-meta-date">
            {{ article.pubDate | datetimeElapsed }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ArticleListItem extends Vue {
  @Prop() private article!: object;
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');

.article-list-item {
  display: flex;
  flex-direction: column;

  &__detail {
    padding: 0 24px 0 0;

    &-title {
      margin: 8px 0;
      font-size: 14px;
      
      &-link {
        color: #0A0A0A;
        font-weight: 500;
        line-height: 16px;
        text-decoration-style: solid;
        text-overflow: ellipsis;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &-data {
      color: rgb(96, 96, 96);
      font-weight: 400;
      font-size: 13px;
    }
  }
}
</style>
