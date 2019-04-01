<template>
  <div @click="goToDetail()" class="hotSale _left box_pad33 bg_white">
    <div class="hotSale_top">
      <img :src="data.SMALL_IMG" alt="">
    </div>
    <div class="font_26 hotSale_center">{{data.NAME + data.ID}}</div>
    <div class="fx hotSale_bot">
      <div class="fx_1 price col_main">
        <div>￥{{data.MARKET_PRICE}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotsale",
  props:['value'],
  data() {
    return {
      data:{
        ID:this.value.ID,
        NAME: this.value.NAME,
        MID_IMG: this.value.MID_IMG,
        SMALL_IMG: this.value.SMALL_IMG,
        MARKET_PRICE: this.value.MARKET_PRICE,
      },
    }
  },
  methods: {
    goToDetail() {
      this.$store.commit('setId',{key:'productId',value:this.data.ID})
      this.$router.push({path:"/goodsdetail/" + this.data.ID});
    }
  },
  created() {
  }
};
</script>

<style scoped>
.hotSale {
  width: 45.5%;
  margin-left: 3%;
  margin-top: .2rem;
}
.hotSale_top img {
  width: 100%;
  height: 2.2rem;
}
.hotSale_center {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.hotSale_bot {
  height: 0.5rem;
  line-height: 0.5rem;
}
</style>
