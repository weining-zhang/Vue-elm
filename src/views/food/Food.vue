<template>
  <div class="food_container">
    <NavBar :headTitle='headTitle' goBack='true' />

    <section class="sort_container">
      <!-- 分类 -->
      <div class="sort_item" :class="{choose_type:sortBy === 'food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span>{{foodTitle}}</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>

        <transition name="showlist" v-show="category">
          <section v-show="sortBy === 'food'" class="category_container sort_detail_type">
            <section class="category_left">

            </section>
          </section>
        </transition>
      </div>

			<!-- 排序 -->
      <div class="sort_item" :class="{choose_type:sortBy === 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'sort'}">排序</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>

        <transition name="showlist">
          
        </transition>
      </div>
      

    </section>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import NavBar from 'components/header/Head.vue'
  import {
    foodCategory
  } from 'network/getData';

  export default {
    name: "Food",
    components:{
      NavBar
    },
    data() {
      return {
        geohash: '',    // city页面传递过来的地址geohash
        headTitle: '',  // msiet页面头部标题
        foodTitle: '',  // 排序左侧头部标题
        sortBy: '',     // 筛选的条件
        category: null, // category分类左侧数据
      }
    },
    created() {
      this.initData();
    },
    computed: {
      ...mapState(["latitude", "longitude"])
    },
    methods: {
      // 初始化获取数据
      async initData() {
        this.headTitle = this.$route.query.title;
        this.foodTitle = this.headTitle;

        // 获取 category 分类左侧数据
        this.category = await foodCategory(this.latitude, this.longitude);
      },


      // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
      choose_type(type) {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .food_container {
    padding-top: 3.6rem;
  }

  .sort_container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 46px;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
    .sort_item {
      @include sc(0.55rem, #444);
      @include wh(33.3%, 1.6rem);
      text-align: center;
      line-height: 1rem;
      .sort_item_container {
        @include wh(100%, 100%);
        position: relative;
        z-index: 14;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: 0.3rem;
        .sort_item_border {
          height: 1rem;
          border-right: 0.025rem solid $bc;
        }
      }
      .sort_icon {
        vertical-align: middle;
        transition: all 0.3s;
        fill: #666;
      }
    }
    .showlist-enter-active,
    .showlist-leave-active {
      transition: all 0.3s;
      transform: translateY(0);
    }
    .showlist-enter,
    .showlist-leave-active {
      opacity: 0;
      transform: translateY(-100%);
    }

  }
</style>
