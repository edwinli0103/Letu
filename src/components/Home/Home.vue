<template>
  <!-- 头部 -->
  <div class="home">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 轮播图 -->
    <div class="H_swiper">
      <swiper
      loop auto 
      :list="slideShow" 
      :aspect-ratio="9/16"
      @on-index-change="onIndexChange"
      style="width:100%;margin:0 auto;" >
      </swiper>
    </div>
    <!-- 分类产品 -->
    <myHomeCell :cellData="catgoryData"></myHomeCell> 
    <div class="H_catgorys">
      <myCatgory v-model="activityList"></myCatgory>
    </div>
    <!-- 商城热卖 -->
    <myHomeCell :cellData="hotData"></myHomeCell> 
    <div class="H_hotSales clearfix">
      <myHotSale v-for="(item,index) in hotSaleData"  v-model="hotSaleData[index]" :key="item.ID"></myHotSale>
    </div>
    <!-- 查看全部商品按钮 -->
    <div class="H_lookAll txt_c font_28" @click="goToAll()">点击查看全部商品 >> </div>
  </div>
 
  
</template>

<script>
import Header from "../Common/Header";
import { Swiper } from "vux";
import Catgory from "../Common/Catgory";
import HotSale from "./HotSale";
import HomeCell from "./HomeCell";
export default {
  name: "home",
  components: {
    myHeader: Header,
    myCatgory: Catgory,
    myHotSale: HotSale,
    myHomeCell: HomeCell,
    Swiper,    
  },
  data() {
    return {
      // 头部数据
      header: {   
        HL_icon: "icon_scanner",
        HL_text: "扫一扫",
        HL_type: "scan",
        HC_text: "萌萌萌宠PARTY",
        HR_icon: "icon_search",
        HR_text: "激活",
        HR_type: "usebox",
      },
       // 萌萌推荐 cell
      catgoryData:{
        Text_l: "萌萌推荐活动系列",
        Text_r: "更多",
        type:"/mainpage/home/allActivity"
      },
      // 热卖商品 clell
      hotData: {
        Text_l: "萌萌亲情热卖",
        Text_r: "更多",
        type: "/moreHot/hot"
      },
      // 轮播图数据
      slideShow:[],
      // 萌萌推荐活动
      activityList:[
        { 
          ACTIVITY_ID: '', 
          BIMG: '',
          IMG: '', 
          NAME: '',
          TYPE: ''
        },
        { 
          ACTIVITY_ID: '', 
          BIMG: '',
          IMG: '', 
          NAME: '',
          TYPE: ''
        },
        { 
          ACTIVITY_ID: '', 
          BIMG: '',
          IMG: '', 
          NAME: '',
          TYPE: ''
        },
      ],
      // 热卖商品数据
      hotSaleData:[],
      dataModel: {
        slideShow: [
          {
            url: "/mainpage/home/allActivity/actDetail/0001",
            img: require('../../assets/images/home/swiper1.png'),
            title: "number one",
            activityId:"0001"
          },
          {
            url: "/mainpage/home/allActivity/actDetail/0002",
            img: require('../../assets/images/home/swiper2.png'),
            title: "number two",
            activityId:"0002"
          },
          {
            url: "/mainpage/home/allActivity/actDetail/0003",
            img: require('../../assets/images/home/swiper3.png'),
            title: "number three",
            activityId:"0003",
            fallbackImg: require('../../assets/images/home/swiper1.png')
          },
        ],
        activityList: [
          { 
            ACTIVITY_ID: "00001", 
            BIMG: require('../../assets/images/home/activity_01.png'),
            IMG: require('../../assets/images/home/activity_01.png'), 
            NAME: "第一个活动",
            TYPE: ""
          },
          { 
            ACTIVITY_ID: "00002", 
            BIMG: require('../../assets/images/home/activity_02.png'), 
            IMG: require('../../assets/images/home/activity_02.png'), 
            NAME: "第二个活动", 
            TYPE: "" 
          },
          { 
            ACTIVITY_ID: "00003", 
            BIMG: require('../../assets/images/home/activity_03.png'), 
            IMG: require('../../assets/images/home/activity_03.png'), 
            NAME: "第三个活动", 
            TYPE: "" 
          }
        ]
      },
    };
  },
  methods: {
    onIndexChange (index) {
      let id = this.slideShow[index].activityId;
      this.$store.commit('setId',{key:'slideShowId',value:id});
    },
    goToAll () {
      this.$router.push({path: '/mainpage/all'});
    }
  },
  created () {
    // 数据加载 
    comTools.showLoading(this);
    this.hotSaleData = [];
    let data = this.dataModel, self = this; 
    let allGoods = this.$store.state.allGoods;
    setTimeout(() => {          
      // 轮播图处理
      self.slideShow = data.slideShow;
      // 活动页面处理
      self.activityList = data.activityList;
      // 热卖商品处理
      allGoods.forEach((ele,i) => {
        if (i > 7)
          return
        self.hotSaleData.push(ele);
      });     
      // 活动id保存
      let actId = self.slideShow[0].activityId;
      self.$store.commit('setId',{key:'slideShowId',value:actId});
      // 数据加载 结束
      comTools.hideLoading(self);
    }, 500);
  },
  mounted () {
  },
  beforeDestroy () {
  }
};
</script>

<style scoped>
.H_swiper {
  margin-bottom: 0.1rem;
} 
.H_hotSales {
  width: 100%;
  padding-bottom: .2rem;
}
.H_lookAll {
  color: #999;
  margin-bottom: .3rem;
}

/* swiper style */
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}

</style>
