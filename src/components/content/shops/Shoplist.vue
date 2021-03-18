<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length" type="1">
      <router-link :to="{path: 'shop', query: {geohash, id: item.id}}" v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li">

      </router-link>
    </ul>
  </div>
</template>

<script>
  import { shopList } from 'network/getData'

  export default {
    name: "Shoplist",
    components:{},
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr: [], // 店铺列表数据
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
      }
    }
  }
</script>

<style scoped>

</style>
