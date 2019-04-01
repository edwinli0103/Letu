<template>
  <div class="car">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <div v-if="isNoEmpty">
      <!-- 中间部分 -->
      <div class="bg_white">
        <!-- 为你推荐 -->
        <div class="fx recommended box_pad3 font_26">
          <div class="fx fx_3 recom_l col_9">
            <span></span>
            <span>为你推荐</span>
          </div>
          <div class="fx_1 fx recom_r txt_c"  @click="goTORecommend">
            <span>去逛逛</span>
          </div> 
        </div>
        <!-- 购物列表 -->
        <div>
          <div v-for="(goodsItem,index) in goodsItems" :key="goodsItem.specificsChild">
            <myGoodsItem @carEmpty="carEmpty" v-model="goodsItems[index]"></myGoodsItem>
          </div>        
        </div>
      </div>
      <!-- 底部的菜单 -->
      <div class="bottom pos-fixed col_9">
        <div class="fx font_30">
          <div class="fx_2 fx" :class="{'selectedAll':selectedAll}" @click="selectedAllFn()">
            <div class="fx_2 icon_all icon_checked"></div>
            <div class="fx_3">{{!selectedAll ? '全选' : '取消'}}</div>
          </div>
          <div class="fx_2 fx_col ">
            <div class="fx_3 font_26 col_3">合计: <span class="col_main">￥{{payMoney}}</span></div>
            <div class="fx_2 font_24">运费: ￥<span>32</span></div>
          </div>
          <div class="fx_2 txt_c payAll" @click="goToPay()">结算({{payGoodsNum}})</div>
        </div>      
      </div>      
    </div>
    <div v-else>
      <div class=" icon_all icon_carEmpty"></div>
      <div class="font_28 txt_c col_main" @click="goTORecommend">
        购物车空空如也,赶快去逛逛吧 >>>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import GoodsItem from  './GoodsItem'
export default {
  name: 'car',
  components: {
    myHeader: HeaderBack,
    myGoodsItem: GoodsItem, 
  },
  data () {
    return {
       header: {
        HBL_icon:"icon_back", 
        HBC_text:"购物车", 
        HBR_icon: "icon_search",
        HBR_type: "search",
        HBR_show: true
      },
      selectedAll: false,
      payGoodsNum: 0,
      payMoney: 0,
      goodsItems: [],
      //购物车是否是空的 
      isNoEmpty: true,
    }
  },
  created () {
    console.log('car===================created')
  },
  mounted () {
    console.log('car===================mounted')
  },
  activated () {
    let carArr = this.$store.state.car;
    if(carArr.length === 0) {
      this.isNoEmpty = false;
      return;
    }
    this.goodsItems = carArr;
    console.log('car===================activated')
  },
  deactivated () {
    console.log('car===================deactivated')
  },
  destroyed () {
    console.log('car===================destroyed')
  },
  methods: {
    goToPay() {
      if(this.getPayGoods() == false){
        this.$vux.toast.show({
          type:'warn',
          text:'请选择商品...',
        });
        return
      };
      this.$router.push({path: '/payMent'});
    },
    goTORecommend() {
      this.$router.push({path:'/moreHot/recommend'});
    },
    selectedAllFn() {
      let selected = this.selectedAll;
      this.selectedAll = !selected;
      this.goodsItems.forEach(function(item,index){
        item.selected = !selected;
      }); 
    },
    // 获取结算的商品
    getPayGoods() {
      let arr = [];
      this.goodsItems.forEach((ele,i) => {
        if (ele.selected) {
          arr.push(ele);
        }
      });
      this.$store.commit("setData",{
        key:'payGoods',
        value:arr 
      });
      return arr;
    },
    carEmpty(data) {
      this.isNoEmpty = false;
    }
  },
  watch: {
    goodsItems: {
      handler:function(curVal,oldVal) {
        let self = this,payGoodsNum = 0,payMoney = 0; 
        self.selectedAll = true;
        curVal.forEach(function(item,index) {
          if(!item.selected) {
            self.selectedAll = false;
          } else {
            payGoodsNum += item.proNum;
            payMoney += item.proNum*item.price;
          }
          
        })
        self.payGoodsNum = payGoodsNum;
        self.payMoney = payMoney.toFixed(2);
      },
      deep: true
    }
  },
  

}
</script>

<style scoped>
.car {
  padding-bottom: 0.8rem;
}
.recommended {
  padding-top: 0.07rem;
  padding-bottom: 0.07rem;
  border-bottom: 1px solid #eee;
}
.recommended>div {
  height: 0.3rem;
  line-height: 0.3rem;
  padding: 0.08rem 0;
}
.recom_l span:first-child {
  width: 0.1rem;
  border-radius: 0.18rem;
  background-color: #97d3d9;
}
.recom_l span:last-child {
  text-indent: 0.2rem;
}
.recom_r {
  border-radius: 0.25rem;
  border: 1px solid #18a5a9;
}
.recom_r span {
  width: 100%;
  color: #18a5a9;
}
.icon_checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.4rem 0.4rem;
}
.selectedAll .icon_checked {
  background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.4rem 0.4rem;
}
/* 购物车空空如也 */
.icon_carEmpty {
  width: 100%;
  height: 5rem;
  background-image: url("../../assets/images/icon_carEmpty.png");
  background-size: 1.83rem 1.28rem;
}
/* 底部菜单栏 */
.bottom {
  left: 0;
  bottom: 1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-top: 1px solid #e3e1e1;
  background-color: #f9f9f9; 
}
.bottom .fx_col div:first-child {
  line-height: 0.45rem;
}
.bottom .fx_col div:last-child {
  line-height: 0.35rem;
}
.payAll {
  color: #fff;
  background-color: #18a6aa;
}

</style>
