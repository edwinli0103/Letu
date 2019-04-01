<template>
  <div class="product1 _left bg_white" @click="goToDetail()">
    <div class="product1_top bg_main">
      <img :src="imgUrl + data.SMALL_IMG" alt="img">
    </div>
    <div class="product1_bot font_24">
      <div>{{data.NAME + data.ID}}</div>
      <div>{{'￥' + data.MARKET_PRICE}} <s>{{data.COST_PRICE}}</s></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product1",
  props:['value'],
  data() {
    return {
      data: {
        NAME: "儿童潜力",
        WEIGHT: 0,
        DETAIL_IMG: "",
        MID_IMG: "",
        ID: "",
        MARKET_PRICE: 100,
        SMALL_IMG: "",
        DISCOUNT: 10,
        COST_PRICE: 10
      },
      imgUrl:this.$store.state.imgUrl,
    }
  },
  methods: {
    goToDetail() {
      this.$router.push({path:"/goodsdetail/" + this.data.ID});
    }
  },
  created() {
    this.data = this.value;
  }
};
</script>

<style scoped>
.product1 {
  width: 47%;
  margin-left: 2%;
  margin-top: .2rem;
}
.product1_top {
  height: 2.5rem;
}
.product1_top img {
  width: 100%;
  height: 100%;
}
.product1_bot {
  height: 1rem;
  color: #666;
  line-height: 0.5rem;
  text-indent: 8px;
}
.product1_bot div:first-child {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.product1_bot div:last-child {
  font-size: 0.28rem;
  color: #18A5A9;
}
.product1_bot div:last-child s {
  font-size: 0.24rem;
  color: #ccc;
}

</style>
