<template>
  <div id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>

    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>

    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text"> {{headTitle}} </span>
    </section>

    <router-link :to="userInfo ? '/profile' : '/login'" v-if="signinUp" class="head_login">
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login_span">登录 | 注册</span>
    </router-link>

    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </div>
</template>

<script>
  export default {
    name: "Head",
    props: ['signinUp', 'headTitle', 'goBack'],
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

  .head_login {
    .login_span {
      color: #fff;
    }
    right: 12.87px;
  }
</style>
