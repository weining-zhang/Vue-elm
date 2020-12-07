<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <router-link>
      
    </router-link>
    <section class="title_head ellipsis" v-if="">
      <span class="title_text"></span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
  export default {
    name: "Head",
    components:{},
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  #head_top {
    background-color: $blue;
    @include wh(100%, 46px);
  }
</style>
