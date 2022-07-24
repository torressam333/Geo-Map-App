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

  it('outputs a custom error message when received as props', async () => {
    await wrapper.setProps({
      errorMessage: 'Oops your location cannot be found',
    });

    expect(wrapper.vm.errorMessage).toBe('Oops your location cannot be found');
    expect(wrapper.html()).toContain(
      '<h1 class="text-xl mb-3">Error: Oops your location cannot be found</h1>'
    );
  });
});
