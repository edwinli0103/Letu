<template>
  <div class="actDetail">
    <!-- 头部导航栏 -->
    <myHeader ref="myHeader" @showShare="showShareFn" :header="header"></myHeader>
    <!-- 活动上部图片 -->
    <div class="actImg bgImg_gray">
      <img :src="IMG">
    </div>
    <!-- 活动商品 -->
    <div class="H_hotSales clearfix">
      <div v-for="(item,index) in productList" :key="item.Id">
        <myHotSale v-model="productList[index]"></myHotSale>
      </div>
    </div>
    <!-- 活动底部图片 -->
    <div class="actImg bgImg_gray">
      <img :src="BIMG">
    </div>
    <!-- 分享按钮指引 -->
    <div v-show="showHideOnBlur">
      <div class="my_msk" @click.stop="showHideOnBlur = false">
        <div class="my_imgBox" @click.stop="showHideOnBlur = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HotSale from "../Home/HotSale";
import HeaderBack from '../Common/HeaderBack'
export default {
  name: 'actDetail',
  components: {
    myHeader: HeaderBack,
    myHotSale: HotSale ,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"", 
        HBR_icon: "icon_share",
        HBR_type: 'share',
        HBR_show: true,
      },
      NAME: 'Look Activity',
      IMG:  require('../../assets/images/home/activity_02.png'),
      BIMG: require('../../assets/images/home/activity_01.png'),
      DESCRIPTION: '好便宜啊,大家都来看看!!!',
      // 热卖商品数据
      productList:[],

      showHideOnBlur: false,
    }
  },
  methods: {
    goToAll () {
      this.$router.push({path: '/mainpage/all'});
    },
    showShareFn () {
      this.showHideOnBlur = true;
    },
  },
  created () {
    let id = this.$route.params.activityId;
    let allGoods = this.$store.state.allGoods;
    // 数据加载 
    comTools.showLoading(this);
    setTimeout(() => {
      allGoods.forEach((ele,i) => {
        if (i > 7)
          return
        this.productList.push(ele);
      });
      // 改变主题
      this.$refs.myHeader.changeText('HBC_text',this.NAME)
      // 数据加载 结束
      comTools.hideLoading(this);
    }, 500)
  }
}
</script>

<style scoped>
.actDetail {
  padding-top: 0.75rem;
}

.H_hotSales {
  width: 100%;
  padding-bottom: .2rem;
}
.H_lookAll {
  color: #999;
  margin-bottom: .3rem;
}
.actImg {
  width: 100%;
  min-height:2rem; 
}
.actImg img {
  width: 100%;
  min-height:2rem; 
  max-height: 3rem;
}
.my_imgBox {
  background-image: url('../../assets/images/share.png');
}

</style>
