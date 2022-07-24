import { shallowMount } from '@vue/test-utils';
import MapFeatures from '@/components/MapFeatures';

describe('MapFeatures', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MapFeatures);
  });

  it('renders the modal markup correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
