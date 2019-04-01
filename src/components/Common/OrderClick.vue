<template>
<div class="orderItem" :key="id">
  <div class="order_header bg_white font_24">
    下单日期：<span>{{createTime}}</span>
  </div>
  <div class="pro_list">
    <div class="product bg_white" v-for="(product,index) in productList" :key="product.ID" @click="goToDetail()">
      <div class="order_top fx">
        <div class="order_top_l fx_1">
          <img :src="productList[index].SMALL_IMG" alt="">
        </div>
        <div class="order_top_c fx_3 font_24">
          <div class="text_top">{{productList[index].NAME}}</div>
          <div class="col_9">
            ￥{{productList[index].MARKET_PRICE}}<span class="col_c">￥999</span>
          </div>
        </div>
        <div class="order_top_r fx_1 font_24 txt_r">
          <div class="text_top color_red">
            {{status==0?'待付款':(status==1?'待收货':(status==25?'待评价':(status==9?'交易成功':'退款/售后')))}}
          </div>
          <div class="col_9">数量:<span class="">X</span>{{productList[index].proNum}}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底部展示按钮 status 0:待付款 1:待收货 25:待评价 9:交易完成 30:退款/售后 -->
  <!-- 待付款 -->
  <div class="order_bot fx bg_white font_24" v-show="status==0">
    <div class="fx_2 font_26">合计：<span>￥{{payAccount}}</span></div>
    <div class="fx_1 btn"  @click="sendCancelFn">取消订单</div>
    <div class="fx_1 btn col_main bor_main" @click="sendPayFn">付款</div>
  </div>
  <!-- 待收货 -->
  <div class="order_bot fx bg_white font_24" v-show="status==1">
    <div class="fx_2 font_26">合计：<span>￥{{payAccount}}</span></div>
    <div class="fx_1 btn" @click="sendLogistics">查看物流</div>
    <div class="fx_1 btn col_main bor_main" @click="sendReceiptFn">确认收货</div>
  </div>
  <!-- 待评价 -->
  <div class="order_bot fx bg_white font_24" v-show="status==25">
    <div class="fx_2 font_26">合计：<span>￥{{payAccount}}</span></div>
    <div class="fx_1 btn" @click="sendLogistics">查看物流</div>
    <div class="fx_1 btn col_main bor_main" @click="sendEvaluateFn">去评价</div>
  </div>
  <!-- 交易完成 -->
  <div class="order_bot fx bg_white font_24" v-show="status==9">
    <div class="fx_2 font_26">合计：
      <span>￥{{payAccount}}</span>
    </div>
    <div class="fx_1"></div>
    <div class="fx_1 btn" @click="sendLogistics">查看物流</div>
  </div>
  <!-- 退款/售后 -->
  <div class="order_bot fx bg_white font_24" v-show="status==30">
    <div class="fx_2 font_26">合计：<span>￥{{payAccount}}</span></div>
    <div class="fx_1"></div>
    <div class="fx_1 btn" @click="sendRefundFn">查看进程</div>
  </div>
</div>
</template>

<script>
export default {
  name: "orderclick",
  props:['value'],
  data() {
    return {
      id: this.value.id,
      type: this.value.type,
      status: this.value.status,
      productList: this.value.productList,
      payAccount: this.value.payAccount,
      createTime: this.value.createTime,
    }
  },
  methods: {
    goToDetail () {
      let orderId = this.id;
      console.log('列表跳转'+orderId);
      this.$router.push({path:"/mainpage/self/orderdetail/"+orderId});
    },
    // 取消订单
    sendCancelFn () {
      const _this = this;
      this.$vux.confirm.show({
        // content: '确定取消当前订单吗？',
        title: '确定取消当前订单吗？',
        onConfirm () {
          let orderId = _this.id;
          // 开始动画
          comTools.showLoading(_this,'取消订单中...');
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(_this);
            if(true){
              _this.$vux.toast.show({
                type:'success',
                text:'取消成功',
                width: '7.5em'
              });
            }
          }, 500)
        }
      });
    },
    // 支付订单
    sendPayFn () {
      let orderId = this.id;
      // 数据加载
      comTools.showLoading(this,'支付中...');
      setTimeout((data) => {
        // 数据加载结束动画
        comTools.hideLoading(this);
        // 走支付流程
        this.weixinpay();
      }, 500)
    },
    weixinpay() {
      let orderId = this.id;
      if (Math.random()*10 > 3) {
        this.$router.push({path:'/payMent/success/' + orderId });
      } else {
        this.$router.push({path:'/payMent/fail/' + orderId });
      }
    },
    // 查看物流
    sendLogistics() {
      // 物流详情页面跳转
      let value = {
        orderId: this.id,
        productList: this.productList
      }
      this.$store.commit('setData', { key: 'orderObj', value: value });
      this.$router.push({ path: '/mainpage/self/logistics' });
    },
    // 确认收货
    sendReceiptFn () {
      const _this = this;
      this.$vux.confirm.show({
        // content: '确定收到检测用品吗？',
        title: '确定收到检测用品吗？',
        onConfirm() {
          // 确定
          let orderId = _this.id;
          let value = {
            orderId: orderId,
            productList: _this.productList
          }
          // 开始动画
          comTools.showLoading(_this, '确认中...');
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(_this);
            if (true) {
              _this.$vux.toast.show({
                type: 'success',
                text: '确认成功',
                width: '7.5em'
              });
              _this.$router.push({ path: '/mainpage/self/evaluate' });
            }
          })
        }
      });
    },
    // 去评价
    sendEvaluateFn () {
      // 评价页面跳转
      let value = {
        orderId: this.id,
        productList: this.productList
      }
      this.$store.commit('setData', { key: 'orderObj', value: value });
      this.$router.push({ path: '/mainpage/self/evaluate' });
    },
    // 退款售后
    sendRefundFn () {
      let orderId = this.id;
      console.log('列表跳转'+orderId);
      this.$router.push({path:"/mainpage/self/orderdetail/"+orderId});
    },
  }
};
</script>

<style scoped>
.orderItem{
  margin-bottom: .2rem;
}
.order_header{
  padding: .2rem .1rem;
  border-bottom: 1px solid #e1e1e1;
}
.pro_list{
  overflow: hidden;
  border-bottom: 1px solid #e1e1e1;
}
.product {
  padding: 0 0.1rem;
}
.order_top {
  padding: 0.2rem 0.1rem;
  border-top: 1px solid #e1e1e1;
}
.pro_list .product:first-child .order_top{
  border-top: none;
}
.order_top_l img {
  width: 1rem;
  height: 1rem;
}
.order_top_c{
  /* padding-left: 0.15rem; */
}
.order_top .text_top{
  height: .6rem;
  line-height: .3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.order_top .col_c{
  margin-left: .1rem;
  text-decoration: line-through;
}
.order_bot{
  padding: .2rem;
}
.order_bot>div{
  padding: .05rem 0;
}
.order_bot>.btn{
  border-radius: 5px;
  text-align: center;
  margin: 0 .1rem;
  box-sizing: border-box;
  border: 1px solid #999;
}
.order_bot>.btn:last-child{
  margin-right: 0;
}
.col_9 span{
  font-size: .18rem;
  padding-left: .08rem;
  padding-right: .02rem;
}
</style>
