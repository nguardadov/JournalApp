import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'

describe('Pruebas en el about view', () => {
  test('debe de renderizar el componente correctament', () => {
    const wrapper = shallowMount(About)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
