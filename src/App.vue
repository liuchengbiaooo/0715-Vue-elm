<template>
  <div id="app">
    <router-view/>
    <FootGuide></FootGuide>
  </div>
</template>

<script>
  import FootGuide from "./components/FootGuide/FootGuide"
  export default {
    name: 'App',
    components: {
      FootGuide
    }
  }
</script>

<style>

</style>
