<template>
  <li class="article-list-item">
    <router-link
      :to="`/article/${article.id}`"
      class="article-list-item__link"
    >
      <img 
        :src="imageUrl"
        class="article-list-item__image"
      >

      <div class="article-list-item__detail">
        <h3 class="article-list-item__detail-title">
          <a class="article-list-item__detail-title-link">
            {{ article.title }}
          </a>
        </h3>

        <div class="article-list-item__detail-data">
          <div class="article-list-item__detail-data-author">
            <router-link 
              :to="`/user/${article.author.id}`"
              class="article-list-item__detail-data-author-link"
            >
              {{ article.author.username }}
            </router-link>
          </div>

          <div class="article-list-item__detail-data-meta">
            <span class="article-list-item__detail-data-meta-views">
              {{ article.views }} views 
            </span>

            <span class="article-list-item__detail-data-meta-date">
              {{ article.pubDate | datetimeElapsed }}
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import kebabCase from 'lodash.kebabcase';

@Component
export default class ArticleListItem extends Vue {
  @Prop() private article!: {
    id: string,
    title: string,
    pubDate: string,
    views: number,
    author: {
      id: string,
      username: string,
    },
  };

  private get imageUrl(): string {
    const { title } = this.article;
    const url = `/assets/${kebabCase(title)}.jpeg`;

    return url;
  }
}
</script>

<style scoped lang="scss">
.article-list-item {
  display: block;
  margin: 0 4px 24px 0;
  width: 210px;

  &:hover {
    cursor: pointer;
  }

  &__link {
    text-decoration: none;
  }

  &__image {
    width: 210px;
    height: 117.5px;
  }

  &__detail {
    padding: 0 24px 0 0;

    &-title {
      margin: 8px 0;
      font-size: 14px;
      
      &-link {
        color: c-color('text', 'primary');
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
      color: c-color('text', 'secondary');
      font-weight: 400;
      font-size: 13px;

      &-author {
        line-height: 18px;
        
        &-link {
          color: c-color('text', 'secondary');
          text-decoration: none;
          
          &:hover {
            color: c-color('text', 'secondary-hover', 0.8);
          }
        }
      }

      &-meta {
        line-height: 18px;
        
        &-views:after {
          content: "•";
          margin: 0 4px;
        }
      }
    }
  }
}
</style>
