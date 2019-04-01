<template>
  <div class="orderlist">
    <myHeader ref="myHeader" :header="header"></myHeader>
    <div class="tab fx">
      <div @click="onItemClick(0)" class="fx_1 txt_c" :class="[cur=='全部订单'?'current':'tab_item']">全部订单</div>
      <div @click="onItemClick(1)" class="fx_1 txt_c" :class="[cur=='待付款'?'current':'tab_item']">待付款</div>
      <div @click="onItemClick(2)" class="fx_1 txt_c" :class="[cur=='待收货'?'current':'tab_item']">待收货</div>
      <div @click="onItemClick(3)" class="fx_1 txt_c" :class="[cur=='待评价'?'current':'tab_item']">待评价</div>
      <div @click="onItemClick(4)" class="fx_1 txt_c" :class="[cur=='退款/售后'?'current':'tab_item']">退款/售后</div>
    </div>
    <!-- 订单列表区 -->
    <div class="C_oList">
      <scroller 
        lock-x scrollbarY 
        use-pullup 
        height='500px'
        :pullup-config="pullup.config"
        @on-scroll="onScroll" 
        @on-scroll-bottom="onScrollBottom"
        @on-pullup-loading="pullupLoading"  
        ref="scroller"
        :scroll-bottom-offst="100"
        v-show="pullup.isShow">
        <div class="box2 clearfix">
          <!-- <myOrder v-for="i in bottomCount" :key="i"></myOrder> -->
          <div v-for="(orderItem,index) in orderItems" :key="orderItem.id + index">
            <myOrder v-model="orderItems[index]"></myOrder>
          </div>
          <div class="loading1 clearfix">
            <load-more tip="loading..." :class="{'isAll':pullup.isLoadMore}"></load-more>
            <p ref="isAll" class="isAll txt_c">没有更多数据了</p>
          </div>
        </div>
      </scroller>
      <div class="empty txt_c marb_2" v-show="orderListIsEmpty">
        暂无相关订单哦~
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import OrderClick from '../Common/OrderClick'
import { Tab, TabItem, Scroller, LoadMore} from 'vux'

export default {
  components: {
    myHeader: HeaderBack,
    myOrder: OrderClick,
    Tab,
    TabItem,
    Scroller,
    LoadMore,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBL_type: 'orderList',
        HBC_text:"我的订单",
        HBR_icon: "icon_edit",
        HBR_show: false,
      },
      cur: '全部订单',
      //上拉加载配置数据
      pullup:{
        config: {
          content: '上拉刷新',
          pullUpHeight: 40,
          height: 40,
          autoRefresh: false,
          downContent: '释放加载',
          upContent: '上拉刷新',
          loadingContent: '',
          clsPrefix: 'xs-plugin-pullup-'
        },
        onFetching: false,
        isAll: false,
        isLoadMore: true,
        isShow: false
      },
      bottomCount: 5,
      orderItems:[],//页面展示订单列表
      showCount:10,//每页显示的条数
      currentPage:1,//页码从第一页开始
      orderListIsEmpty: false,//是否为空

      lastPage: false,
    }
  },
  methods: {
    onItemClick (index) {
      var self = this;
      self.$refs.isAll.style.display = 'none';
      self.orderItems = [];
      self.currentPage = 1;
      self.$nextTick(() => {
        self.$refs.scroller.reset({
          top: 0
        });
        self.$refs.scroller.donePullup();
      })
      if(index == 0){
        self.cur = '全部订单';
        this.orderItems = [];
        self.ajax();
        this.$router.push({ path: '/mainpage/self/orderlist/0'});
      } else if(index == 1){
        self.cur = '待付款';
        this.orderItems = [];
        self.ajax();
        this.$router.push({ path: '/mainpage/self/orderlist/1'});
      } else if(index == 2){
        self.cur = '待收货';
        this.orderItems = [];
        self.ajax();
        this.$router.push({ path: '/mainpage/self/orderlist/2'});
      } else if(index == 3){
        self.cur = '待评价';
        this.orderItems = [];
        self.ajax();
        this.$router.push({ path: '/mainpage/self/orderlist/3'});
      } else if(index == 4){
        self.cur = '退款/售后';
        this.orderItems = [];
        self.ajax();
        this.$router.push({ path: '/mainpage/self/orderlist/4'});
      }
    },
    // 下拉刷新需要的方法
    onScrollBottom () {           
    },
    onScroll (pos) {      
    },
    pullupLoading () {
      var self = this;
      if (!self.pullup.onFetching) {
        self.pullup.onFetching = true;
        self.pullup.isLoadMore = false;
        console.log(this.currentPage)
        setTimeout(() => {
            this.currentPage++;
            self.$nextTick(() => {
              this.ajax();
              self.$refs.scroller.reset();
              self.$refs.scroller.donePullup();
            });
            self.pullup.onFetching = false;
            self.pullup.isLoadMore = true;
          }, 2000);
      }
    },    
    ajax(){
      let current = this.cur, orderState = '';
      let orderList = this.$store.state.allOrder;
      if(current == '全部订单'){
        orderState = '/100'
      }else if(current == '待付款'){
        orderState = '/0'
      }else if(current == '待收货'){
        orderState = '/1'
      }else if(current == '待评价'){
        orderState = '/25'
      }else if(current == '退款/售后'){
        orderState = '/30'
      }
      // 数据加载
      comTools.showLoading(this, '载入中...');
      setTimeout((data) => {
        // 数据加载结束动画
        comTools.hideLoading(this);
        // 空值判断
        this.pullup.isShow = true;
        this.orderListIsEmpty = false;
        
        // type 0:线上支付(微信端) 1:2B端
        // status 0:待付款 1:待收货 25:待评价 30:退款/售后
        orderList.forEach((element,index,arr) => {
          if (orderState == '/100') {
            this.orderItems.push(element);
          } else {
            if (element.status == orderState.replace('/', '')) {
              this.orderItems.push(element);
            }
          } 
            
        });
        // 最后一页判断        
        if(this.lastPage){
          this.$refs.isAll.style.display = 'block';
          this.$refs.scroller.disablePullup();
        } else {
          this.$refs.isAll.style.display = 'none';
          this.$refs.scroller.enablePullup();
        }

      }, 500)
    },
  },
  mounted () {
    var self = this;
    var orderType  = this.$route.params.type;
    setTimeout(()=>{
      self.onItemClick(orderType);
    },0)
    // .vux-scroller配置
    // 重置高度
    setTimeout(function () {
      comTools.setHeight(1.4);
      self.$refs.scroller.reset();
    },0)

  },
  watch: {

  },
  created() {
    let i = this.$route.params.type;
    if (i == 1) {
      this.cur = '待付款';
    } else if (i == 2) {
      this.cur = '待收货';
    } else if (i == 3) {
      this.cur = '待评价';
    } else if (i == 4) {
      this.cur = '退款/售后';
    }
    
    this.ajax();
  }, 
}
</script>

<style>
/* .vux-tab样式重置 */
.orderlist .vux-tab{
  height: .64rem !important;
}
.orderlist .vux-tab .vux-tab-item{
  font-size: .24rem !important;
  line-height: .64rem !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderlist{
  padding-top: .75rem;
}
.tab{
  height: .64rem;
  font-size: .24rem;
  line-height: .64rem;
  background: #fff;
  border-bottom: 1px solid #e1e1e1;
}
.tab_item{
  color: #333;
}
.current {
  color: #18A5A9;
  border-bottom: 2px solid #18A5A9;
}
.C_oList{
}
.box2 {
  margin-bottom: 0.2rem;
}
.loading1 {
  padding-bottom: 0.2rem;
}
.isAll {
  display: none;
  padding: 0.1rem 0;
}
.empty {
  height: 6rem;
  line-height: 6rem;
}
</style>