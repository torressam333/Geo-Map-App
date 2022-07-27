import { shallowMount } from '@vue/test-utils';
import MapFeatures from '@/components/MapFeatures';

describe('MapFeatures', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MapFeatures, {
      propsData: {
        coords: {},
        fetchCoords: true,
      },
    });
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
});
