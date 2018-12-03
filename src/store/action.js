import {
  RECEIVE_ADDRESS,// 接收地址信息
  RECEIVE_CATEGORYS,// 接收分类数组
  RECEIVE_SHOPS,  // 接收商家数组
  RECEIVE_USER, //接收用户的个人信息
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEARFOOD
} from "./mutation-types"

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
}from "../api/index"


export default {
  // 接收地址信息
  async getAddress({commit,state}){
    const longitude = state.longitude
    const latitude  = state.latitude
    const result =await reqAddress(longitude,latitude)
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },

  // 接收分类数组
  async getCategorys ({commit}) {
    const result =await reqCategorys()
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },

  //接收商家数组
  async getShops({commit,state}){
     //1.发ajax请求
     const {longitude,latitude}  = state
     const result = await reqShops(longitude,latitude)
     //2.调用commit改变数据
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
   },

   //接收用户的个人信息
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },

  //退出登录
  async logout({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USER)
    }
  },

  //获取商家信息
  async getGoods({commit},callback){
    const result = await reqGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      //更新状态数据之后调用传入的回调函数
      typeof callback === "function" && callback()
    }
  },

  async getRatings({commit},cb){
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      typeof cb==="function" && cb()
    }
  },

  async getInfo({commit}){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },

  //更新food的数量的同步action
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
       commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //清空购物车里面的food的同步action
  clearFood({commit}){
    commit(CLEARFOOD)
  }
}
