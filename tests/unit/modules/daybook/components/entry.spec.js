import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'
import { journalState } from './../../../mock-data/test-journal-state'
describe('Pruebas en Entry Component', () => {
  //mock router

  const mockRouter = {
    push: jest.fn(),
  }

  const wrapper = shallowMount(Entry, {
    props: {
      entry: journalState.entries[0],
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  })

  test('degbe de hacer match con el snapshot', () => {
    //console.log(wrapper.html())
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de redireccionar al hacer click en el entry-container', () => {
    wrapper.find('.entry-container').trigger('click')
    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toBeCalledWith({
      name: 'entry',
      params: { id: journalState.entries[0].id },
    })
  })

  test('Pruebas en las propiedades computadas', () => {
    //console.log(wrapper.vm.day, wrapper.vm.month, wrapper.vm.yearDay)
    expect(wrapper.vm.day).toBe(3)
    expect(wrapper.vm.month).toBe('Octubre')
    expect(wrapper.vm.yearDay).toBe('2021, Domingo')
  })
})
