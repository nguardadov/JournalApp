<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>

  <button class="btn btn-primary" @click="goDayBook">primary</button>
  <button class="btn btn-secondary" @click="goDayBook">secondary</button>
  <button class="btn btn-success" @click="goDayBook">success</button>
  <button class="btn btn-warning" @click="goDayBook">warning</button>
</template>

<script>
export default {
  methods: {
    goDayBook() {
      this.$router.push({ name: 'no-entry' })
    },
  },
}
</script>
