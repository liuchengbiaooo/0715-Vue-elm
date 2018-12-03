import vue from "vue"
import vuex from "vuex"
import state from "./state"
import mutations from "./mutation"
import actions from "./action"
import getters from "./getter"

vue.use(vuex)

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
