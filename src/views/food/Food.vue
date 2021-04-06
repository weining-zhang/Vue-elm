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
      
			<!-- 筛选 -->
      <div class="sort_item" :class="{choose_type:sortBy === 'activity'}">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'activity'}">筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>

        <transition name="showlist">

        </transition>
      </div>
      
      <transition name="showcover">
        <div class="back_cover" v-show="sortBy"></div>
      </transition>

      <section class="shop_list_container">
        <Shoplist 
          :geohash="geohash" 
          :restaurantCategoryId="restaurant_category_id"
          :restaurantCategoryIds="restaurant_category_ids"
          :sortByType="sortByType"
          :deliveryMode="delivery_mode" 
          :confirmSelect="confirmStatus" 
          :supportIds="support_ids"
          v-if="latitude"
        />
      </section>
    </section>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import NavBar from 'components/header/Head.vue'
  import Shoplist from 'components/content/shops/Shoplist.vue';
  import {
    foodCategory
  } from 'network/getData';

  export default {
    name: "Food",
    components:{
      NavBar,
      Shoplist
    },
    data() {
      return {
        geohash: '',                 // city页面传递过来的地址geohash
        headTitle: '',               // msiet页面头部标题
        foodTitle: '',               // 排序左侧头部标题
        restaurant_category_id: '',  // 食品类型id值
        restaurant_category_ids: '', // 筛选类型的id
        sortBy: '',                  // 筛选的条件
        category: null,              // category分类左侧数据
        categoryDetail: null,        // category分类右侧的详细数据
        sortByType: null,            // 根据何种方式排序
        Delivery: null,              // 配送方式数据
        support_ids: [],             // 选中的商铺活动列表
        delivery_mode: null,         // 选中的配送方式
        confirmStatus: false         // 确认选择
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
        // 获取从msite页面传递过来的参数
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
        this.foodTitle = this.headTitle;
        this.restaurant_category_id = this.$$route.query.restaurant_category_id;

        // 获取 category 分类左侧数据
        this.category = await foodCategory(this.latitude, this.longitude);
      },


      // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
      choose_type(type) {

      },

      // 选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
      selectCategoryName(id, index) {
          // 第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
        if (index === 0) {
          this.restaurant_category_ids = null;
          this.sortBy = '';
        } else {
          //不是第一个选项时，右侧展示其子级sub_categories的列表
          this.restaurant_category_ids = id;
          this.categoryDetail = this.category[index].sub_categories;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .food_container {
    padding-top: 7px;
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
        padding-top: 7px;
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
