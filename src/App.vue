<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    Index,
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  position: relative;
}
</style>
