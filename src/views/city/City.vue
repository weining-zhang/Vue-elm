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
               class="city_input input_style" required v-model="inputValue">
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style"
               @click="postpois" value="搜索" >
      </div>
    </form>

    <header v-if="historyTitle" class="pois_search_history">搜索历史</header>

    <ul class="getpois_ul">
      <li v-for="(item, index) in placeList" :key="index" @click="nextPage(index, item.geohash)">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>

    <footer v-if="historyTitle && placeList.length" class="clear_all_history" @click="clearAll">清空所有</footer>

    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head'
  import { currentCity, searchPlace } from 'network/getData'
  import { getStore, setStore, removeStore } from 'common/utils'

  export default {
    name: "City",
    components:{
      HeadTop
    },
    data() {
      return {
        inputValue: '',     // 搜索地址
        cityId: '',         // 当前城市id
        cityName: '',       // 当前城市名字
        historyTitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeList: [],      // 搜索城市列表
        placeHistory: [],   // 历史搜索记录
        placeNone: false,   // 搜索无结果，显示提示信息
      }
    },
    mounted() {
      this.cityId = this.$route.params.cityId
      currentCity(this.cityId).then(res => {
        this.cityName = res.name
      })
      this.initData()
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
      
      // 发送搜索信息 inputValue
      postpois() {
        // 输入值不为空时才发送信息
        if (this.inputValue) {
          searchPlace(this.cityId, this.inputValue).then(res => {
            console.log(res);
            this.historyTitle = false
            this.placeList = res
            this.placeNone = res.length ? false : true
          })
        }
      },

      /**
       * 点击 搜索结果 进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextPage(index, geohash) {
        let history = getStore('placeHistory')
        let selectedPlace = this.placeList[index]
        if (history) {
          let placeRepeat = false
          this.placeHistory = JSON.parse(history)
          this.placeHistory.forEach(item => {
            if (item.geohash === geohash) {
              placeRepeat = true
            }
          })
          if (!placeRepeat) {
            this.placeHistory.push(selectedPlace)
          }
        } else {
          this.placeHistory.push(selectedPlace)
        }
        setStore('placeHistory', this.placeHistory)
        this.$router.push('/home')
      },

      // 清空历史记录
      clearAll() {
        removeStore('placeHistory')
        this.initData()
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

  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid $bc;
    li {
      margin: 0 auto;
      padding-top: 15.21px;
      border-bottom: 1px solid $bc;
      .pois_name {
        @include sc(15.21px, #333);
        margin: 0 auto 8.20px;
        width: 90%;
      }
      .pois_address {
        @include sc(10.53px, #999);
        margin: 0 auto 12.89px;
        width: 90%;
      }
    }
  }

  .search_none_place {
    @include font(15.2px, 41px);
    margin: 0 auto;
    background-color: #fff;
    color: #333;
    text-indent: 11.7px;
  }

  .clear_all_history {
    @include sc(16.41px, #666);
    background-color: #fff;
    text-align: center;
    line-height: 46.8px;
  }
</style>
