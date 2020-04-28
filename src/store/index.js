import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: true,
  state: {
    userType:'',
    OrderDetailId:'',
    HotgoodsId:'',
    orderevaluate:{},
  },
  mutations: {
    getuser(state,data){
      state.userType = data
    },
    getorderDetailId(state,data){
      state.OrderDetailId = data
    },
    // 获取热门商品id
    getHotgoodsId(state,data){
      state.HotgoodsId = data
    },
    getorderevaluate(state,data){
      state.orderevaluate = data
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store
