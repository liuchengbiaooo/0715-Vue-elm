<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
              :class="{current:currentIndex===index}" @click="selectItem(index)">
          <span class="text bottom-border-1px">{{good.name}}
           <img class="icon" :src="good.icon" v-if="good.icon">
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import BScroll from 'better-scroll'
  import CartControl from "../../../../components/CartControl/CartControl.vue"
  import Food from "../../../../components/Food/Food.vue"
  import ShopCart from "../../../../components/ShopCart/ShopCart.vue"

  export default {
    name: "shop-goods",
    data() {
      return {
        food: {},//需要显示的food
        scrollY: 0, //右侧列表滑动的Y轴坐标
        tops: [], //右侧列表中所有分类li的top值
      }
    },
    mounted() {
      this.$store.dispatch("getGoods", () => {// goods状态数据更新了
        this.$nextTick(() => {
          this._initScroll()
          this._initTops() //计算右侧列表中所有分类li的top值
        })
      })
    },
    computed: {
      ...mapState(["goods"]),

      //当前分类的下标
      currentIndex() {
        const {scrollY, tops} = this

        //得到当前分类的下标
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1]
        })

        //如果发生了变化，让左侧列表滚动到index对应的li处
        if(index!==this.index && this.leftScroll){
          this.index = index
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index],300)
        }

        return index

      }
    },
    methods: {
      _initScroll() {
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true //触发自定义click事件
        });
        this.ringhtScroll = new BScroll('.foods-wrapper', {
          click: true,
          probeType: 1 //滑动事件触发的时机
        })

        //绑定滚动的监听
        this.ringhtScroll.on("scroll",({x,y})=>{
          console.log("scroll",x,y)
          //更新scrollY的值
          this.scrollY = Math.abs(y)
        })

        //绑定滚动结束的事件监听
        this.ringhtScroll.on("scrollEnd",({x,y})=>{
          console.log("scrollEnd",x,y)
          //更新scrollY的值
          this.scrollY = Math.abs(y)
        })
      },

      _initTops() {
        //统计所有右侧分类li的top
        const tops = []
        let top = 0
        tops.push(top)
        const lis = this.$refs.foodsUl.querySelectorAll(".food-list-hook")
        lis.forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        //更新tops状态数据
        this.tops=tops
        console.log(tops)
      },

      //选择左某个分类项
      selectItem(index){
        //计算目标位置的坐标
        const y = this.tops[index]
        //立即更新ScrollY为目标坐标
        this.scrollY = y
       //让右侧滑动对象到相对应的位置
        this.ringhtScroll.scrollTo(0,-y,300)

      },

      showFood(food) {
        //更新food状态
        this.food = food
        //显示food组件
        this.$refs.food.toggleShow()
      },
    },
    components: {
      CartControl,
      Food,
      ShopCart
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>




