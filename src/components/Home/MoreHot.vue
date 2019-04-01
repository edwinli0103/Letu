<template>
  <!-- 头部 -->
  <div class="moreHot">
    <!-- 头部导航栏 -->
    <myHeader ref="myHeader" :header="header"></myHeader>
    <!-- 热卖商品 -->
    <div class="H_hotSales clearfix">
      <div v-for="(item,index) in hotSaleData" :key="item.Id">
        <myHotSale v-model="hotSaleData[index]"></myHotSale>
      </div>
    </div>
    <!-- 查看全部商品按钮 -->
    <div class="H_lookAll txt_c font_28" @click="goToAll()">点击查看全部商品 >> </div>

  </div>
 
  
</template>

<script>
import HotSale from "./HotSale";
import Header from "../Common/HeaderBack";
export default {
  name: "moreHot",
  components: {
    myHeader: Header,
    myHotSale: HotSale 
  },
  data() {
    return {
      // 头部数据
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"", 
        HBR_icon: " ",
      },       
      // 热卖商品数据
      hotSaleData:[]
    };
  },
  methods: {
    goToAll () {
      this.$router.push({path: '/mainpage/all'});
    },
    changeHeader () {
      let HBC_text = this.$route.params.type;
      if (HBC_text === 'hot') {
        this.$refs.myHeader.changeText('HBC_text','商城热卖');
      } else if (HBC_text === 'recommend') {
        this.$refs.myHeader.changeText('HBC_text','为您推荐');
      }
    }
  },
  created () {
    // 数据加载 
    comTools.showLoading(this);
    let data = this.$store.state.allGoods;
    setTimeout(() => {
      this.hotSaleData = data;
      // 改变头部标题
      this.changeHeader();
      // 数据加载 结束
      comTools.hideLoading(this);
    }, 500);
  },
  mounted () {
  },
  beforeDestroy () {
  }
};
</script>

<style scoped>
.moreHot {
  padding-top: 0.8rem;
}
.H_hotSales {
  width: 100%;
  padding-bottom: .2rem;
}
.H_lookAll {
  color: #999;
  margin-bottom: .3rem;
}

</style>
