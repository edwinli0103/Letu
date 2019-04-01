<template>
  <div class="payMent">
    <myHeader ref="myHeader" :header="header"></myHeader>
    <div class="bg_white font_28 marb_1 fx"  @click="changeAddresss">
      <div class="order_address fx_8">
        <div class="text_top clearfix">
          <div class="add_per _left">{{'收货人：' + address.acceptName}}</div>
          <div class="add_tel _right txt_r">{{address.mobile}}</div>
        </div>
        <div class="text_bot">
          <span v-for="(item,index) in address.areas">{{item + '-'}}</span>
          <span>{{address.address0}}</span>
        </div>
      </div>
      <div class="cAddress fx_1 icon_all"></div>
    </div>

    <div class="bg_white box_pad3 payModel marb_1 font_28">
      <div>支付方式</div>
      <div class="fx selected">
        <div class="fx_1 icon_all icon_weixin"></div>
        <div class="fx_8">微信支付</div>
        <div class="fx_1 icon_all icon_checked"></div>
      </div>
    </div>

    <div class="bg_white ord_det marb_1">
      <div class="font_28 pad_2f">费用明细</div>
      <div v-for="(item,index) in productsInfo" :key="item.specificsChild">
          <myOrder v-model="productsInfo[index]"></myOrder>
      </div>
      
    </div>

    <div class="bg_white ord_pay marb_1">
      <div class="font_28 pad_2f clearfix">
        <span class="_left">运费</span>
        <span class="_right">32.00</span>
      </div>
      <div class="font_28 pad_2d clearfix go_coupon" @click="goToCoupon()">
        <span class="_left">优惠券</span>
        <span class="_right colImg_red">无可用</span>
      </div>
      <div class="font_28 pad_2d clearfix go_coupon" @click="referrerFn">
        <span class="_left colImg_red">{{referrerPhone ? '推荐人:' + referrerPhone : '请添加推荐人手机号'}}</span>
        <span class="_right col_9">请选择推荐人</span>
      </div>
    </div>

    <div class="payMent_bot pos-fixed">
      <div class="fx font_30 bg_white">
        <div class="fx_3">
          合计: <span class="col_main">{{lastAccount}}</span> 
        </div>
        <div class="fx_1 color_white txt_c" @click="subMitOrder">提交订单</div>
      </div>
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
        HBC_text:"结算",
        HBR_icon: "icon_edit",
        HBR_show: false,
      },
      address:{
        acceptName:"",
        address0:"",
        areas:[],
        id:"",
        mobile:"",
        postcode:"",
        userId:"",
      },
      haveCoupon: false,
      productList: [],
      productsInfo:[],     
      orderId:'',
      lastAccount:'',
      // 推荐人手机号码
      referrerPhone: '',
    }
  },
  methods: {
    subMitOrder() {
      // 数据加载
      comTools.showLoading(this,'订单提交中...');
      setTimeout(() => {
        // 数据加载 结束 删除购物车的数据
        this.reduceCar();
        comTools.hideLoading(this);
        // 走支付流程
        this.orderId = '222001';
        this.weixinpay(this.orderId);
      })
    },
    weixinpay(orderId) {
      let _self = this;
      comTools.showLoading(_self,'订单提交中...');                  
      setTimeout(() => {
        comTools.hideLoading(_self);
          _self.$router.push({path:'/payMent/success/' + orderId });
      },500);
    },
    // 提交订单成功删除购物车
    reduceCar() {
      let self = this;
      let payGoods = this.$store.state.payGoods;
      payGoods.forEach(element => {
        self.$store.commit('reduce',element)
      });
    },
    goToCoupon () {
      if (!this.haveCoupon) {
        this.$vux.toast.text('暂无可用优惠劵...')
        return
      };
      this.$router.push({path:"/mainpage/self/coupon"});
    },
    changeAddresss () {
      this.$store.commit('setData',{key:'addressObj',value: {}});
      this.$store.commit('setData',{key:'goToType',value: 'setAddress'});
      this.$router.push({path:'/mainpage/self/address'});
    },
    referrerFn () {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        show: true,
        showInput: true,
        placeholder: "请输入...",
        title:"请输入推荐人手机号码",
        // 组件除show外的属性
        onCancel () {
        },
        onConfirm (value) {
          _this.referrerPhone = value;
        },
      })
    },
    calculateFn (arr) {
      let lastAccount = 0, proArr = [];
      arr.forEach((ele,i) => {
        let o = {
          ID: ele.id,
          NAME: ele.goodsName,
          SMALL_IMG: ele.img,
          MARKET_PRICE: ele.price,
          disPrice: '888',
          proNum: ele.proNum,
        }
        this.productsInfo.push(o);
        this.lastAccount += ele.price;
      });
      return false;
    }
  }, 
  created () {
    let self = this, payGoods = this.$store.state.payGoods;
    let allAddress = this.$store.state.allAddress;
    console.log(payGoods);
    if (payGoods == false)
      this.$router.push({path:'/mainpage/home'});

    // 数据加载
    comTools.showLoading(this);
    setTimeout((data) => {
      let goToType = this.$store.state.goToType;
      // 创建收货人id
      if(goToType === 'setAddress' && addressObj !== {}) {
        // 切换收货人id
        this.address = this.$store.state.addressObj;
        this.$store.commit('resetId','goToType');
      } else {
        this.address = allAddress[0];
      }
      
      this.calculateFn(payGoods);

      // 数据加载 结束
      comTools.hideLoading(this);
    },500)
    
  },
  mounted () {
  },
  watch: {
    
  }
}
</script>

<style scoped>
  .payMent {
    padding-top: 0.75rem;
  }
  .order_address{
    background: url(../../assets/images/mine/address2.png) no-repeat .15rem center;
    background-size: .4rem;
    padding-left: .7rem;
    padding-right: .2rem;
    border-bottom: 1px dashed #18A6AA;
  }
  .payModel>div:first-child {
    height: 0.5rem;
    line-height: 0.5rem;
    color: #999;
  }
  .payModel>div:last-child {
    height: 0.7rem;
    line-height: 0.7rem;
    color: #333;
  }
  .icon_checked {
    background-image: url("../../assets/images/icon_selector.png");
    background-size: 0.4rem 0.4rem;
  }
  .selected .icon_checked {
    background-image: url("../../assets/images/icon_selected.png");
    background-size: 0.4rem 0.4rem;
  }
  .icon_weixin  {
    background-image: url("../../assets/images/icon_weixin.png");
    background-size: 0.4rem 0.4rem;
    background-position: left center;
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
  .cAddress {
    background-image: url('../../assets/images/icon_more.png');
    background-size: 0.1rem 0.25rem;
    border-bottom: 1px dashed #18A6AA;
  }
  .go_coupon{
    background: url(../../assets/images/mine/jian-right.png) no-repeat 6.1rem center;
    background-size: .13rem auto;
    padding-right: .55rem;
  }
  .payMent_bot {
    left: 0;
    bottom: 0;
  }
  .payMent_bot>div {
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .payMent_bot>div div:first-child {
    text-indent: 0.4rem;
  }
  .payMent_bot>div div:last-child {
    background-color: #18A6AA;
  }
 
</style>