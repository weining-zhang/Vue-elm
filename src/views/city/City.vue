<template>
  <div class="city_container">

    <HeadTop :headTitle="cityName" :goBack="true">
      <template #changecity>
        <router-link to="/home" class="change_city">切换城市</router-link>
      </template>
    </HeadTop>

    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" 
               class="city_input input_style" required >
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style"
               @click="postpois" value="搜索" >
      </div>
    </form>

    <header v-if="historyTitle" class="pois_search_history">搜索历史</header>

    <ul class="getpois_ul">

    </ul>

    <footer v-if="historyTitle && placeList.length" class="clear_all_history" @click="clearAll">清空所有</footer>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head'
  import { currentCity } from 'network/getData'
  import { getStore } from 'common/utils'

  export default {
    name: "City",
    components:{
      HeadTop
    },
    data() {
      return {
        cityId: '',         // 当前城市id
        cityName: '',       // 当前城市名字
        historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeList: [],      // 搜索城市列表
      }
    },
    mounted() {
      this.cityId = this.$route.params.cityId
      currentCity(this.cityId).then(res => {
        this.cityName = res.name
      })
    },
    methods: {
      // 获取搜索历史记录
      initData() {
        if (getStore('placeHistory')) {
          this.placeList = JSON.parse(getStore('placeHistory'))
        } else {
          this.placeList = []
        }
      },
      // 发送搜索信息inputValue
      postpois() {

      },
      clearAll() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .city_container {
    padding-top: 54.99px;
  }

  .change_city {
    @include sc(14.04px, #fff);
    @include ct;
    right: 9.36px;
  }

  .city_form {
    background-color: #fff;
    padding-top: 9.375px;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style {
        @include wh(100%, 32.76px);
        border-radius: 2.34px;
        margin-bottom: 9.375px;
      }
      .city_input {
        @include sc(15.21px, #333);
        border: 1px solid $bc;
        padding: 0 7.03px;
      }
      .city_submit {
        @include sc(15.21px, #fff);
        background-color: $blue;
      }
    }
  }

  .pois_search_history {
    @include font(12.5px, 18.72px);
    padding-left: 11.72px;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
  }
</style>
