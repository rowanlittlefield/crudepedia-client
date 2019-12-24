import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ArticleView from '@/views/ArticleView.vue';
import crudepediaService from '@/services/crudepedia.ts';
import VIEW_ARTICLE_MUTATION from '@/graphql/mutation/view-article.gql';

jest.mock('@/services/crudepedia');

const crudepediaServiceStub = crudepediaService as any;

const localVue = createLocalVue();

describe('ArticleView', () => {
  const createResponse = () => ({
    data: {
      viewArticle: {
        ok: true,
        article: {
          id: '1',
          author: {
            id: '1',
            username: 'Test',
          },
        },
      },
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
    });

    return wrapper;
  };

  describe('authorLink', () => {
    it('does not render authorLink when vm.article.author is falsy', () => {
      crudepediaServiceStub.performOperation.mockResolvedValue({
        data: {
          viewArticle: {
            ok: false,
            article: {},
          },
        },
      });
      const wrapper = createWrapper();
      const expected = false;

      const actual = wrapper.find('[data-test="authorLink"]').exists();
      expect(actual).toBe(expected);
    });

    it(`renders authorLink with the correct "to" attribute
      when vm.article.author is truthy`, async () => {
      crudepediaServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper: any = createWrapper();

      await flushPromises();

      const expected = `/user/${wrapper.vm.article.author.id}`;
      const actual = wrapper.find('[data-test="authorLink"]').attributes('to');
      expect(actual).toBe(expected);
    });

    it(`renders authorLink with the correct text
      when vm.article.author is truthy`, async () => {
      crudepediaServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper: any = createWrapper();

      await flushPromises();

      const expected = `${wrapper.vm.article.author.username}`;
      const actual = wrapper.find('[data-test="authorLink"]').text();
      expect(actual).toBe(expected);
    });
  });

  describe('dashboardLink', () => {
    it('sets the "to" attribute to the correct value', () => {
      crudepediaServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = '/';

      const actual = wrapper.find('[data-test="dashboardLink"]').attributes('to');
      expect(actual).toBe(expected);
    });
  });

  describe('mounted', () => {
    it('calls crudepediaService.performOperation with the correct arguments', () => {
      crudepediaServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const args = [
        VIEW_ARTICLE_MUTATION,
        { id: wrapper.vm.$route.params.articleId },
      ];

      const method = crudepediaService.performOperation;
      expect(method).toHaveBeenCalledWith(...args);
    });

    it(`renders a list of all article primitive attributes from the
      viewArticle response if viewArticle.ok is true`, async () => {
      crudepediaServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = 'id: 1';

      await flushPromises();

      const actual = wrapper.find('[data-test="articleAttributeList"]').text();
      expect(actual).toBe(expected);
      });

    it(`does not render the list of article attributes from the
      viewArticle response if viewArticle.ok is false`, async () => {
      crudepediaServiceStub.performOperation.mockResolvedValue({
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

