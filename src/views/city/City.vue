<template>
  <div class="city_container">
    <HeadTop>
      <router-link to="/home" class="change_city">
        <template #changecity> <div>切换城市</div> </template>
      </router-link>
    </HeadTop>
  </div>
</template>

<script>
  import HeadTop from 'components/header/Head.vue'

  export default {
    name: "City",
    components:{
      HeadTop
    },
  }
</script>

<style lang="scss" scoped>

</style>
