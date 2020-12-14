<template>
  <div class="city_container">

    <HeadTop :headTitle="cityName" :goBack="true">
      <router-link to="/home" class="change_city">
        <template #changecity><span>切换城市</span></template>
      </router-link>
    </HeadTop>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head.vue'
  import { currentCity } from 'network/getData'

  export default {
    name: "City",
    components:{
      HeadTop
    },
    data() {
      return {
        cityId: '',   // 当前城市id
        cityName: ''  // 当前城市名字
      }
    },
    mounted() {
      this.cityId = this.$route.params.cityId
      currentCity(this.cityId).then(res => {
        this.cityName = res.name
      })
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
</style>
