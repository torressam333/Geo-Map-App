import { shallowMount } from '@vue/test-utils';
import MapFeatures from '@/components/MapFeatures';
import axios from 'axios';
import getSearchResults from '@/api/getSearchResults';

// Let's mock this bad boy
jest.mock('axios');

describe('MapFeatures', () => {
  let wrapper;

  beforeEach(() => {
    // Make it anew for each test
    axios.mockClear();

    jest.useFakeTimers('legacy');

    // Fake api data
    axios.get.mockResolvedValue({
      searchQuery: 'Starbucks',
      params: {
        fuzzyMatch: true,
        language: 'en',
        limit: 10,
      },
    });

    wrapper = shallowMount(MapFeatures, {
      propsData: {
        coords: {},
        fetchCoords: true,
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('emits a method to toggle location services', async () => {
    wrapper.vm.$emit('getGeoLocation');

    // Wait until $emits have been handled
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().getGeoLocation).toBeTruthy();
  });

  it('renders the modal markup correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should clear timeout after fetching data', async () => {
    const setTimeout = jest.fn();

    setTimeout(1500);

    // Mock api call after timeout expires
    await getSearchResults();

    // Assertions
    expect(setTimeout).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalled();
  });
});
