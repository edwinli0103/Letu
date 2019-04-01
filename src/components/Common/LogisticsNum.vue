<template>
<div class="logisticsNum">
  <div class="fx bg_white pad_2f">
    <div class="logistics_l fx_1 pos-relative">
      <img :src="imgUrl + pList[0].img" alt="">
      <div class="count pos-absolute bg_main color_white txt_c">{{pList.length + '件产品'}}</div>
    </div>
    <div class="logistics_c fx_4 font_24">
      <div class="font_B28 col_main">运输中</div>
      <div>顺丰快递：A22222222222</div>
      <div>官方电话：<span class="col_main">95338</span></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "order",
  props:['value'],
  data() {
    return {
      pList: this.value,
      imgUrl:this.$store.state.imgUrl,
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>
.logisticsNum{
  padding-bottom: .2rem;
  background: #EFEFEF;
}
.logistics_l{
  border: 1px solid #dfdfdf;
}
.logistics_l img {
  width: 1.2rem;
  height: 1.2rem;
}
.logistics_l .count{
  width: 100%;
  height: .4rem;
  bottom: 0;
  opacity: .4;
}
.logistics_c{
  padding-left: 0.15rem;
}
</style>
