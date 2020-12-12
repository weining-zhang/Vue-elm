<template>
  <div id="app">
    <router-view/>
    <svgIcon/>
  </div>
</template>

<script>
  import svgIcon from './components/common/svg.vue'

  export default {
    name: 'App',
    components: {
      svgIcon
    }
  }
</script>

<style lang="scss">
  // @import "normalize-scss/sass/normalize/import-now";
  @import './assets/scss/common.scss';
</style>
