<template>
  
  <div class="myself_main">
    <router-link to="/mainpage/self/myself" tag="div" class="myselfIntro">
      <img class="myselfPic _left" :src="info.headimgurl" alt="">
      <div class="user">
        <p>{{ info.nickname }}</p>
        <p class="font_24">
          <span>{{ info.mobile }}</span>&nbsp;&nbsp;  
          <span>{{ info.city + ' . ' + info.country }}</span>
        </p>
      </div>
    </router-link>
    <div class="myselfCont">
      <div class="myOrder">
        <router-link to="/mainpage/self/orderlist/0" tag="div" class="moreOrderCont">
          <div class="moreOrder">我的订单<span>查看全部订单</span></div>
        </router-link>
        <ul class="orderTypes">
          <div class="orderType" @click="onIClick(1)">待付款<span v-show="status0Show">{{status0}}</span></div>
          <div class="orderType" @click="onIClick(2)">待收货<span v-show="status1Show">{{status1}}</span></div>
          <div class="orderType" @click="onIClick(3)">待评价<span v-show="status2Show">{{status2}}</span></div>
          <div class="orderType" @click="onIClick(4)">退款/售后<span v-show="status3Show">{{status3}}</span></div>
        </ul>
      </div>
      <div class="operateItems">
        <router-link to="/mainpage/self/testsheet/0" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">检测状态</span>
        </router-link>
        <router-link to="/mainpage/self/testperson" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">我的检测人</span>
        </router-link>
        <router-link to="/mainpage/self/onlinequery" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">在线报告查询</span>
        </router-link>
        <router-link to="/mainpage/self/address" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">收货地址</span>
        </router-link>
        <router-link to="/mainpage/self/collection" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">商品收藏</span>
        </router-link>
        <router-link to="/mainpage/self/coupon" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">我的优惠券</span>
        </router-link>
        <router-link to="/mainpage/self/feedback" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">意见反馈</span>
        </router-link>
        <router-link to="/mainpage/self/help" tag="div" class="operateItem _left">
          <div class="icon"></div>
          <span class="my_page_txt">帮助中心</span>
        </router-link>
      </div>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'self',
  data () {
    return {
      info: {
        city:'北京',
        country:'朝阳',
        headimgurl:require('../../assets/images/mine/self001.jpg'),
        mobile:'18866699900',
        nickname:'总有刁民想害朕',
        openid:'001',
        province:'华夏',
        sex:'男',
        userid:'999999'
      },
      status0:'6',
      status0Show: true,
      status1:'3',
      status1Show: true,
      status2:'3',
      status2Show: true,
      status3:'',
      status3Show: false,
    }
  },
  methods: {
    onIClick(index) {
      this.$router.push({path:"/mainpage/self/orderlist/"+index});
    }
  },
  created() {}
}
</script>

<style scoped>
  .myself_main{
    margin-top: -0.75rem;
    background-color: #efefef;
  }
  .myselfIntro {
    width: 100%;
    height: 2.4rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #18a6aa;
    z-index: 19;
  }
  .myselfPic{
    width: 1.44rem;
    height: 1.44rem;
    padding: 0;
    margin-left: 6%;
    margin-top: 6%;
    border-radius: 100%;
    border: 1px solid #ccc;
  }
  .user{
    height: .72rem;
    line-height: .72rem;
    margin: .48rem .54rem 0 2.4rem;
    font-size: .3rem;
    font-weight: 700;
    color: #fff;
    background: url(../../assets/images/mine/mine_right.png) no-repeat right center;
    background-size: auto .3rem;
  }
  .user p{
    height: .72rem;
    line-height: .72rem;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: .3rem;
  }
  .myselfCont{
    overflow: hidden;
    padding-top: 2.4rem;
  }
  .myOrder{
    background-color: #fff;
    margin-bottom: .2rem;
  }
  .moreOrderCont{
    padding-right: .2rem;
    border-bottom: 1px solid #efefef; 
  }
  .moreOrder{
    padding: .3rem;
    background: url(../../assets/images/mine/jian-right.png) no-repeat right center;
    background-size: auto .24rem;
    font-size: .3rem;
    height: .35rem;
    line-height: .36rem;
  }
  .moreOrder span{
    font-size: .24rem;
    color: #999;
    float: right;
  }
  .orderTypes{
    overflow: hidden;
    clear: both;
  }
  .orderType{
    float: left;
    width: 25%;
    height: .6rem;
    padding-top: 1rem;
    padding-bottom: .3rem;
    text-align: center;
    position: relative;
  }
  .orderType span{
    display: block;
    width: .3rem;
    height: .24rem;
    line-height: .24rem;
    padding: .03rem 0;
    font-size: .2rem;
    text-align: center;
    border: 1px solid #18a6aa;
    border-radius: 50%;
    position: absolute;
    left: .95rem;
    top: .4rem;
    background-color: #fff;
    color: #18a6aa;
  }
  .orderType:nth-child(1){
    background: url(../../assets/images/mine/icon_daifukuan.png) no-repeat center 35%;
    background-size: .48rem;
  }
  .orderType:nth-child(2){
    background: url(../../assets/images/mine/icon_daishouhuo.png) no-repeat center 35%;
    background-size: .48rem;
  }
  .orderType:nth-child(3){
    background: url(../../assets/images/mine/icon_daipingjia.png) no-repeat center 35%;
    background-size: .48rem;
  }
  .orderType:nth-child(4){
    background: url(../../assets/images/mine/icon_tuikuan.png) no-repeat center 35%;
    background-size: .48rem;
  }
  .operateItems{
    margin-bottom: .2rem;
    overflow: hidden;
    text-align: center;
    clear: both;
  }
  .operateItem{
    width: 2.12rem;
    height: 1.8rem;
    margin: 1px 0 0 1px;
    padding-top: .8rem;
    float: left;
    background: #fff;  
  }
  .operateItem:nth-child(3n+1){
    margin-left:0;
  }
  .operateItem .icon{
    width: .66rem;
    height: .66rem;
    margin: 0 auto .1rem;
  }
  .operateItem:nth-child(1) .icon{
    background: url(../../assets/images/mine/report_icon.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(2) .icon{
    background: url(../../assets/images/mine/information_icon.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(3) .icon{
    background: url(../../assets/images/mine/icon_list.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(4) .icon{
    background: url(../../assets/images/mine/address2.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(5) .icon{
    background: url(../../assets/images/mine/icon_mypage_collection2.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(6) .icon{
    background: url(../../assets/images/mine/icon_mypage_coupon.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(7) .icon{
    background: url(../../assets/images/mine/icon_mypage_feedback.png) no-repeat center;
    background-size: contain;
  }
  .operateItem:nth-child(8) .icon{
    background: url(../../assets/images/mine/icon_mypage_help.png) no-repeat center;
    background-size: contain;
  }
</style>
