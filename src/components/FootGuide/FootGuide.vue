<template>
  <footer class="footer_guide border-1px"v-show="$route.meta.isShow">
    <a href="javascript:;" class="guide_item" @click="todo('/msite')" :class="{on:isCurrent('/msite')}">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item"  @click="todo('/search')" :class="{on:isCurrent('/search')}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="todo('/order')" :class="{on:isCurrent('/order')}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="todo('/profile')" :class="{on:isCurrent('/profile')}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>
<script>
    export default {
      name: "foot-guide",
      methods:{
        isCurrent(path){
         return this.$route.path === path

        },
        todo(val){
          this.$router.replace(val)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
