<template>
  <div class="sheetDetail">
    <myHeader ref="myHeader" :header="header"></myHeader>
    <div>待开发……此页面数据暂为订单详情数据</div>
    <div class="order_state font_30">{{sheetDetail.status==0?'等待客户回寄…':(sheetDetail.status==1?'等待检测中心检测…':(sheetDetail.status==25?'检测中心检测中……':'检测完成'))}}</div>
    <div class="bg_white font_28 marb_1">
      <div class="order_address">
        <div class="text_top clearfix">
          <div class="add_per _left">检测人：{{sheetDetail.address.acceptName}}</div>
          <div class="add_tel _right txt_r">{{sheetDetail.address.mobile}}</div>
        </div>
        <div class="text_bot">{{sheetDetail.address.provinceName+sheetDetail.address.cityName+sheetDetail.address.districtName+sheetDetail.address.addr}}</div>
      </div>
    </div>
    <div class="bg_white ord_det marb_1">
      <div class="font_28 pad_2f">检测商品明细</div>
      <div v-for="(sheetDetailItem,index) in sheetDetail.productList" :key="sheetDetailItem.id">
        <myOrder v-model="sheetDetail.productList[index]"></myOrder>
      </div>
    </div>
    <div class="bg_white marb_2 padlr_2 font_24 col_9 ord_state">
      <div class="">检测单号：<span>{{sheetDetail.id}}</span></div>
      <div class="">盒子编号：<span>{{sheetDetail.createTime}}</span></div>
      <div class="">下单时间：<span>{{sheetDetail.createTime}}</span></div>
    </div>
    <div class="bg_white font_28 txt_c pad_2 col_9 ord_copy">
      如有疑问,请联系客服&nbsp;<a href="tel:18616715025" class="col_main">18616715025</a>
    </div>
    <!-- 底部展示按钮 status 0:待付款 1:待收货 25:待评价 30:退款/售后 -->
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="sheetDetail.status==0">
      <span class="_right pay_btn" @click="returnAddrFn">回寄地址</span>
      <span class="_right cancel_btn" @click="returnMailFn">回寄运单号</span>
    </div>
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="sheetDetail.status==1">
      <span class="_right logistics" @click="sendLogistics">查看物流</span>
    </div>
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="sheetDetail.status==25">
      <span class="_right" @click="processFn">检测进程</span>
    </div>
    <div class="bg_white txt_c ord_btn font_24 clearfix pos-fixed" v-show="sheetDetail.status==30">
      <span class="_right refund" @click="sheetContent">检测单</span>
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
        HBC_text:"检测单详情",
        HBR_icon: "",
        HBR_show: false,
      },
      sheetDetail: {
        id: "",
        type: "",// type 0:线上支付(微信端) 1:toB端
        createTime: "",
        modifyTime: "",
        status: "",// status 0:待付款 1:待收货 25:待评价 30:退款/售后
        productList: [],
        payableFreight: "",
        allAccount: "",
        productDiscountAmount: "",
        disAccount: "",
        manjianAmount: "",
        lastAccount: "",
        payAccount: "",
        address: {}
      }
    }
  },
  methods: {
    // 回寄地址
    returnAddrFn() {
      alert("待开发")
    },
    // 回寄运单号
    returnMailFn() {
      alert("待开发")
    },
    // 查看物流
    sendLogistics() {
      // 物流详情页面跳转
      let sheetID = this.$route.params.sheetID;
      let value = {
        orderId: sheetID,
        productList: this.sheetDetail.productList
      }
      this.$store.commit('setData', { key: 'orderObj', value: value });
      this.$router.push({ path: '/mainpage/self/logistics' });
    },
    // 检测进程
    processFn() {
      alert("待开发")
    },
    // 检测单
    sheetContent() {
      alert("待开发")
    },
  },
  created() {
    var sheetID  = this.$route.params.sheetID;
    // 数据加载
    comTools.showLoading(this, '载入中...');
    this.$http.post('/interface/getOrder',{id:sheetID})
      .then((data) => {
        // 数据加载结束动画
        comTools.hideLoading(this);
        // var data = 
        // {"id":"20171222133433189006","type":0,"createTime":1513737667000,"modifyTime":1513737667000,"status":0,"productList":[{'id':'111','name':'儿童检测基因','img':'http://test1.clgene.com/upload/product/loop_img/1eacbf60-7cd7-11e7-851f-d196b098fe0f.jpg','price':'100','disPrice':'500','proNum':'2'},{'id':'112','name':'儿童检测基因2','img':'http://test1.clgene.com/upload/product/loop_img/1eacbf60-7cd7-11e7-851f-d196b098fe0f.jpg','price':'10','disPrice':'50','proNum':'10'}],"payableFreight":0,"allAccount":1500,"productDiscountAmount":0,"disAccount":0,"manjianAmount":35,"lastAccount":0,"payAccount":300,
        // "address":{"acceptName":"张三","mobile":"13223236666","provinceId":"100100","cityId":"111","districtId":"111","postcode":"111","addr":"111"}}
        console.log(data);
        this.sheetDetail = data;
      })
  },  
  mounted () {

  },
  watch: {
    
  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sheetDetail{
    padding-top: .75rem;
  }
  .order_state{
    padding: .5rem .7rem;
    /* border-top: 1px solid #fff; */
    background-color: #daf1f1;
  }
  .order_address{
    background: url(../../assets/images/mine/information_icon.png) no-repeat .15rem center;
    background-size: .4rem;
    padding-left: .7rem;
    padding-right: .2rem;
    border-bottom: 1px dashed #18A6AA;
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
    width: 1.2rem;
    border: 1px solid #666;
    border-radius: 5px;
    padding: .1rem .24rem;
    margin-left: .24rem;
  }
  .ord_btn span:first-child{
    border: 1px solid #ff3800;
    color: #ff3800;
    margin-right: .2rem;
  }
</style>