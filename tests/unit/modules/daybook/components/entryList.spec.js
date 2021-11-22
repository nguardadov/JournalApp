import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import EntryList from '@/modules/daybook/components/EntryList.vue'
//import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal, //desctructurar
        state: { ...initialState }, //aca sobreescribimos el state con lo que tengamos en initialstate
      },
    },
  })

describe('Pruebas en el EntryList', () => {
  //   const journalMockModule = {
  //     namespaced: true,
  //     getters: {
  //       getEntriesByTerm,
  //     },
  //     state: () => ({
  //       isLoading: true,
  //       entries: journalState.entries,
  //     }),
  //   }

  //   const store = createStore({
  //     modules: {
  //       journal: { ...journalMockModule },
  //     },
  //   })

  const store = createVuexStore(journalState)

  const mockRouter = {
    push: jest.fn(),
  }
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
  })

  test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
    //entry-stub
    //console.log(wrapper.html())
    expect(wrapper.findAll('entry-stub').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
    const input = wrapper.find('input')
    await input.setValue('comienzan')
    expect(wrapper.findAll('entry-stub').length).toBe(1)
  })

  test('El boton nuevo debe de reddirecciona a /new', async () => {
    wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenLastCalledWith({
      name: 'entry',
      params: { id: 'new' },
    })
  })
})
