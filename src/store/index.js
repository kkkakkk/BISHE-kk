import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户名
    username:'',
    // 用户身份
    identity:'',
    school_no:'',
  },
  getters: {
  },
  mutations: {
    //当显示登录页面的时候,调用这里初始化Vuex的状态
    init(state){
      state.username = ''
      state.identity = ''
    },
    //初始化用户名和角色
    setIN(state,IN){
      state.username=IN.username
      state.identity=IN.identity
    }
  },
  actions: {
  },
  modules: {
  }
})

