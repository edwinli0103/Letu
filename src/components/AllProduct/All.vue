<template>
  <div class="product_All">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 排序菜单 -->
    <div class="fx P_sort txt_c font_24">
      <div @click="orderingRule('default')" class="fx_1" :class="{'current': menu.default}">综合</div>
      <div @click="orderingRule('sales')" class="fx_1" :class="{'current': menu.sales}">销量</div>
      <div @click="orderingRule('isnew')" class="fx_1" :class="{'current': menu.isnew}">新品</div>
      <div @click="orderingRule('price')" class="fx_1 fx" :class="{'current': menu.price}">
        <div class="fx_2 txt_r">价格</div>
        <div class="fx_1 P_upDown txt_l icon_all" :class="{'down': menu.down}"></div>
        <div class="fx_1"></div> 
      </div>
      <div @click="listSwitch()" class="fx_1 icon_all icon_checked" :class="{'current': menuList}"></div>
    </div>
    <!-- 商品列表区 -->
    <div class="C_product">  
      <scroller 
        lock-x scrollbarY 
        use-pullup 
        height='500px'
        :pullup-config="pullup.config"
        @on-scroll="onScroll" 
        @on-scroll-bottom="onScrollBottom"
        @on-pullup-loading="pullupLoading"  
        ref="scroller"
        :scroll-bottom-offst="100" >
        <div class="box2 clearfix" v-if="menuList">
          <myProduct2 v-for="(product,i) in products" v-model="products[i]" :key="product.id"></myProduct2>
          <div class="loading1 clearfix">
            <load-more tip="loading..." :class="{'isAll':pullup.isLoadMore}"></load-more>
            <p ref="isAll" class="isAll txt_c"> <br> 没有更多数据了...</p>
          </div> 
        </div>
        <div class="box2 clearfix" v-else>
          <myProduct1 v-for="(product,i) in products" v-model="products[i]" :key="product.id"></myProduct1>
          <div class="loading1 clearfix">
            <load-more tip="loading..." :class="{'isAll':pullup.isLoadMore}"></load-more>
            <p ref="isAll" class="isAll txt_c"> <br> 没有更多数据了...</p>
          </div>
        </div>
      </scroller>
    </div>
  </div>
  

</template>

<script>
import { Scroller, LoadMore } from 'vux'
import Header from '../Common/Header'
import Product1 from './Product1'
import Product2 from './Product2'
export default { 
  name: 'all',
  components: {
    myHeader: Header,
    myProduct1: Product1,
    myProduct2: Product2,
    Scroller,
    LoadMore,
  },
  data () {
    return {
      // 头部子组件配置数据
      header: {
        HL_icon: "icon_category",
        HL_text: "分类",
        HL_type: "classify",
        HC_text: "所有商品",
        HR_icon: "icon_search",
        HR_text: "搜索",
        HR_type: "search",
      },
      // 头部筛选菜单数据
      menu:{
        default: true,
        sales: false,
        isnew : false,
        price: false,
        down: false
      },
      menuList: false,
      classId: '',
      showCount: 10,
      currentPage: 0,
      currentMenu:'default',
      //下拉刷新配置数据
      pullup:{
        config: {
          content: '上拉加载更多',
          pullUpHeight: 40,
          height: 40,
          autoRefresh: false,
          downContent: '释放加载',
          upContent: '上拉加载更多',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        isAll: false,
        isLoadMore: true,
        onFetching: false,
      },
      products:[],
    }
  },
  created () {
    this.classId = this.$store.state.classId;
    this.$store.commit('resetId','classId');
    // 初次加载数据
    this.ajaxHandle(true, () => {
      // 如果初次加载数据过少,就不生成滚动了
      if(this.pullup.isAll) {
        this.$refs.scroller.disablePullup();
      }
    });           
  },
  mounted () {
    let self = this;
    // 重置高度
    setTimeout(function () {
      comTools.setHeight(2.4);
      self.$refs.scroller.reset();
    },0)
   
  },
  activated () {
    console.log('allPage===================activated')
  },
  deactivated () {
    console.log('allPage===================deactivated')
  },
  destroyed () {
    console.log('allPage===================destroyed')
  },
  methods: {
    // 筛选条件的处理
    orderingRule(current) {
      // alert(this.menu.list)
      // 防止重复点击
      if (current === this.currentMenu)
        return;
      // 缓存当前的类型
      this.currentMenu = current;
      for (let key in this.menu) {
        if (key !== 'down') {
          this.menu[key] = false;
        } 
      }
      // 价格筛选处理
      if (current === 'price') {
        this.menu['down'] = !this.menu['down'];
        // 价格的升序还是降序
        this.currentMenu = 'priceup';
        if(this.menu['down']) 
          this.currentMenu = 'pricedown';
      } else {
        this.menu['down'] = false;
      }

      this.menu[current] = true;
      
      //发送请求,更新数据
      this.pullupLoading('none',true); 
    },
    // 列表和方块的转换
    listSwitch() {
      this.menuList = !this.menuList;
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      }) 
    },
    // 下拉刷新需要的方法
    onScrollBottom () {      
      
    },
    onScroll (pos) {
      // this.scrollTop = pos.top
    },
    // 上拉刷新操作
    pullupLoading (a,flag) {

      let self = this , isClerar = flag || false;
      if (!self.pullup.onFetching) {
        self.pullup.onFetching = true;
        self.pullup.isLoadMore = false;
        this.ajaxHandle(isClerar,() => {
          setTimeout(() => {
            self.$nextTick(() => {
              if (flag) { 
                self.$refs.scroller.enablePullup();
                self.$refs.isAll.style.display = 'none';
                // 重置滚动条
                self.$refs.scroller.reset({
                  top: 0
                });
              } else {
                self.$refs.scroller.reset()
              }

              self.$refs.scroller.donePullup();
              if (self.pullup.isAll) {
                self.$refs.scroller.disablePullup();
                setTimeout(() => {
                  self.$refs.isAll.style.display = 'block';
                }, 100);
              }
            });
            self.pullup.onFetching = false;
            self.pullup.isLoadMore = true;
          },0);
        });
        
          
      }
    },
    ajaxHandle (isClear,callback) {
      let self = this, allGoods = this.$store.state.allGoods;
      // 清空数据
      if(isClear) {    
        this.products=[];
        this.currentPage = 0;
        // 数据加载 
        comTools.showLoading(this);
      };
      
      // 获取参数
      let parmas = {
        id: this.classId,
        showCount: this.showCount,
        type: this.currentMenu,
        currentPage: this.currentPage,
      };
      
      setTimeout((data) => {
        // 数据加载 结束
        if (this.currentPage === 0)
          comTools.hideLoading(this);                       
        // 商品数组数据赋值
        this.pullup.isAll = false;
        if (self.currentPage === 3)
          this.pullup.isAll = true; 
        
        let addData = [], num = self.currentPage*10;
        allGoods.forEach((ele,i) => {
          if (num -1 < i && i < num + 10)
            addData.push(ele);
        });

        this.products.push.apply(this.products,addData);       
        this.currentPage += 1;
        // 更新滚动条
        callback && callback();
      },500)
    }
  }
}
</script>

<style scoped>
  .product_All {
    padding-top: 0.65rem
  }
  .P_sort {
    position: fixed;
    left: 0;
    top: .75rem;
    width: 100%;
    height: 0.65rem;
    line-height: 0.65rem;
    color: #797979;
    background: #fdfdfd;
    border-bottom: 1px solid #dfdfdf;
    z-index: 8;
  }
  .P_upDown {
    line-height: 0.2rem;
    text-indent: 5px;
    background-image: url("../../assets/images/icon_price_default.png");
    background-size: 0.2rem 0.25rem; 
  }
  .icon_checked {
    background-image: url("../../assets/images/icon_listBlock.png");
    background-size: 0.33rem 0.33rem;
  }

  .current {
    color: #18A5A9;
  }

  .current .P_upDown {
    background-image: url("../../assets/images/icon_price_down.png");
  }

  .current div.down {
    background-image: url("../../assets/images/icon_price_up.png");
  }

  .current.icon_checked {
    background-image: url("../../assets/images/icon_list.png");
    background-size: 0.33rem 0.33rem;
  }
  .box2 {
    margin-bottom: 0.5rem;
  }
  .isAll {
    display: none;
    padding: 0.1rem 0;
  }
  .loading1 {
    padding-bottom: 0.5rem;
  }
</style>
