<template>
  <div class="goodsDetail">
  
    <router-view @reset="resetNum"></router-view>

    <div class="bott_menu icon_all">
      <div>
        <div class="fx txt_c">
          <div class="fx_2 txt_r font_28">添加商品:</div>
          <div class="fx_5">
            <div class="addReduce txt_c col_3 fx">
              <div class="icon_all" @click="addReduce(false)"></div>
              <div>
                 <input v-model="proNum" type="number" min="0" max="1000" value="0" readonly>
              </div>
              <div class="icon_all"  @click="addReduce(true)"></div>
            </div>
          </div>
          <div class="fx_2" @click="goToCar()">
            <span 
              class="carNum color_white pos-absolute" 
              v-show="productNum">{{productNum}}</span>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import { XNumber } from 'vux'
export default {
  name: "goodsDetail",
  components: {
  },
  data() {
    return {
      selected: true,
      roundValue: 0,
      proNum: 0,
    }
  },
  computed:{
    productNum(){
      return this.$store.state.goodsNum;
    }
  },
  methods: {
    goToCar () {
      this.$router.push({path: '/mainpage/car'})
    },
    collect () {
      this.selected = !this.selected;
    },
    addReduce (isAdd) {
      if (isAdd) {
        this.proNum += 1;
        this.$store.commit('add');
      } else {
        if(this.proNum > 0) {
          this.proNum -= 1;
          this.$store.commit('reduce');
        }
      } 
    },
    // sid样本id  id 商品id
    resetNum (sid,id) {
      let self = this, Num = 0;
      let car = this.$store.state.car;
      if (car.length === 0) 
        return
      car.forEach(element => {
        if(element.id === id && element.specificsChild === sid) {
          Num = element.proNum; 
        }
      });
      self.proNum = Num;
    }
  },
  created() {
    console.log('goodsDetail===================created')
  },
  mounted () {
    console.log('goodsDetail===================mounted')
  },
  activated () {
    // this.doFocusFn();
    console.log('goodsDetail===================activated')
  },
  deactivated () {
    console.log('goodsDetail===================deactivated')
  },
  destroyed () {
    console.log('goodsDetail===================destroyed')
  },
};
</script>

<style scoped>
  .bott_menu {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.35rem;
    /* background-color: rgba(255, 255, 255, 0) */
  }

  .bott_menu>div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
  }

  .bott_menu {
    background-image: url("../../assets/images/icon_footer.png");
    background-size: 100% 1.35rem;
  }

  .addReduce {
    padding-left: 0.5rem;
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

  .carNum {
    top: -0.22rem;
    right: 0.2rem;
    width: 0.36rem;
    height: 0.36rem;
    line-height: 0.36rem;
    border-radius: 50%;
    background-color:rgba(237, 7, 7, 0.8);
  }
</style>
