<template>
  <div class="coupon_list">
    <div class="coupon_item fx">
      <div class="fx_1 fx colImg_gray">
        <div class="fx_1 txt_c font_B28">¥</div>
        <div class="fx_3 txt_l font_B50 txt_middle">{{selData.momey}}</div>
      </div>
      <div class="fx_2">
        <div class="coupon_name font_B30 colImg_gray">{{selData.coupon}}</div>
        <div class="fx">
          <div class="fx_6 bgImg_gray color_white">{{selData.couponMsg}}</div>
          <div class="fx_1"></div>
        </div>
        <div class="colImg_gray font_24">{{selData.couponStart+'-'+selData.couponEnd}}</div>
      </div>
      <div class="fx_1 color_white txt_c font_B32 txt_middle">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'couponused',
  props:['value'], 
  data () {
    return {
      selData:{
        id: this.value.id,
        momey: this.value.momey,
        coupon: this.value.coupon,
        couponMsg: this.value.couponMsg,
        couponStart: this.value.couponStart,
        couponEnd: this.value.couponEnd,
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
.coupon_list{
  padding: .2rem;
}
.coupon_item{
  width: 100%;
  height: 1.4rem;
  background: url("../../assets/images/mine/cou_yi.png") no-repeat center;
  background-size: 100% 100%;
}
.coupon_item>div:first-child>.fx_1{
  height: 1rem;
  line-height: 1rem;
}
.txt_middle{
  height: 1.4rem;
  line-height: 1.4rem;
}
.coupon_name{
  height: .56rem;
  line-height: .56rem;
}
.coupon_name+div{
  text-indent: 5px;
}
</style>