import {
  RECEIVE_ADDRESS,// 接收地址信息
  RECEIVE_CATEGORYS,// 接收分类数组
  RECEIVE_SHOPS,  // 接收商家数组
  RECEIVE_USER,//接收个人的用户信息
  RESET_USER, //重置用户
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEARFOOD
} from "./mutation-types"
import Vue from "vue"

export default {
   //接收地址信息
  [RECEIVE_ADDRESS](state,{address}){
      state.address = address
  },
  //接收分类数组

  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },

  //接收商家数组
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },

   //接收个人的用户信息
  [RECEIVE_USER](state,{user}){
    state.user = user
  },

  [RESET_USER](state){
    state.user = {}
  },

  //商家信息
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },

  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },

  [RECEIVE_INFO](state,{info}){
    state.info = info
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    //如果food没有count，添加新的count属性，并制定值为1
    if(!food.count){
      // food.count = 1
      Vue.set(food,"count",1)
      state.cartFoods.push(food)
    }else {
      //否则直接加1
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--
      //一旦减少到0，就把food从购物车中删除
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },

  //清除购物车
  [CLEARFOOD](state){
    //将购物车中所有的food的count置为0
    state.cartFoods.forEach(food => food.count = 0)
    //清空购物车数组
    state.cartFoods = []
  }

}
