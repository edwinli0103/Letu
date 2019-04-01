<template>
  <div class="orderDetail">
    <myHeader ref="myHeader" :header="header"></myHeader>
    <div class="order_state font_30">{{orderDetail.status==0?'等待客户付款…':(orderDetail.status==1?'等待客户收货…':(orderDetail.status==25?'等待客户评价…':(orderDetail.status==9?'交易成功':'退款/售后处理中…')))}}</div>
    <div class="bg_white font_28 marb_1">
      <div class="order_address">
        <div class="text_top clearfix">
          <div class="add_per _left">收货人：{{orderDetail.address.acceptName}}</div>
          <div class="add_tel _right txt_r">{{orderDetail.address.mobile}}</div>
        </div>
        <div class="text_bot">
          <span v-for="item in orderDetail.address.areas">{{item}}</span>
          <span>{{orderDetail.address.address0}}</span>
         </div>
      </div>
    </div>
    <div class="bg_white ord_det">
      <div class="font_28 pad_2">产品费用明细</div>
      <div v-for="(orderDetailItem,index) in orderDetail.productList" :key="orderDetailItem.id">
        <myOrder v-model="orderDetail.productList[index]"></myOrder>
      </div>
    </div>
    <div class="bg_white ord_pay marb_2">
      <div class="font_24 col_9 pad_2">
        <div class="clearfix">
          <span class="_left">产品总价</span>
          <span class="_right">￥{{orderDetail.allAccount}}</span>
        </div>
        <div class="clearfix">
          <span class="_left">运费(快递)</span>
          <span class="_right">￥0.00</span>
        </div>
        <div class="clearfix">
          <span class="_left">产品优惠</span>
          <span class="_right">￥99.00</span>
        </div>
      </div>
      <div class="font_28 pad_2d clearfix">
        <span class="_left">订单总价</span>
        <span class="_right">￥{{orderDetail.payAccount}}</span>
      </div>
      <div class="font_28 pad_2 clearfix">
        <span class="_left">需付款</span>
        <span class="_right color_red">￥{{orderDetail.payAccount}}</span>
      </div>
    </div>
    <div class="bg_white marb_2 padlr_2 font_24 col_9 ord_state">
      <div class="">订单号：<span>{{orderDetail.id}}</span></div>
      <div class="">下单时间：<span>{{orderDetail.createTime}}</span></div>
      <div class="">支付方式：<span>{{orderDetail.type == 0?'线上支付':'他人代付'}}</span></div>
    </div>
    <div class="bg_white font_28 txt_c pad_2 col_9 ord_copy">
      如有疑问,请联系客服&nbsp;<a href="tel:18616715025" class="col_main">18616715025</a>
    </div>
    <!-- 底部展示按钮 status 0:待付款 1:待收货 25:待评价 9:交易完成 30:退款/售后 -->
    <!-- 待付款 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="orderDetail.status==0">
      <span class="_right color_red bor_red" @click="sendPayFn">付款</span>
      <!-- <span class="_right remove_btn">删除订单</span> -->
      <span class="_right" @click="sendCancelFn">取消订单</span>
    </div>
    <!-- 待收货 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="orderDetail.status==1">
      <span class="_right color_red bor_red" @click="sendReceiptFn">确认收货</span>
      <span class="_right" @click="sendLogistics">查看物流</span>
    </div>
    <!-- 待评价 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="orderDetail.status==25">
      <span class="_right color_red bor_red" @click="sendEvaluateFn">去评价</span>
      <span class="_right" @click="sendLogistics">查看物流</span>
    </div>
    <!-- 交易完成 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="orderDetail.status==9">
      <span class="_right" @click="sendLogistics">查看物流</span>
    </div>
    <!-- 退款/售后 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="orderDetail.status==30">
      <span class="_right" @click="sendRefundFn">查看进程</span>
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import Order from '../Common/Order'

export default {
  components: {
    myHeader: HeaderBack,
    myOrder: Order,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"订单详情",
        HBR_icon: "",
        HBR_show: false,
      },
      orderDetail: {
        id: "",
        type: 0,// type 0:线上支付(微信端) 1:toB端
        createTime: "",
        modifyTime: "",
        status: 0,// status 0:待付款 1:待收货 25:待评价 9:交易完成 30:退款/售后
        productList: [],
        payableFreight: "",
        allAccount: 0,
        productDiscountAmount: 0,
        disAccount: 0,
        manjianAmount: 0.00,
        lastAccount: 0,
        payAccount: 0,
        address: {}
      }
    }
  },
  methods: {
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
    weixinpay(data) {
      let orderId = this.orderDetail.id;
      if (Math.random()*10 > 3) {
        this.$router.push({path:'/payMent/success/' + orderId });
      } else {
        this.$router.push({path:'/payMent/fail/' + orderId });
      }
    },
    // 查看物流
    sendLogistics() {
      // 物流详情页面跳转
      let orderId = this.$route.params.orderID;
      let value = {
        orderId: orderId,
        productList: this.orderDetail.productList
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
      // 评价详情页面跳转
      let orderId = this.$route.params.orderID;
      let value = {
        orderId: orderId,
        productList: this.orderDetail.productList
      }
      this.$store.commit('setData', { key: 'orderObj', value: value });
      this.$router.push({ path: '/mainpage/self/evaluate' });
    },
    // 退款售后
    sendRefundFn () {
      let orderId = this.$route.params.orderID;
      alert('退款id:'+orderId)
    },
  },
  created() {
    let self = this;
    let orderID  = this.$route.params.orderID;
    let orderList = this.$store.state.allOrder;
    // console.log(orderList);
    // 数据加载
    comTools.showLoading(this, '载入中...');
    setTimeout(() => {
      // 数据加载结束动画
      orderList.forEach((element) => {
        if (element.id == orderID) {
          self.orderDetail = element;
        }
      });
      comTools.hideLoading(this);
    }, 500)
  },  
  mounted () {

  },
  watch: {
    
  },
  // computed: {
  //   myfixed: function(){
  //     let value = this.orderDetail.payAccount;
  //     return value.toFixed(2);
  //   }
  // }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .orderDetail{
    padding-top: .75rem;
  }
  .order_state{
    padding: .5rem .7rem;
    /* border-top: 1px solid #fff; */
    background-color: #daf1f1;
  }
  .order_address{
    background: url(../../assets/images/mine/address2.png) no-repeat .15rem center;
    background-size: .4rem;
    padding-left: .7rem;
    padding-right: .2rem;
    border-bottom: 1px dashed #18A6AA;
  }
  .ord_det{
    overflow: hidden;
  }
  .text_top{
    height: .55rem;
    line-height: .55rem;
  }
  .text_top .add_per{
    width: 60%;
  }
  .text_top .add_tel{
    width: 40%;
  }
  .text_bot{
    padding: .1rem 0;
    line-height: .35rem;
  }
  .ord_pay{
    padding-top: .1rem;
  }
  .ord_pay>div:first-child{
    padding-bottom: 0;
  }
  .ord_pay>div:nth-child(2){
    padding-top: .1rem;
  }
  .ord_pay>div:last-child{
    background: #fcfcfc;
  }
  .ord_state>div{
    height: .6rem;
    line-height: .6rem;
  }
  .ord_copy{
    margin-bottom: 1rem;
  }
  .ord_btn{
    height: .6rem;
    bottom: 0;
    padding: .2rem 0;
    border-top: 1px solid #dfdfdf;
  }
  .ord_btn span{
    width: 1rem;
    border: 1px solid #666;
    border-radius: 5px;
    padding: .1rem .24rem;
    margin-left: .24rem;
  }
  .ord_btn span:first-child{
    margin-right: .2rem;
  }
</style>