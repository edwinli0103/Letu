<template>
  <div class="useBox">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 中间部分 -->
    <div class="boxNum bg_white font_28 col_3">
      <span>激活码</span>
      <input type="text" value='' placeholder='请输入激活码...' v-model="boxNum" :readonly="actSure" />
    </div>

    <div class="act_but txt_c font_30 color_white" @click="actBtnFn">{{actSure ? '确认激活':'激&nbsp;活' }}</div>
    

  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
export default {
  name: 'useBox',
  components: {
    myHeader: HeaderBack,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"盒子激活", 
        HBR_icon: " ",
      },
      boxNum: '',
      actSure: false,
    }
  },
  methods: {
    actBtnFn() {
      this.actSure = true;
      alert("确定激活")
    }
  }
}
</script>

<style scoped>
.useBox {
  padding-top: 0.9rem;
  padding-bottom: 1rem;
}
.boxNum {
  padding: 0.3rem 0rem 0.3rem 0.2rem;  
}
.boxNum input{
  padding-left: 0.3rem; 
  font-size: 0.28rem;  
}
.act_but {
  width: 90%;
  margin: 0.5rem auto;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  background-color: #18A6AA;
}
 
</style>
