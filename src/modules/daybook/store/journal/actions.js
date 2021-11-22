import journalApi from '@/api/journalApi'

//export const myAction = async({commit})=>{}
export const loadEntries = async ({ commit }) => {
  try {
    const { data } = await journalApi.get('/entries.json')

    if (!data) {
      commit('setEntries', [])
      return
    }
    const entries = []
    for (let id of Object.keys(data)) {
      entries.push({
        id,
        ...data[id],
      })
    }

    commit('setEntries', entries)
  } catch (error) {
    console.log('error: ', { error })
  }
}

export const updateEntry = async ({ commit }, entry) => {
  const { date, picture, text } = entry
  const dataTosave = { date, picture, text }

  await journalApi.put(`/entries/${entry.id}.json`, dataTosave)
  // console.log({ id, ...data })
  //commit a updateentry mutations
  dataTosave.id = entry.id
  commit('updateEntry', { ...dataTosave }) //rompiendo la referencia
}

export const createEntries = async ({ commit }, entry) => {
  const { date, picture, text } = entry
  const dataTosave = { date, picture, text }

  const { data } = await journalApi.post(`/entries.json`, dataTosave)

  dataTosave.id = data.name

  commit('addEntry', dataTosave)

  return data.name
}

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`)
  commit('deleteEntry', id)
}
