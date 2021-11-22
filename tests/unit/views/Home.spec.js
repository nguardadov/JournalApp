import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Pruebas en el Home view', () => {
  test('debe de renderizar el componente correctament', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Hacer click en un boton debe de redireccionar a no-entry', () => {
    const mockRouter = {
      push: jest.fn(),
    }

    //aca lo que hacemos es indicarle que use nuestro mock y no el global que trae el $router
    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    })

    wrapper.find('button').trigger('click')
    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toBeCalledWith({ name: 'no-entry' })
  })
})
