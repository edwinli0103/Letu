<template>
  <div class="scroll">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 中间部分 -->
  
    <scroller 
      lock-x scrollbarY 
      use-pullup 
      height='500px'
      :pullup-config="pullup.config"
      @on-scroll="onScroll" 
      @on-scroll-bottom="onScrollBottom"
      @on-pullup-loading="pullupLoading"  
      ref="scrollerBottom"
      :scroll-bottom-offst="100" >
      <div class="box2">
        <p v-for="i in bottomCount" :key="i"> placeholder {{i}} </p>
        <load-more tip="" :class="{'isAll':isLoadMore}"></load-more>
        <p ref="isAll" class="isAll">没有更多数据了</p>
      </div>
    </scroller>

    <div class="bottom pos-fixed"></div>
  </div>
</template>

<script>

import HeaderBack from './HeaderBack'

import { Scroller, LoadMore } from 'vux'

export default {
  name: 'scrollTemplate',
  components: {
    myHeader: HeaderBack,
    Scroller,
    LoadMore,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"商品分类", 
        HBR_icon: " ",
      },
      pullup:{
        config: {
          content: '上拉刷新',
          pullUpHeight: 40,
          height: 40,
          autoRefresh: false,
          downContent: '释放加载',
          upContent: '上拉刷新',
          loadingContent: 'Loading...',
          clsPrefix: 'xs-plugin-pullup-'
        }
        
      },
      onFetching: false,
      isAll: false,
      isLoadMore: true,
      bottomCount: 20,
    }
  },
  computed: {
    getHeight() {
    
    }
  },
  methods: {
    // 滚动条到达底部时更新,会触发多次,所以需要设置一个状态
    onScrollBottom () {      
      // if (this.onFetching) {
      //   // do nothing
      // } else {
      //   // this.onFetching = true
      //   // // do something
      //   // this.onFetching = false
      // }
    },
    onScroll (pos) {
      // this.scrollTop = pos.top
    },
    pullupLoading () {
      var self = this;
      if (!self.onFetching) {
        self.onFetching = true;
        self.isLoadMore = false;
        setTimeout(() => {
            self.bottomCount += 10
            self.$nextTick(() => {
              self.$refs.scrollerBottom.reset()
              self.$refs.scrollerBottom.donePullup();
              // self.$refs.isAll.style.display = 'block';
              // self.$refs.scrollerBottom.disablePullup();    
            });
            self.onFetching = false;
            self.isLoadMore = true;
           
            
          }, 2000);
          setTimeout(()=>{
            self.isAll = true;
          },3000)
      }
    }




  },
  mounted() {
    // 重置高度
    setTimeout(function () {
      comTools.setHeight(1.75,".classify>div:nth-child(2)");
    },0)
   
  }
}
</script>

<style scoped>
.scroll {
  padding-top: 0.9rem;
  padding-bottom: 1rem;
}
.bottom {
  left: 0;
  bottom: 0;
  height: 1rem;
  background-color: red;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
#vux-scroller-skcvx{
  background: yellowgreen
}
.isAll {
  display: none;
}
 
</style>
