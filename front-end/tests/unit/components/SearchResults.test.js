import { shallowMount } from '@vue/test-utils';
import SearchResults from '@/components/SearchResults';

describe('SearchResults', () => {
  const createResultsData = (searchDataResults = {}) => ({
    place_name:
      'Starbucks, 1580 N Verrado Way, Buckeye, Arizona 85396, United States',
    ...searchDataResults,
  });

  // Dynamic config object for wrapper mounting
  const createConfig = (searchDataResults) => ({
    propsData: {
      searchData: {
        ...searchDataResults,
      },
    },
  });

  it('has matching html output', () => {
    const wrapper = shallowMount(SearchResults);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders an address', async () => {
    const searchDataResults = createResultsData([
      {
        place_name: 'Starbucks, 1580 fake street',
      },
    ]);

    const wrapper = shallowMount(
      SearchResults,
      createConfig(searchDataResults)
    );

    // Set the v-if to true
    await wrapper.setProps({ searchQuery: 'Starbucks' });

    expect(wrapper.text()).toMatch('Starbucks, 1580 fake street');
  });

  it('does not render results without a searchQuery', () => {
    const wrapper = shallowMount(SearchResults, createConfig());
    expect(wrapper.text()).toMatch('');
  });

  it('emits a method to pass selected location to parent', async () => {
    const wrapper = shallowMount(SearchResults);

    wrapper.vm.$emit('setResult');

    // Wait until $emits have been handled
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().setResult).toBeTruthy();
  });
});
