<template>
  <div class="product2 fx bg_white" @click="goToDetail()">
    <div class="product2_top fx_2 bg_main">
      <img :src="imgUrl + data.SMALL_IMG" alt="img">
    </div>
    <div class="product2_bot font_24 fx_6">
      <div>{{data.NAME}}</div>
      <div>{{'￥' + data.MARKET_PRICE}} <s>{{data.COST_PRICE}}</s></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "product2",
  props:['value'],
  data() {
    return {
      data: {
        NAME: "儿童潜力",
        WEIGHT: 0,
        DETAIL_IMG: "",
        MID_IMG: "",
        ID: "06808bd3d8314c308967e23e00ec6209",
        MARKET_PRICE: 100,
        SMALL_IMG: "",
        DISCOUNT: 10,
        COST_PRICE: 10
      },
      imgUrl:this.$store.state.imgUrl,
    }
  },
  methods: {
    goToDetail () {
      this.$router.push({path:"/goodsdetail/" + this.data.ID});
    }
  },
  created() {
    this.data = this.value;
  }
};
</script>

<style scoped>
.product2 {
  padding: 0.1rem;
  border-bottom: 1px solid #dfdfdf;
}
.product2_top {
  height: 1.32rem;
}
.product2_top img {
  width: 100%;
  height: 1.32rem;
}
.product2_bot div {
  margin-top: 0.25rem;
  padding-left: 0.15rem;
}
.product1_bot div:first-child {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.product2_bot div:last-child {
  font-size: 0.28rem;
  color: #18A5A9;
}
.product2_bot div:last-child s {
  font-size: 0.24rem;
  color: #ccc;
}
</style>
