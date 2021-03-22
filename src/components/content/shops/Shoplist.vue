<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length" type="1">
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
  </div>
</template>

<script>
  import { shopList } from 'network/getData'
  import { imgBaseUrl } from 'common/env'
  import { loadMore, getImgPath } from '../mixin'
  import ratingStar from '../ratingStar';

  export default {
    name: "Shoplist",
    components:{
      ratingStar
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr: [], // 店铺列表数据
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
      },

      isOnTime(supports) {
        let onTimeStatus = false;
        if ((supports instanceof Array) && supports.length) {
          supports.forEach(item => {
            if (item.icon_name === '准')  onTimeStatus = true;
          })
        }

        return onTimeStatus
      }
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
  }
</style>
