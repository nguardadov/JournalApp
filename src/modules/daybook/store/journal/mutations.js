//export const myMutation = (state)=>{}

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries] //CONVINAR ARREGLOS
  state.isLoading = false
  console.log('{entro aqui}')
}

export const updateEntry = (state, entry) => {
  // const index = state.entries.findIndex((element) => element.id === entry.id)
  // state.entries[index] = entry

  //creando un arreglo de indices
  const idx = state.entries.map((e) => e.id).indexOf(entry.id)
  state.entries[idx] = entry
}

export const addEntry = (state, entry) => {
  state.entries = [entry, ...state.entries]
}

export const deleteEntry = (state, id) => {
  // const index = state.entries.findIndex((element) => element.id === id)
  // state.entries.splice(index, 1)
  state.entries = state.entries.filter((entry) => entry.id !== id)
}

export const clearEntries = (state) => {
  state.entries = []
}
