<template>
<div class="order">
  <div class="order_top fx">
    <div class="order_top_l fx_1">
      <img :src="img" alt="">
    </div>
    <div class="order_top_c fx_5 font_24">
      <div class="text_top">{{name}}</div>
      <div class="fx col_9">
        <div class="fx_4">￥{{price}}<span class="col_c">￥{{disPrice}}</span></div>
        <div class="fx_1">数量:<span class="">X</span>{{proNum}}</div>
      </div>
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
      id: this.value.ID,
      name: this.value.NAME,
      img: this.value.SMALL_IMG,
      price: this.value.MARKET_PRICE,
      disPrice: 999,
      proNum: 1,
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>
.order{
  
}
.order_top {
  padding: 0.2rem;
  margin-bottom:2px;
  background: #fcfcfc;
}
.order_top_l img {
  width: 1rem;
  height: 1rem;
}
.order_top_c{
  padding-left: 0.15rem;
}
.order_top .text_top{
  height: .6rem;
  line-height: .3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.order_top .col_c{
  margin-left: .1rem;
  text-decoration: line-through;
}
.col_9 span{
  font-size: .18rem;
  padding-left: .08rem;
  padding-right: .02rem;
}
</style>
