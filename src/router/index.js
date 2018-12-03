import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from "../pages/Shop/Shop/Shop.vue"
import ShopGoods from "../pages/Shop/Shop/ShopGoods/ShopGoods.vue"
import ShopInfo from "../pages/Shop/Shop/ShopInfo/ShopInfo.vue"
import ShopRatings from "../pages/Shop/Shop/ShopRatings/ShopRatings.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta:{
        isShow:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        isShow:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        isShow:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        isShow:true
      }
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/shop',
      component:Shop,
      children:[
        {
          path: '/shop/goods',
          component:ShopGoods
        },
        {
          path: 'rating',
          component:ShopRatings
        },
        {
          path: '/shop/info',
          component:ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
