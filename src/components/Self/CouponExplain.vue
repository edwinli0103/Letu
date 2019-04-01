<template>
  <div class="couponexplain">
    <myHeader :header="header"></myHeader>
    <ul class="explain-list bg_white">
      <li class="explain-item padlr_2">
        <h4 class="qa-q">优惠券可以干什么？</h4>
        <p class="qa-a">在线支付时抵扣商品金额。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">怎么获得优惠券？</h4>
        <p class="qa-a">在商城不定期推出的活动中获得。<br>从朋友分享的福利红包中获得。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">一张优惠券能拆开多次使用吗？</h4>
        <p class="qa-a">不能，一张优惠券只能一次性使用，不能分开使用。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">多张优惠券能一起使用吗？</h4>
        <p class="qa-a">不能，一次只能使用一张优惠券，不能与其他优惠券合并使用。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">下单的时候使用了优惠券，但是后来订单取消了，优惠券会返还吗？</h4>
        <p class="qa-a">会，订单取消后优惠券会立刻返还到您的账户中。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">如何使用优惠券？</h4>
        <p class="qa-a">在订单结算时，点击“使用优惠券”，选择可用优惠券使用。</p>
      </li>
      <li class="explain-item padlr_2">
        <h4 class="qa-q">为什么我用不了优惠券？</h4>
        <p class="qa-a">不同活动具有不同使用规则，具体原因可在微信商城中的结算付款页 — 选择优惠券中查看不可用原因</p>
      </li>
      <li class="explain-item padlr_2 special">
        <h4 class="qa-q">特殊活动以活动规则为准。</h4>
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
        HBC_text:"使用规则",
        HBR_icon: "",
      },
    }
  },
  methods: {
    
  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.couponexplain{
  padding-top: .75rem;
}
.couponexplain h4{
  font-weight: bold;
}
.explain-item{
  border-bottom: 1px solid #dfdfdf;
}
.qa-q{
  position: relative;
  line-height: .4rem;
  font-size: .32rem;
  color: #747474;
  padding: .3rem 0 .2rem .5rem;
}
.qa-q:before{
  content: 'Q';
  position: absolute;
  left: 0;
  font-size: .44rem;
  color: #18A5A9;
}
.qa-a{
  position: relative;
  line-height: .4rem;
  font-size: .26rem;
  color: #999;
  padding: 0.1rem 0 .2rem .5rem;
}
.qa-a:before{
  content: 'A';
  position: absolute;
  left: 2px;
  color: #18A5A9;
  font-size: .3rem;
}
.special .qa-q{
  font-size: .26rem;
  color: #999;
  padding-top: .14rem;
  color: #18A5A9;
  font-weight: normal;
}
.special .qa-q:before{
  content: '';
}
</style>