<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id}}" v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li">
        <img :src="imgBaseUrl + item.image_path" class="shop_img">

        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 :class="item.is_premium ? 'premium' : ''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>

          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <div class="rating_section">
                <ratingStar :rating='item.rating'></ratingStar>
                <span class="rating_num">{{item.rating}}</span>
              </div>

              <div class="order_section">
                月售{{item.recent_order_num}}单
              </div>
            </section>

            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right" v-if="isOnTime(item.supports)">准时达</span>
            </section>
          </h5>

          <h5 class="fee_distance">
            <p class="fee">
              ¥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>

            <p class="distance_time">
              <span>{{item.distance}}</span>
              <span class="segmentation"> / </span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>

    <ul v-else class="animation_opactiy">
			<li class="list_back_li" v-for="item in 10" :key="item">
				<img src="~assets/img/shopback.svg" class="list_back_svg">
			</li>
		</ul>

		<p v-if="touchend" class="empty_data">没有更多了</p>

    <aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>

		<div ref="abc" style="background-color: red;"></div>

    <!-- <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition> -->

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { shopList } from 'network/getData'
  import { imgBaseUrl } from 'common/env'
  import { showBack, animate } from 'common/utils'
  import { loadMore, getImgPath } from '../mixin'
  import loading from '../loading'
  import ratingStar from '../ratingStar';

  export default {
    name: "Shoplist",
    components:{
      loading,
      ratingStar
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState([
        'latitude','longitude'
      ]),
    },
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr: [], // 店铺列表数据
        touchend: false, // 没有更多数据
        preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
        showBackStatus: false, // 显示返回顶部按钮
        showLoading: true, // 显示加载动画
        imgBaseUrl,
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      async initData() {
        // 获取数据
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
        console.log(res);
        this.shopListArr = [...res]
        if (res.length < 20) {
          this.touchend =  true
        }

        this.hideLoading();

			  //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
        showBack(status => {
          this.showBackStatus = status;
        });
      },

		  //到达底部加载更多数据
      async loaderMore() {
        if (this.touchend) {
          return
        }
			  //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;

        //数据的定位加20位
        this.offset += 20;
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.hideLoading();
        this.shopListArr = [...this.shopListArr, ...res];
        //当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (res.length < 20) {
          this.touchend = true;
          return
        }
        this.preventRepeatReuqest = false;
      },

      // 返回顶部
      backTop() {
        animate(document.body, {scrollTop: '0'}, 400,'ease-out');
      },

      //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
      async listenPropChange(){
        this.showLoading = true;
        this.offset = 0;
        let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
        this.hideLoading();
        //考虑到本地模拟数据是引用类型，所以返回一个新的数组
        this.shopListArr = [...res];
      },

      //开发环境与编译环境loading隐藏方式不同
      hideLoading(){
        this.showLoading = false;
      },

      isOnTime(supports) {
        let onTimeStatus = false;
        if ((supports instanceof Array) && supports.length) {
          supports.forEach(item => {
            if (item.icon_name === '准')  onTimeStatus = true;
          })
        }
        return onTimeStatus
      },
    },
    watch: {
      
    }
  }
</script>

<style lang="scss" scoped>
  @import 'assets/scss/mixin';

  .shoplist_container {
    background-color: #fff;
		margin-bottom: 2rem;

    .shop_li {
      display: flex;
      border-bottom: .59px solid #f1f1f1;
      padding: 16.4px 9.375px;
    }

    .shop_img {
      @include wh(63.3px, 63.3px);
      display: block;
      margin-right: 9.375px;
    }

    .list_back_li {
      height: 4.85rem;
      .list_back_svg{
        @include wh(100%, 100%)
      }
    }

    .shop_right {
      flex: auto;

      .shop_detail_header {
        @include fj;
        align-items: center;

        .shop_title {
          @include font(15.23px, 15.23px, 'PingFangSC-Regular');
          font-weight: 700;
          width: 199.22px;
          color: #333;
          padding-top: 0.23px;
        }

        .premium::before {
          content: '品牌';
          display: inline-block;
          font-size: 11.72px;
          line-height: 14.1px;
          color: #333;
          background-color: #ffd930;
          padding: 0 2.34px;
          border-radius: 2.34px;
          margin-right: 4.68px;
        }

        .shop_detail_ul {
          display: flex;
          transform: scale(.8);
          margin-right: -7.02px;

          .supports {
            @include sc(11.7px, #999);
            border: 0.59px solid #f1f1f1;
            padding: 0 0.94px;
            border-radius: 1.8px;
            margin-left: 1px;
          }
        }
      }

      .rating_order_num {
        @include fj(space-between);
        height: 14.05px;
        margin-top: 12.2px;

        .rating_order_num_left {
          @include fj(flex-start);

          .rating_section {
            display: flex;
            .rating_num {
              @include sc(9.4px, #ff6000);
              margin: 0 4.68px;
            }
          }

          .order_section {
            @include sc(13.3px, #666);
            transform: scale(.8);
            margin-left: -4.68px;
          }
        }

        .rating_order_num_right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          transform: scale(.7);
          max-width: 117.15px;
          margin-right: -16px;

          .delivery_style {
            font-size: 9.37px;
            padding: 0.94px 1.88px 0;
            border-radius: 1.88px;
            margin-left: 1.88px;
            border: 1px;
          }

          .delivery_left {
            color: #fff;
            background-color: $blue;
            border: 0.59px solid $blue;
          }

          .delivery_right {
            color: $blue;
            border: 0.59px solid $blue;
          }
        }
      }

      .fee_distance {
        @include fj;
        @include sc(11.7px, #333);
        margin-top: 12.18px;

        .fee {
          @include sc(11.7px, #666);
          transform: scale(.9);
        }

        .distance_time {
          transform: scale(.9);
          span {
            color: #999;
          }
          .order_time {
            color: $blue;
          }
          .segmentation {
            color: #ccc;
          }
        }
      }
    }

    .empty_data {
      @include sc(0.5rem, #666);
		  text-align: center;
		  line-height: 2rem;
    }

  	.return_top {
      position: fixed;
      bottom: 3rem;
      right: 1rem;
      .back_top_svg {
        @include wh(2rem, 2rem);
      }
	  }
  }

  .loading-enter-active, .loading-leave-active {
    transition: opacity 1s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
</style>
