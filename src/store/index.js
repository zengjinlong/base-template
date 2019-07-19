import Vue from 'vue'
import Vuex from 'vuex'
import test from './moduels/test'
Vue.use(Vuex)
// 导出 store 对象
export default new Vuex.Store({
  modules: {
    test
  }
})
