<template>
    <div class="fx pad_2 marb_1 bg_white modal" :value="value">        
      <div class="fx_1 fx" :class="{'selected':selData.selected}" v-show="isShow">
        <span class="checked icon_all" @click="selectedFn('子')"></span>
      </div>
      <div class="fx_10 fx">
        <div class="fx_1">
          <img :src="imgUrl + selData.smallImg" alt="">
        </div>
        <div class="fx_5 goodsTxt">
          <div class="goodsName">{{selData.name}}</div>
          <div class="goodsPrice col_9">
            <span>￥{{selData.price}}</span>
            <span class="col_c">￥{{selData.beforePrice}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'collectionitem',
  props:['value'], 
  data () {
    return {
      selData:{
        id: this.value.id,        
        selected: false,
        name: this.value.name,
        price: this.value.price,
        beforePrice: this.value.beforePrice,
        weight: this.value.weight,
        detailImg: this.value.detailImg,
        minImg: this.value.minImg,
        smallImg: this.value.smallImg,
        selected: this.value.selected
      },
      imgUrl:this.$store.state.imgUrl,
      isShow: false,
    }
  },
  methods: {
    selectedFn(d) {
      this.selData.selected = !this.selData.selected;
    },
    isShowChecked(isShow) {
      this.isShow = !this.isShow;
    }
  },
  watch:{
    selData:{
      handler: function(curVal,oldVal) {  
        this.$emit('input', curVal);
      },
      deep:true
    },
    value:{
      handler: function(curVal,oldVal) {       
        this.selData = curVal;
      },
      deep:true
    },
  }
}
</script>

<style scoped>
.checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.3rem 0.3rem;
}
.selected .checked {
  background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.3rem 0.3rem;
}
.goodsTxt {
  padding-left: .2rem;
  box-sizing: border-box;
}
.goodsName{
  height: .6rem;
  line-height: .3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goodsPrice span:last-child{
  margin-left: .1rem;
  text-decoration: line-through;
  font-size: .2rem;
}
.col_9 .col_c{
  font-size: .18rem;
}
</style>
