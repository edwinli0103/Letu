<template>
  <div class="search bg_white">
    <div class="S_head fx font_28">
      <div class="fx_1 icon_all icon_back" @click="goBackFn"></div>
      <div class="S_head_c fx_6 fx">
        <span class="fx_2 icon_all icon_search"></span>
        <input class="fx_10 font_26"
          type="search" 
          v-model="value"
          placeholder="请输入..."
          @input="doInputFn()"
          @focus="doFocusFn()"
          ref="search">
          <span class="fx_1"></span>
      </div>
      <div class="cancal fx_1 txt_c" @click="doSearchFn">GO</div>
    </div> 
    <!-- 热门搜索 -->
    <div class="hotSearch font_28 col_3" v-show="isShowHot">
      <div class="font_26 fx col_9">
        <span class="fx_6">历史搜索:</span>
        <span class="fx_1 icon_all icon_delete" @click.stop="searchDeleteFn"></span>
      </div>
      <ul class="clearfix col_9 font_24">
        <li v-for="(item,i) in hotSearch" :key="i" @click.stop="doHotSearchFn(item)">{{item}}</li>
      </ul>
      <div class="empty font_26 txt_c" v-if="isEmpty">您搜索的商品不存在...</div>
    </div>
    <!-- 商品 -->
    <div ref="searchGoods" class="searchGoods">
      <myProduct v-for="(item,i) in results" v-model="results[i]" :key="item.ID"></myProduct>
    </div>

  </div>
     
</template>

<script>
import Product from '../AllProduct/Product2'
export default {
  name: 'search',
  components: {
    myProduct: Product,
  },
  data () {
    return {
      hotSearch: [],
      isShowHot: true,
      isEmpty: false,
      results: [],
      value: '',
    }
  },
  created () {
    this.doFocusFn();
  },
  mounted () {
    console.log('search===================mounted')
  },
  activated () {
    // this.doFocusFn();
    console.log('search===================activated')
  },
  deactivated () {
    console.log('search===================deactivated')
  },
  destroyed () {
    console.log('search===================destroyed')
  },
  methods: {
    goBackFn() {
      this.$router.go(-1);
    },
    doSearchFn() {    
      if (this.value) 
        comTools.setSearch(this.value);
      comTools.showLoading(this); 
      setTimeout((data) => {
        comTools.hideLoading(this);
        let productList = this.$store.state.allGoods;

        if (Math.random()*10 > 5) 
          productList = [];
        
        if (productList.length > 0) {
          this.isShowHot = false;
          this.isEmpty = false;
          // 生成滚动条
          this.resetHeight();
          this.results = productList;
        } else {
          this.isShowHot = true;
          this.isEmpty = true;
          this.results = productList;
          // 自动获取焦点
          this.doFocusFn();
        }
      }, 500)
    },
    doInputFn () {
      this.value = this.value.replace(',','');
    },
    doFocusFn () {
      this.hotSearch = comTools.getSearch();
      this.isShowHot = true;
    },
    doHotSearchFn (key) {
      this.value = key;
      this.doSearchFn();
    },
    resetHeight() {
      let self = this, dom = this.$refs.searchGoods;
      // 重置高度
      comTools.resetHeight(dom,0.95);
    },
    searchDeleteFn () {
      let self = this
      this.$vux.confirm.show({
        title: '全部删除',
        content: '确定全部删除历史搜索记录吗?',
        onConfirm() {
          comTools.deleteSearch();
          self.doFocusFn();
        }
      });
    }
  }
  
}

</script>

<style scoped>
.search {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.S_head {
  width: 100%;
  height: 0.55rem;
  line-height: 0.55rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid #f3f3f3;
  z-index: 9;
}
.S_head_c {
  border-radius: 0.75rem;
  background-color: #f5f5f5;
}

.S_head_c input {
  background-color: #f5f5f5;
}

.searchGoods {
  overflow-y: auto;
}
/* 滚动条整体部分 */
.searchGoods::-webkit-scrollbar {  
  width: 3px;  
  /* height:10px;      */
   /* background-color:#b5b1b1; */
} 
/* scroll轨道背景  */
.searchGoods::-webkit-scrollbar-track {  
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
  border-radius: 2px;
}
/* 滚动条中能上下移动的小块 */
.searchGoods::-webkit-scrollbar-thumb {  
  border-radius: 2px;  
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color:#b5b1b1;
} 

.hotSearch {
  float: left;
  width: 100%;
  z-index: 99;
}
.hotSearch>div {
  height: 0.4rem;
  padding: 0.2rem 0 0.1rem 0.2rem;
}
.hotSearch>ul>li {
 float: left;
 max-width: 5.6rem;
 padding: 0 0.15rem;
 border-radius: 0.2rem;
 margin: 0.1rem 0.1rem;
 overflow: hidden;
 background-color: #f7f7f7;
}
.icon_back {
  background-image: url("../../assets/images/icon_back1.png");
  background-size: 0.4rem 0.4rem;
}
.icon_search{
  background-image: url("../../assets/images/icon_search2.png");
  background-size: 0.3rem 0.3rem;
}

.icon_delete {
  background-image: url("../../assets/images/mine/delete.png");
  background-size: 0.3rem 0.3rem;
}

.empty {
  padding: 0.5rem 0;
}

</style>



