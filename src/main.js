// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TopHeader from "./components/TopHeader/TopHeader"
import store from "./store/store"
import {Button} from "mint-ui"
import './mock/mockServer'

Vue.component("TopHeader",TopHeader)
Vue.component(Button.name,Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
