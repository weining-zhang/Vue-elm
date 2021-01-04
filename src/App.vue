<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view v-if="$route.meta.keepAlive"/>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
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

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  
	.router-fade-enter, .router-fade-leave-to {
    opacity: 0;
	}
</style>
