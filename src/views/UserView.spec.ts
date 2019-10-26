import { createLocalVue, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import UserView from '@/views/UserView.vue';
import graphQLService from '@/services/graphql';
import USER_QUERY from '@/graphql/query/user.gql';

jest.mock('@/services/graphql');

const graphQLServiceStub = graphQLService as any;

const localVue = createLocalVue();

describe('UserView', () => {
  const createResponse = () => ({
    data: {
      user: {
        id: '1',
        articleSet: [
          {
            id: '1',
            title: 'Hello',
          },
          {
            id: '2',
            title: 'World',
          },
        ],
      },
    },
  });

  const createWrapper = () => {
    const wrapper = shallowMount(UserView, {
      localVue,
      mocks: {
        $route: {
          params: {
            userId: '1',
          },
        },
      },
      stubs: [
        'router-link',
      ],
    });

    return wrapper;
  };

  describe('dashboardLink', () => {
    it('sets the "to" attribute to the correct value', () => {
      graphQLServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = '/';

      const actual = wrapper.find('[data-test="dashboardLink"]').attributes('to');
      expect(actual).toBe(expected);
    });
  });

  describe('articleLinks', () => {
    it('does not render the articleLinks list when vm.user.articleSet is empty', () => {
      graphQLServiceStub.performOperation.mockResolvedValue({
        data: {
          user: {
            articleSet: [],
          },
        },
      });
      const wrapper = createWrapper();
      const expected = false;

      const actual = wrapper.find('[data-test="articleLinks"]').exists();
      expect(actual).toBe(expected);
    });

    it(`renders one link with the correct "to" attribute and content
      for each article in vm.user.articleSet`, async () => {
      const response = createResponse();
      graphQLServiceStub.performOperation.mockResolvedValue(response);
      const wrapper = createWrapper();
      const expected = response.data.user.articleSet.map((article) => ({
        to: `/article/${article.id}`,
        text: article.title,
      }));

      await flushPromises();

      const actual = wrapper.findAll('[data-test="articleLink"]')
        .wrappers.map((el) => ({
          to: el.attributes('to'),
          text: el.text(),
        }));
      expect(actual).toEqual(expected);
    });
  });

  describe('mounted', () => {
    it('calls graphQLService.performOperation with the correct arguments', () => {
      graphQLServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const args = [
        USER_QUERY,
        { id: wrapper.vm.$route.params.userId },
      ];

      const method = graphQLService.performOperation;
      expect(method).toHaveBeenCalledWith(...args);
    });

    it('renders a list of all user primitive attributes from the user response', async () => {
      graphQLServiceStub.performOperation.mockResolvedValue(createResponse());
      const wrapper = createWrapper();
      const expected = 'id: 1';

      await flushPromises();

      const actual = wrapper.find('[data-test="userAttributeList"]').text();
      expect(actual).toBe(expected);
    });
  });
});