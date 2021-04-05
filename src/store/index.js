import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // latitude: '',                  // 当前位置纬度
	// longitude: '',                 // 当前位置经度
  userInfo: null,                // 用户信息
  login: true,                   // 是否登录
  geohash: '31.22299,121.36025', // 地址 geohash 值
}

export default new Vuex.Store({
  state,
	getters,
	actions,
	mutations,
})
