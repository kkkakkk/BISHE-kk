import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户名
    user_id:'',
    user_no:'',
    user_name:'',
    // 用户身份
    identity:'',
    school_no:'',
    school_name:'',
    major:''
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
    },
    setLoginInfo(state,loginInfo){

      state.user_no=loginInfo.user_no;
      state.user_id=loginInfo.user_id;

      state.user_name=loginInfo.user_name;
      state.identity=loginInfo.identity;
      state.school_no=loginInfo.school_no;
      state.school_name = loginInfo.school_name;
      state.major=loginInfo.major
      console.log("STATE:",state)
    }
  },
  actions: {
  },
  modules: {
  }
})

