<template>
  <div class="coupon_list">
    <!-- <div class="fx" :class="[{'img_red':selData.momey=='50'},{'img_blue':selData.momey=='100'},{'img_green':selData.momey=='200'},{'img_purple':selData.momey=='500'}]"> -->
    <div class="fx coupon_item" :class="{'img_red':selData.momey=='50','img_blue':selData.momey=='100','img_green':selData.momey=='200','img_purple':selData.momey=='500'}">
      <div class="fx_1 fx" :class="{'colImg_red':selData.momey=='50','colImg_blue':selData.momey=='100','colImg_green':selData.momey=='200','colImg_purple':selData.momey=='500'}">
        <div class="fx_1 txt_c font_B28">¥</div>
        <div class="fx_3 txt_l font_B50 txt_middle">{{selData.momey}}</div>
      </div>
      <div class="fx_2">
        <div class="coupon_name font_B30">{{selData.coupon}}</div>
        <div class="fx">
          <div class="fx_6 color_white" :class="{'bgImg_red':selData.momey=='50','bgImg_blue':selData.momey=='100','bgImg_green':selData.momey=='200','bgImg_purple':selData.momey=='500'}">
            {{selData.couponMsg}}
          </div>
          <div class="fx_1"></div>
        </div>
        <div class="col_9 font_24">{{selData.couponStart+'-'+selData.couponEnd}}</div>
      </div>
      <div class="fx_1 color_white txt_c font_B32 txt_middle" @click="useCouponFn">
        使用
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'couponnotused',
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
    useCouponFn () {
      // 业务逻辑
      this.$router.go(-1);
    }
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
  
}
.img_red{
  width: 100%;
  height: 1.4rem;
  background: url("../../assets/images/mine/cou_wei_red.png") no-repeat center;
  background-size: 100% 100%;
}
.img_blue{
  width: 100%;
  height: 1.4rem;
  background: url("../../assets/images/mine/cou_wei_blue.png") no-repeat center;
  background-size: 100% 100%;
}
.img_green{
  width: 100%;
  height: 1.4rem;
  background: url("../../assets/images/mine/cou_wei_green.png") no-repeat center;
  background-size: 100% 100%;
}
.img_purple{
  width: 100%;
  height: 1.4rem;
  background: url("../../assets/images/mine/cou_wei_purple.png") no-repeat center;
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