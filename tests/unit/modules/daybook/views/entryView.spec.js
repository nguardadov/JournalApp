import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Swal from 'sweetalert2'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView.vue'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal, //desctructurar
        state: { ...initialState }, //aca sobreescribimos el state con lo que tengamos en initialstate
      },
    },
  })

//crear el espia
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}))

describe('Pruebas en el EntryView', () => {
  const store = createVuexStore(journalState)
  store.dispatch = jest.fn() //con esto simularemos la funcion del distpach

  const mockRouter = {
    push: jest.fn(),
  }
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-Ml2ipCYawXQcMK3BbOe',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
  })

  test('debe de sacar al usuario porque el id no existe', () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'este id no existe',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
  })

  test('debe de mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot() //debe ser igual el snaptshop
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  test('debe de borrar la entrada y salir', (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))
    wrapper.find('.btn-danger').trigger('click')

    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¿Está seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    })

    //esto se hace para espera un milisegundo
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        'journal/deleteEntry',
        '-Ml2ipCYawXQcMK3BbOe',
      )
      expect(mockRouter.push).toHaveBeenCalled()
      done()
    }, 1)
  })
})
