import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ArticleView from '@/views/ArticleView.vue';
import graphQLService from '@/services/graphql';
import VIEW_ARTICLE_MUTATION from '@/graphql/mutation/view-article.gql';

jest.mock('@/services/graphql');

const mockedPerformOperation = graphQLService.performOperation as jest.Mock<object>;

const localVue = createLocalVue();

describe('ArticleView', () => {
  const createResponse = () => ({
    data: {
      viewArticle: {
        ok: true,
        article: { id: '1' },
      }
    },
  });
  
  const createWrapper = () => {    
    const wrapper = shallowMount(ArticleView, {
      localVue,
      mocks: {
        $route: {
          params: {
            articleId: '1',
          },
        },
      },
      stubs: [
        'router-link',
      ],
    })

    return wrapper;
  };

  describe('dashboardLink', () => {
    it('sets the to attribute to the correct value', () => {
      mockedPerformOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = '/';

      const actual = wrapper.find('[data-test="dashboardLink"]').attributes('to');
      expect(actual).toBe(expected);
    });
  });

  describe('mounted', () => {
    it('calls graphQLService.performOperation with the correct arguments', () => {
      mockedPerformOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const args = [
        VIEW_ARTICLE_MUTATION,
        { id: wrapper.vm.$route.params.articleId },
      ];

      const method = graphQLService.performOperation;
      expect(method).toHaveBeenCalledWith(...args);
    });

    it(`renders the list of article attributes from the 
      viewArticle response if viewArticle.ok is true`, async () => {
      mockedPerformOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = 'id: 1';

      await flushPromises();

      const actual = wrapper.find('[data-test="articleAttributeList"]').text();
      expect(actual).toBe(expected);
    });

    it(`does not renders the list of article attributes from the 
      viewArticle response if viewArticle.ok is false`, async () => {
      mockedPerformOperation.mockResolvedValue({
        data: {
          viewArticle: {
            ok: false,
            article: { id: '1' },
          },
        },        
      });
      const wrapper = createWrapper();
      const expected = '';

      await flushPromises();

      const actual = wrapper.find('[data-test="articleAttributeList"]').text();
      expect(actual).toBe(expected);
    });
  });
});

