import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

//classes reviso si una clase existe dentor de la etiqueta
describe('Pruebas en el Fab component', () => {
  test('debe de mostrar el icono por defecto', () => {
    const wrapper = shallowMount(Fab)
    expect(wrapper.find('i').classes('fa-plus')).toBe(true)
  })

  test('debe de mostrar el icono por el argumento: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle',
      },
    })
    expect(wrapper.find('i').classes('fa-circle')).toBe(true)
  })

  test('debe de emitir el evento on:click cuando se hace click', () => {
    const wrapper = shallowMount(Fab)
    const button = wrapper.find('button') //esto es porque solo hay un boton
    button.trigger('click')
    expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})
