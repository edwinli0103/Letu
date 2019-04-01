<template>
  <div class="fx goodsitem box_pad3 modal" :value="value">        
    <div class="fx_1 fx" :class="{'selected':selData.selected}">
      <span class="checked icon_all" @click="selectedFn('子')"></span>
    </div>
    <div class="fx_9 fx">
      <div class="fx_4">
        <img :src="selData.img" alt="">
      </div>
      <div class="fx_1"></div>
      <div class="fx_10 fx_col pos-relative">
        <div class="fx_1">{{selData.goodsName}}</div>
        <div class="fx_1">￥{{selData.price}}</div>
        <div class="handle pos-absolute fx">
          <div class="addReduce txt_c col_3 fx">
            <div class="icon_all" @click="addReduceFn(false)"></div>
            <div>
              <input v-model="proNum" type="number" min="0" max="1000" value="0" readonly>
            </div>
            <div class="icon_all"  @click="addReduceFn(true)"></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsitem',
  props:['value'], 
  data () {
    return {
      selData:{
        id: this.value.id,
        goodsName:this.value.goodsName,
        specificsChild: this.value.specificsChild,
        price: this.value.price,
        proNum: this.value.proNum,
        selected: this.value.selected,
        img: this.value.img,
      },
      proNum: 0,
    }
  },
  methods: {
    selectedFn(d) {
      this.selData.selected = !this.selData.selected;
    },
    addReduceFn (isAdd) {
      if (!this.$store.state.csFlag)
        return;

      let obj = {
        id: this.value.id,
        specificsChild: this.value.specificsChild,
      };
      if (isAdd) {
        this.proNum += 1;
        this.$store.commit('add',obj);
      } else {
        if(this.proNum > 0) {
          this.proNum -= 1;
          this.$store.commit('reduce',obj);
        }
      }
      // 购物车是否为空    
      if(this.$store.state.goodsNum === 0) 
        this.$emit('carEmpty',true);
     
      
    },
  },
  created() {
    this.proNum = this.value.proNum; 
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
.goodsitem {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eee;
}
.goodsitem>div {
  height: 1.46rem;
}
.goodsitem .pos-relative>div {
  line-height: 0.73rem;
}

.checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.4rem 0.4rem;
}
.selected .checked {
  background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.4rem 0.4rem;
}

.handle {
  bottom: 0rem;
  right: 0rem;
  width: 2rem;
  height: 1rem;
  line-height: 1rem !important;
}
.addReduce div {
  height: 1rem;
  width: 0.6rem;
}

.addReduce div:first-child {
  background-image: url("../../assets/images/icon_1reduce.png");
  background-size: 0.55rem 1rem;
}

.addReduce div:last-child {
  background-image: url("../../assets/images/icon_1add.png");
  background-size: 0.55rem 1rem;
}

.addReduce input[type='number'] {
  display: inline-block;
  width: 0.5rem;
  font-size: 0.32rem;
  text-align: center;
}
</style>
