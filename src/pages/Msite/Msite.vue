<template>
  <section class="msite">
    <!--首页头部-->
    <top-header :title="address.name">
      <span class="header_search" slot="left">
         <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
         <span class="header_login_text">登录|注册</span>
      </span>
    </top-header>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index) in category" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg" alt="msitesss"/>
      </div>
    </nav>


    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <Shop-list></Shop-list>
    </div>
  </section>
</template>

<script>
  import 'swiper/dist/css/swiper.min.css'
  import Swiper from 'swiper'
  import ShopList from "../../components/ShopList/ShopList.vue"
  import {mapState} from "vuex"
  export default {
    name: "msite",
    mounted() {
      this.$store.dispatch("getAddress")
      this.$store.dispatch("getCategorys")
    },
    computed: {
      ...mapState(["address", "categorys"]),

      categorysArr() {
        const {categorys} = this
        const categoryDig = [] // 定义最大的双重数组
        let arr = [] //定义大数组里面的小数组
        categorys.forEach((c) => {

          if (arr.length === 0) {
            categoryDig.push(arr)  //如果arr的值小于0 将他放入 双重数组中
          }
          arr.push(c)
          if (arr.length === 8) {  //当arr里面的值到达一定数量后，重新清空放入新数组
            arr = []
          }
        })
        return categoryDig
      },
    },
    components: {
      ShopList
    },
    watch:{
      // 注意: 更新状态数据==>调用监视回调 ==> 异步更新界面
      categorys () { // categorys状态数据更新了: [] ==> [...]
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它
        this.$nextTick(() => {
          //
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%
    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
