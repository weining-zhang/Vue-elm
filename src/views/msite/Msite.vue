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
            <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}"
                        v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <img src="assets/img/fl.svg" class="fl_back animation_opactiy" v-else>
    </nav>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head.vue'
  import { cityGuess, msiteAddress, msiteFoodTypes } from 'network/getData'
  import 'common/swiper.min.js'
  import 'assets/css/swiper.min.css'

  export default {
    name: "Msite",
    components:{
      HeadTop,
    },
    data() {
      return {
        geohash: '',                       // City页面传递过来的地址geohash
        msiteTitle: '请选择地址...',                // Msite页面顶部标题
        foodTypes: [],                             // 食品分类列表
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      }
    },
    mounted() {
      // 获取导航食品分类列表
      msiteFoodTypes(this.geohash).then(res => {
        console.log(res);
        let len = res.length
        let foodArr = []
        while (res.length) {
          foodArr.push(res.splice(0, 8))
        }
        console.log(foodArr);
        this.foodTypes = foodArr
      }).then(() => {
        // 初始化swiper
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: false
        });
      })
    },
    methods: {
      // 解码url地址，求去restaurant_category_id值
      getCategoryId(url) {
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id
        }else{
          return ''
        }
      }
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

  .msite_nav {
    height: 248px;
    padding-top: 49.1px;
    background-color: #fff;
    border-bottom: 1px solid $bc;
    .swiper-container {
      @include wh(100%, auto);
      padding-bottom: 14px;
      .swiper-pagination {
        position: relative;
        top: 1px;
        bottom: 4.7px;
      }
    }
    .fl_back{
			@include wh(100%, 100%);
		}
  }

  .food_types_container {
    display: flex;
    flex-wrap: wrap;
    .link_to_food {
      @include fj(center);
      width: 25%;
      padding: 7px 0;
      figure {
        img {
          @include wh(42.1px, 42.1px);
          margin-bottom: 7px;
        }
        figcaption {
          @include sc(12.9px, #666);
          text-align: center;
        }
      }
    }
  }
</style>
