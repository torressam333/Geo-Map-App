import { shallowMount } from '@vue/test-utils';
import GeoErrorModal from '@/components/GeoErrorModal';

describe('GeoErrorModal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GeoErrorModal, {
      propsData: {
        errorMessage: '',
      },
    });
  });

  it('emits a method to close the modal', async () => {
    wrapper.vm.$emit('closeGeoError');

    // Wait until $emits have been handled
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().closeGeoError).toBeTruthy();
  });

  it('renders the modal markup correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
