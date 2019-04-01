<template>
  <div class="coupon">
    <!-- 头部 -->
    <myHeader :header="header"></myHeader>
    <!-- tab栏 -->
    <!-- 每一个 tab 绑定了一个点击事件，传入的参数对应着 tab 下的组件名 -->
    <div class="fx padlr_2e bg_white col_6 font_24 tabs">
      <div class="fx_1 txt_c tab" :class="{selected:currentTab=='CouponNotUsed'}" 
      @click="toggleTab('CouponNotUsed')">未使用</div>
      <div class="fx_1 txt_c tab" :class="{selected:currentTab=='CouponUsed'}" 
      @click="toggleTab('CouponUsed')">已使用</div>
      <div class="fx_1 txt_c tab" :class="{selected:currentTab=='CouponOverdue'}" 
      @click="toggleTab('CouponOverdue')">已过期</div>
    </div>
    <!-- 优惠券列表区 -->
    <!-- 子组件，显示不同的 tab -->
    <!-- is 特性动态绑定子组件 -->
    <!-- keep-alive 将切换出去的组件保留在内存中 -->
    <!-- 未使用优惠券部分 -->
    <div v-show="currentTab=='CouponNotUsed'">
      <!-- 列表为空 -->
      <div class="empty txt_c" v-show="notUsedIsEmpty">
        您没有未使用的优惠券哦~
      </div>
      <!-- 列表非空 -->
      <div v-for="(couponItem,index) in couponItems" :key="couponItem.id">
        <CouponNotUsed :is="currentTab" keep-alive v-model="couponItems[index]"></CouponNotUsed>
      </div>
    </div>
    <!-- 已使用优惠券部分 -->
    <div v-show="currentTab=='CouponUsed'">
      <!-- 列表为空 -->
      <div class="empty txt_c" v-show="usedIsEmpty">
        您没有已使用的优惠券哦~
      </div>
      <!-- 列表非空 -->
      <div v-for="(couponItem1,index) in couponItems1" :key="couponItem1.id">
        <CouponNotUsed :is="currentTab" keep-alive v-model="couponItems1[index]"></CouponNotUsed>
      </div>
    </div>
    <!-- 已过期优惠券部分 -->
    <div v-show="currentTab=='CouponOverdue'">
      <!-- 列表为空 -->
      <div class="empty txt_c" v-show="overdueIsEmpty">
        您没有已过期的优惠券哦~
      </div>
      <!-- 列表非空 -->
      <div v-for="(couponItem2,index) in couponItems2" :key="couponItem2.id">
        <CouponNotUsed :is="currentTab" keep-alive v-model="couponItems2[index]"></CouponNotUsed>
      </div>
    </div>
  </div>
</template>

<script>
// 引入子组件
import HeaderBack from '../Common/HeaderBack';
import CouponNotUsed from '../Common/CouponNotUsed';
import CouponUsed from '../Common/CouponUsed';
import CouponOverdue from '../Common/CouponOverdue';

export default {
  components: { // 声明子组件
    myHeader: HeaderBack,
    CouponNotUsed,
    CouponUsed,
    CouponOverdue,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"我的优惠券",
        HBR_icon: "",
        HBR_show: true,
        HBR_type: "couponexplain",
        HBR_show_long:true,
        HBR_text_long:"使用规则",
      },
      currentTab: 'CouponNotUsed',// currentTab 用于标识当前触发的子组件
      couponItems:[],
      couponItems1:[],
      couponItems2:[],
      notUsedIsEmpty:false,
      usedIsEmpty:false,
      overdueIsEmpty:false,
    }
  },
  methods: {
    toggleTab: function(name) {
      this.currentTab = name; // name 为当前触发标签页的组件名
    },
    ajax(){
      // mock数据
      var data = {
        weishiyong:[
          {id:'111',momey:'50',coupon:"50元优惠券",couponMsg:"无门槛使用",couponStart:"2017.01.01",couponEnd:'2017.02.01'},
          {id:'222',momey:'100',coupon:"100元优惠券",couponMsg:"满500减100",couponStart:"2017.01.02",couponEnd:'2017.02.02'},
          {id:'333',momey:'200',coupon:"200元优惠券",couponMsg:"满1000减200",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
          {id:'444',momey:'500',coupon:"500元优惠券",couponMsg:"满2000减500",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
        ],
        yishiyong:[
          {id:'111',momey:'50',coupon:"50元优惠券",couponMsg:"无门槛使用",couponStart:"2017.01.01",couponEnd:'2017.02.01'},
          {id:'222',momey:'100',coupon:"100元优惠券",couponMsg:"满500减100",couponStart:"2017.01.02",couponEnd:'2017.02.02'},
          {id:'333',momey:'200',coupon:"200元优惠券",couponMsg:"满1000减200",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
          {id:'444',momey:'500',coupon:"500元优惠券",couponMsg:"满2000减500",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
        ],
        yiguoqi:[
          {id:'111',momey:'50',coupon:"50元优惠券",couponMsg:"无门槛使用",couponStart:"2017.01.01",couponEnd:'2017.02.01'},
          {id:'222',momey:'100',coupon:"100元优惠券",couponMsg:"满500减100",couponStart:"2017.01.02",couponEnd:'2017.02.02'},
          {id:'333',momey:'200',coupon:"200元优惠券",couponMsg:"满1000减200",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
          {id:'444',momey:'500',coupon:"500元优惠券",couponMsg:"满2000减500",couponStart:"2017.01.03",couponEnd:'2017.02.03'},
        ]
      }

      if(JSON.stringify(data.weishiyong)=='[]'){
        this.notUsedIsEmpty = true;
      } else {
        this.couponItems = data.weishiyong;
      }

      if(JSON.stringify(data.yishiyong)=='[]'){
        this.usedIsEmpty = true;
      } else {
        this.couponItems1 = data.yishiyong;
      }

      if(JSON.stringify(data.yiguoqi)=='[]'){
        this.overdueIsEmpty = true;
      } else {
        this.couponItems2 = data.yiguoqi;
      }
    }
  },
  created () {
    this.ajax();
  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.coupon{
  padding-top: .75rem;
}
.tab{
  line-height: .64rem;
}
.selected{
  color: #18A6AA;
  border-bottom: 2px solid #18A6AA;
}
.empty{
  height: 6rem;
  line-height: 6rem;
}
</style>