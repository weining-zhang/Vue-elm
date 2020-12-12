<template>
  <div>
    <HeadTop>
      <template #logo>
        <span class="head_logo" @click="reload">饿了么</span>
      </template>
    </HeadTop>

    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city">
        <span> {{guessCity}} </span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
    </nav>

    <section id="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="citylistul clear">
        <router-link tag="li" v-for="item in hotCity" :to="'/city/' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>

    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value, key, index) in sortGroupCity" :key="key" class="letter_classify_li">
          <h4 class="city_title">
            {{key}}
            <span v-if="index === 0">（按字母排序）</span>
          </h4>
          <ul class="groupcity_name_container citylistul clear">
            <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head.vue'
  import { cityGuess, hotCity, groupCity } from 'network/getData.js'

  export default {
    name: "Home",

    data() {
      return {
        guessCity: '',   // 当前城市
        guessCityid: '', // 当前城市id
        hotCity: [],     // 热门城市列表
        groupCity: {},   // 所有城市列表
      }
    },

    mounted() {
      // 获取当前定位城市
      cityGuess().then(res => {
        this.guessCity = res.name
        this.guessCityid = res.id
      })

      // 获取热门城市
      hotCity().then(res => {
        this.hotCity = res
      })

      // 获取所有城市
      groupCity().then(res => {
        this.groupCity = res
      })
    },

    components:{
      HeadTop
    },

    computed: {
      // 将获取的数据按照A-Z字母开头排序
      sortGroupCity() {
        let sortObj = {}
        Object.keys(this.groupCity).sort().forEach(key => {
          sortObj[key] = this.groupCity[key]
        })
        return sortObj
      }
    },

    methods: {
      reload() {
        window.location.reload()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .head_logo {
    @include sc(16.41px, #fff);
    @include wh(53.9px, 16.4px);
    @include ct;
    left: 9.36px;
    font-weight: 400;
  }

  .city_nav {
    padding-top: 53px;
    background-color: #fff;
    .city_tip {
      @include fj;
      line-height: 33.9px;
      padding: 0 10.5px;
      span:nth-of-type(1) {
        @include sc(12.9px, #666)
      };
      span:nth-of-type(2) {
        font-weight: 900;
        @include sc(11.1px, #9f9f9f)
      };
    }
  }

  .guess_city {
    @include fj;
    @include font(17.58px, 42.18px);
    span:nth-of-type(1) {
      color: $blue;
    }
    .arrow_right {
      @include wh(14.05px, 14.05px);
      fill: #999
    }
    align-items: center;
    height: 42.18px;
    padding: 0 10.55px;
    border-top: 1px solid $bc;
    border-bottom: 2px solid $bc;
  }

  #hot_city_container {
    // position: fixed;
    background-color: #fff;
    margin-bottom: 9.36px;
  }
  
  .city_title {
    @include font(12.89px, 37px, "Helvetica Neue");
    span {
      @include sc(12px, #999)
    }
    color: #666;
    font-weight: 400;
    text-indent: 10.53px;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
  }

  .citylistul {
    li {
      @include wh(25%, 40.95px);
      @include font(14.04px, 40.95px);
      float: left;
      text-align: center;
      color: $blue;
      border-bottom: 0.59px solid $bc;
      border-right: 0.59px solid $bc;
    }
    li:nth-of-type(4n) {
      border-right: none;
    }
  }

  .letter_classify_li {
    .groupcity_name_container {
      li {
        color: #666;
      }
    }
    margin-bottom: 9.36px;
    background-color: #fff;
    border-bottom: 1px solid $bc;
  }

</style>
