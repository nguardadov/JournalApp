import { createStore } from 'vuex'
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

//esta prueba la haremos en consujto pro se el store
describe('Vuex - Pruebas en El journal Module', () => {
  //basic
  test('este es el estado incial debe de tener este state', () => {
    const store = createVuexStore(journalState)
    const { isLoading, entries } = store.state.journal
    expect(isLoading).toBeFalsy()
    expect(entries).toEqual(journalState.entries)
  })

  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] })
    store.commit('journal/setEntries', journalState.entries)
    // console.log(store.state.journal.isLoading)
    expect(store.state.journal.entries.length).toBe(2)
    expect(store.state.journal.isLoading).toBeFalsy()
  })

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState)
    const updateEntry = {
      id: '-Ml5j8OqpdrnNoX4TdDw',
      date: 1633274326205,
      text: 'Hola Mundo',
    }

    const storeEntries = store.state.journal.entries
    store.commit('journal/updateEntry', updateEntry)
    //console.log(store.state.journal.entries)
    expect(storeEntries.length).toBe(2)
    expect(storeEntries.find((e) => e.id === updateEntry.id)).toEqual(
      updateEntry,
    )
  })

  test('mutation: addEntry deleteEntry', () => {
    const store = createVuexStore(journalState)
    let storeEntries

    const entry = {
      id: 'ABC-123',
      date: 1633274326205,
      text: 'Hola Mundo',
    }

    store.commit('journal/addEntry', entry)
    storeEntries = store.state.journal.entries
    expect(storeEntries.length).toBe(3)
    expect(storeEntries.find((e) => e.id === entry.id)).toEqual(entry)

    //proceso de eliminar deleteEntry
    store.commit('journal/deleteEntry', entry.id)
    storeEntries = store.state.journal.entries
    expect(storeEntries.length).toBe(2)
    expect(storeEntries.find((e) => e.id === entry.id)).toBeUndefined()
  })

  test('mutation: getEntriesByTerm getEntryById', () => {
    const store = createVuexStore(journalState)
    const [entry1, entry2] = store.state.journal.entries
    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect(store.getters['journal/getEntriesByTerm']('entrada').length).toBe(1)

    expect(store.getters['journal/getEntriesByTerm']('entrada')).toEqual([
      entry2,
    ])

    expect(
      store.getters['journal/getEntryById']('-Ml5j8OqpdrnNoX4TdDw'),
    ).toEqual(entry1)
  })

  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] })
    //ejecutamos el actions
    await store.dispatch('journal/loadEntries')
    // console.log(store.state.journal.entries)
    expect(store.state.journal.entries.length).toBe(2)
  })

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState)
    const updateEntry = {
      id: '-Ml5j8OqpdrnNoX4TdDw',
      date: 1633274326205,
      text: 'comienzan los vientos de octubre o vientos de cambios',
      otra: 2,
      ella: 'd',
    }
    //ejecutamos el actions
    await store.dispatch('journal/updateEntry', updateEntry)
    // console.log(store.state.journal.entries)
    expect(store.state.journal.entries.length).toBe(2)
    expect(
      store.state.journal.entries.find((e) => e.id === updateEntry.id),
    ).toEqual({
      id: '-Ml5j8OqpdrnNoX4TdDw',
      date: 1633274326205,
      text: 'comienzan los vientos de octubre o vientos de cambios',
    })
  })

  test('actions: createEntry deleteEntry', async () => {
    //create store
    const store = createVuexStore(journalState)
    //new entry
    const newEntry = {
      date: '1633223914051',
      text: 'nueva entrada desde las pruebas',
    }
    //distpach de la accion createEntry
    const id = await store.dispatch('journal/createEntries', newEntry)
    expect(typeof id).toBe('string')
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy()
    //eliminar
    await store.dispatch('journal/deleteEntry', id)
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy()
  })
})
