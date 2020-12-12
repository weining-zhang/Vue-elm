<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <router-link to="/home">
      <span class="login_span">登录 | 注册</span>
    </router-link>
    <section class="title_head ellipsis">
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
    @include wh(100%, 46px);
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
  }
</style>
