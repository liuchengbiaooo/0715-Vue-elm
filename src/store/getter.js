export default {
  //购车车的总数量
  totalCount (state){
    return state.cartFoods.reduce((pre,food)=> pre + food.count ,0) //food:你要统计的元素  pre：以前的数量
  },
  //购物车的总价格
  totalPrice(state){
    return state.cartFoods.reduce((pre,food)=> pre + food.count*food.price ,0)
  }
}
