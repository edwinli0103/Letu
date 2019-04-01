<template>
    <div class="orderlist">
      <myHeader ref="myHeader" :header="header"></myHeader>
      <div class="">
        <img :src="imgUrl" alt="">
      </div>
    
    </div>
  </template>
  
  <script>
  import HeaderBack from '../Common/HeaderBack'
  export default {
    components: {
      myHeader: HeaderBack,
    },
    data () {
      return {
        header: {
          HBL_icon:"icon_back",
          HBL_type: 'orderList',
          HBC_text:"我的检测单",
          HBR_icon: "icon_edit",
          HBR_show: false,
        },
        imgUrl: require('../../assets/images/mine/timg.jpg')
      }
    },
    methods: {
       
    },
    created() {
      
    }, 
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
 
  </style>