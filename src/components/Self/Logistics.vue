<template>
  <div class="logistics_main" ref="logisticsPage">
    <myHeader ref="myHeader" :header="header"></myHeader>
    <myLogisticsNum v-model="proList"></myLogisticsNum>
    <timeline>
      <timeline-item v-for="(i, index) in count" :key="index">
          <h4 :class="[i === 1 ? 'col_main' : '']">运输状态：{{i}}</h4>
          <p :class="[i === 1 ? 'col_main' : '']">更新时间：{{i}}</p>
      </timeline-item>
    </timeline>   
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import LogisticsNum from '../Common/LogisticsNum'
import { Timeline, TimelineItem} from 'vux'

export default {
  name: 'logistics',
  components: {
    myHeader: HeaderBack,
    myLogisticsNum: LogisticsNum,
    Timeline,
    TimelineItem,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"物流详情",
        HBR_icon:"icon_edit",
        HBR_show: false,
      },      
      proList: [],
      count: 8,
    }
  },
  methods: {

  },
  created() {
    let ordObj = this.$store.state.orderObj;
    let orderId = ordObj.orderId;
    this.proList = ordObj.productList;
    console.log(ordObj);
    // ajax请求
    // this.$http.post('/', {}).then((data) => {
    //   console.log(data);
    // })
  },
  mounted() {
    let d = this.$refs.logisticsPage;
    comTools.resetHeight(d, 0);
  },
}
</script>

<style>
.logistics_main .vux-timeline{
  padding: .4rem .3rem !important;
  background-color: #ffffff;
}
.logistics_main .vux-timeline-item-content{
  padding: 0 0 .8rem .8rem !important;
}
.logistics_main .vux-timeline-item-color{
  background-color: #18A5A9 !important;
}
.logistics_main .vux-timeline-item-tail{
  background-color: #18A5A9 !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logistics_main{
  padding-top: .75rem;
  background: #ffffff;
}
</style>
