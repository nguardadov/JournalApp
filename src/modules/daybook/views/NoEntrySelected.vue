<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay entradas seleccionadas</h1>
  </div>
  <Fab @on:click="createNewEntry" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name: 'NoEntrySelected',
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },

  methods: {
    createNewEntry() {
      //console.log('createentry')
      this.$router.push({ name: 'entry', params: { id: 'new' } })
    },
  },
}
</script>

<style style lang="scss" scoped>
div {
  height: 100%; /*usara todo el ancho de la pantalla*/
}
</style>
