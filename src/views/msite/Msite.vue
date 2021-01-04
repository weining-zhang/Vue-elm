<template>
  <div>
    <HeadTop>
      <template #search>
        <router-link :to="'/search/geohash'" class="link_search">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
            <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
          </svg>
        </router-link>
      </template>

      <template #msite-title>
        <router-link to="/home" class="msite_title">
          <span class="title_text ellipsis">{{msiteTitle}}</span>
        </router-link>
      </template>
    </HeadTop>

    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food'}">
              <figure>
                <img src="">
                <figcaption></figcaption>
              </figure>
            </router-link>
          </div>
        </div>
      </div>
      <img src="assets/img/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head.vue'
  import { cityGuess, msiteAddress, msiteFoodTypes } from 'network/getData'

  export default {
    name: "Msite",
    components:{
      HeadTop
    },
    data() {
      return {
        geohash: '',                  // City页面传递过来的地址geohash
        msiteTitle: '请选择地址...',  // Msite页面顶部标题
        foodTypes: [],               // 食品分类列表
      }
    },
    mounted() {
      // 获取导航食品分类列表
      msiteFoodTypes(this.geohash).then(res => {
        console.log(res);
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .link_search {
    @include wh(21.1px, 21.1px);
    @include ct;
    left: 18.7px;
  }
  .msite_title {
    @include center;
    width: 50%;
    // color: #fff;
    text-align: center;
    .title_text {
      @include sc(18.7px, #fff)

    }
  }
</style>
