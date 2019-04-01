<template>
  <div>
    <myHeader :header="header"></myHeader>
    <div class="member">
      <div class="profile">
        <img :src="infoHeader" alt="">
      </div>
      <p class="currentPoints">0／12000</p>
      <div class="levels"></div>
      <p>距下一等级还需 500 成长值</p>
    </div>
    <div class="strategies">
      <div class="strategies-title">会员攻略</div>      
    </div>
    <ul class="strategies-list">
			<li class="strategy" @click = "toggle(1)">
        <p class="strategy-name">成长值<span :class="[isA?isUp:isDown]"></span></p>
        <p :class="[isA?isUpCont:isDownCont]">
          1、购买精选商品实付金额1：1转化为成长值（不包含优惠券等抵扣部分）；<br>
          2、在会员生日当天下单，完成订单后可以获得5成长值；<br>
          3、商品退换货，需扣除该商品所获得成长值；<br>
          4、订单取消，需扣除该订单所获得成长值；<br>
          5、因作弊等行为产生的成长值，商城有权扣除相应成长值；<br>
        </p>
			</li>
			<li class="strategy" @click = "toggle(2)">
        <p class="strategy-name">成长攻略<span :class="[isB?isUp:isDown]"></span></p>
        <p :class="[isB?isUpCont:isDownCont]">
          1、注册会员：50>成长值>＝0；<br>
          2、一星会员：2000>成长值>＝50；<br>
          3、二星会员：4000>成长值>＝2000；<br>
          4、三星会员：8000>成长值>＝4000；<br>
          5、四星会员：10000>成长值>＝8000；<br>
          6、五星会员：成长值>＝12000；<br>
        </p>
			</li>
			<li class="strategy" @click = "toggle(3)">
        <p class="strategy-name">特权<span :class="[isC?isUp:isDown]"></span></p>
        <p :class="[isC?isUpCont:isDownCont]">
          会员等级越高获得的积分越多。<br>
          1、注册会员：1倍积分<br>
          2、一星会员：1.1.倍积分<br>
          3、二星会员：1.2倍积分<br>
          4、三星会员：1.3倍积分<br>
          5、四星会员：1.4倍积分<br>
          6、五星会员：1.5倍积分<br>
        </p>
			</li>
      <li class="strategy">
        <p class="strategy-name">会员等级说明</p>
        <p class="strategy-content">
          会员等级有效期为1年，1年后扣减相应等级成长值，剩余成长值重新计算会员级别。
        </p>
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
        HBC_text:"会员中心",
        HBR_icon: " ",
      },
      infoHeader: require('../../assets/images/mine/self001.jpg'),
      isUp: 'upIcon',
      isDown: 'downIcon',
      isUpCont: 'strategy-select',
      isDownCont: 'strategy-content',
      isA: false,
      isB: false,
      isC: false,
      isD: false,
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
      }   				
    },
  },
  created() {}
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.member{
  background: url(../../assets/images/mine/member_bg-d20c968c.jpg) no-repeat;
  background-size: 100% 100%;
  height: 3.56rem;
  color: #fff;
  font-size: .24rem;
  line-height: 1;
  text-align: center;
  overflow: hidden;
  margin-top: .75rem;
}
.profile{
  width: 1.16rem;
  height: 1.16rem;
  margin: .56rem auto .24rem;
}
.profile img{
  border-radius: 50%;
}
.levels{
  height: .8rem;
}
.strategies-title{
  padding: .28rem;
}
.strategies-list{
  margin-bottom: .4rem;
}
.strategy{
  position: relative;
  background-repeat: no-repeat;
  background-position: .28rem .3rem;
  background-size: .88rem;
  padding: .16rem .28rem .16rem 1.44rem;
  border-bottom: solid 1px #e0e0e0;
}
.strategy:nth-child(1){
  background-image:url(../../assets/images/mine/strategy1.png);
}
.strategy:nth-child(2){
  background-image:url(../../assets/images/mine/strategy2.png);
}
.strategy:nth-child(3){
  background-image:url(../../assets/images/mine/strategy3.png);
}
.strategy:nth-child(4){
  background-image:url(../../assets/images/mine/strategy4.png);
}
.strategy-name{
  font-size: .28rem;
  line-height: .44rem;
  position: relative;
}
.strategy-content{
  color: #999;
  font-size: .24rem;
  line-height: .36rem;
  height: .72rem;    
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.strategy-select{
  color: #999;
  font-size: .24rem;
  line-height: .36rem;
  height: auto;
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