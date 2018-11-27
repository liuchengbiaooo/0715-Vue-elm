<template>
  <div id="app">
    <router-view/>
    <FootGuide></FootGuide>
  </div>
</template>

<script>
  import FootGuide from "./components/FootGuide/FootGuide"
  import {reqAddress} from "./api/index"
  export default {
    async mounted(){
      const res = await reqAddress(40.10038,116.36867)
      console.log("res=",res)
    },

    name: 'App',
    components: {
      FootGuide
    }
  }
</script>

<style>

</style>
