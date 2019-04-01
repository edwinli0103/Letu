<template>
  <div class="question">
    <myHeader :header="header"></myHeader>
    <ul class="ques-list">
			<li @click = "toggle(1)">
				<div class="ques">发货时间？<span :class="[isA?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isA">每天的9：00-18：00，仓库配货前一天16:00以后的订单和当天16：00以前的订单。<br></p>
			</li>
			<li @click = "toggle(2)">
				<div class="ques">伴你左右客服服务时间？<span :class="[isB?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isB">人工客服服务时间是9：00-18:00，智能客服的服务时间是7X24小时。<br></p>
			</li>
			<li @click = "toggle(3)">
				<div class="ques">包邮地区？<span :class="[isC?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isC">除西藏，新疆，青海，海南，港澳台地区除外，其他地区均包邮。<br></p>
			</li>
      <li @click = "toggle(4)">
				<div class="ques">如何在商城下单购买商品？<span :class="[isD?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isD">1)	进入“勤睿梦”服务号点击“我要下单”；选择商品，加入购物车；<br>2)	进入购物车页面，选择收货地址、收货时间、确认商品数量等信息，点击【选好了】；<br>3)	进入订单结算页，选择优惠券、支付方式，确认付款金额，点击【确认付款】完成下单。<br></p>
			</li>
			<li @click = "toggle(5)">
				<div class="ques">如何新增、编辑和删除收货地址？<span :class="[isE?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isE">通过以下方式进入收货地址页，点击地址旁边的编辑功能可编辑或删除当前地址；点击页面下方的【新增地址】可添加收货地址。<br>方式1：在首页底部点击【我的】，再点击【我的收货地址】进入收货地址页；<br>方式2：选择商品后在购物车页，点击地址进入收货地址页。<br></p>
			</li>
      <li @click = "toggle(6)">
				<div class="ques">优惠券怎么使用？<span :class="[isF?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isF">在订单结算时点击“使用优惠券”，点选合适的优惠券即可使用，灰色为已过期或已使用的优惠券。<br></p>
			</li>
			<li @click = "toggle(7)">
				<div class="ques">如何查询历史订单？<span :class="[isG?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isG">在首页底部点击【我的】，再点击【我的订单】即可查询全部订单，或通过微信平台点击左上角图标后，进入【我的订单】即可查询全部订单。<br></p>
			</li>
      <li @click = "toggle(8)">
				<div class="ques">退款流程<span :class="[isH?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isH">1)	进入订单详情，点击下方的【申请退款】，客服审核通过后会短信通知您；<br>2)	退款时间说明： 伴你左右会在48小时内自动退款，按原支付方式退回，2-15个工作日内到账。退款中不包含优惠券，积分兑换积分。<br>如果未及时收到退款，请您与第三方支付平台联系核实。<br>微信支付：请您登陆财付通，进入“钱包-交易记录”或联系财付通客服查询退款；<br></p>
			</li>
			<li @click = "toggle(9)">
				<div class="ques">免责声明<span :class="[isI?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isI">对于故意套单、恶意索赔等违反诚实信用原则的行为，伴你左右有权取消订单、作废对应优惠券及拒绝相关的无理赔偿。<br></p>
			</li>
      <li @click = "toggle(10)">
				<div class="ques">营业资质公告<span :class="[isJ?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isJ"></p>
			</li>
			<li @click = "toggle(11)">
				<div class="ques">收货&评价<span :class="[isK?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isK">收到宝贝，请您点击确认。<br>对宝贝满意给出好评，不满意可以申请退款。<br></p>
			</li>
      <li @click = "toggle(12)">
				<div class="ques">退货流程<span :class="[isL?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isL">在不影响二次销售的情况下，七天无理由退换货，退货邮费由买方承担<br></p>
			</li>
			<li @click = "toggle(13)">
				<div class="ques">新用户？<span :class="[isM?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isM">在商城内从没购买过商城的用户为新用户<br></p>
			</li>
      <li @click = "toggle(14)">
				<div class="ques">老用户？<span :class="[isN?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isN">在商城内成功购物的用户即为老用户。<br><br></p>
			</li>
			<li @click = "toggle(15)">
				<div class="ques">分享机制<span :class="[isO?'upIcon':'downIcon']"></span></div>
				<p class="ans" v-show = "isO">分享机制就是用户通过分享商城链接或者二维码给好友，进行对商城的宣传和带来新用户，商城给予一定的佣金奖励。<br>例如：A用户分享给B用户，B用户是新用户，购物成功后7天后A可领取实际交易额的5%作为佣金奖励。B用户在商城每次购买成功后，且不退货的情况下，A用户依旧有实际交易额的5%作为佣金奖励。<br>A分享给B，如果B是老用户，那么B购物不计入A账户；A分享给B，C也分享给B，但是A分享给B时没有购物（B此时为新用户），B通过C分享的链接进入成功购物（此时B成为老用户），C获得佣金奖励。<br>A不可以看到B进入商城购买商品的详细记录，只可以看到某个用户在商城中购物并获得佣金奖励。佣金奖励的设置，商城根据商品价钱设定，目前佣金奖励为实际交易金额的5%。<br></p>
			</li>      
		</ul>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'

export default {
  components: {
    myHeader: HeaderBack,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"常见问题",
        HBR_icon: " ",
      },
      isA: false,
      isB: false,
      isC: false,
      isD: false,
      isE: false,
      isF: false,
      isG: false,
      isH: false,
      isI: false,
      isJ: false,
      isK: false,
      isL: false,
      isM: false,
      isN: false,
      isO: false,
    }
  },
  methods: {
    toggle: function(index){
      if(index==1){
        this.isA = !this.isA;
      }else if(index==2){
        this.isB = !this.isB;
      }else if(index==3){
        this.isC = !this.isC;
      }else if(index==4){
        this.isD = !this.isD;
      }else if(index==5){
        this.isE = !this.isE;
      }else if(index==6){
        this.isF = !this.isF;
      }else if(index==7){
        this.isG = !this.isG;
      }else if(index==8){
        this.isH = !this.isH;
      }else if(index==9){
        this.isI = !this.isI;
      }else if(index==10){
        this.isJ = !this.isJ;
      }else if(index==11){
        this.isK = !this.isK;
      }else if(index==12){
        this.isL = !this.isL;
      }else if(index==13){
        this.isM = !this.isM;
      }else if(index==14){
        this.isN = !this.isN;
      }else if(index==15){
        this.isO = !this.isO;
      }
    },
  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ques-list{
  margin-top: .75rem;
  background: #fff;
}
.ques-list li{  
  border-bottom: 1px solid #E9E9E9;
  padding: .3rem .4rem 0 .3rem;
  font-size: .24rem;
  color: #999;
}
.ques{
  position: relative;
  line-height: .4rem;
  font-size: .28rem;
  color: #333;
  padding-bottom: .3rem;
}
.ans{
  line-height: .36rem;
  padding: .14rem 0;
  border-top: 1px solid #E9E9E9;
}
.upIcon{
  position: absolute;
  width: .2rem;
  height: .2rem;
  top: .1rem;
  right: 0;
  background: url(../../assets/images/mine/icon_arrow_up.png) no-repeat center center;
  background-size: .2rem;
}
.downIcon{
  position: absolute;
  width: .2rem;
  height: .2rem;
  top: .1rem;
  right: 0;  
  background: url(../../assets/images/mine/icon_arrow_down.png) no-repeat center center;
  background-size: .2rem;
}

</style>