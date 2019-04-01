<template>
  <div class="help">
    <myHeader :header="header"></myHeader>
    <group>
      <div class="server_tel"><a href="tel:18616715025">客服电话：18616715025</a></div>
      <cell title="常见问题" value="" is-link link="/mainpage/self/question"></cell>
      <cell title="关于我们" value="" is-link link="/mainpage/self/aboutus"></cell>
    </group>
    <div class="exit bg_white" @click="signOut">退出当前账号</div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import { Group, Cell, CellBox } from 'vux'

export default {
  components: {
    myHeader: HeaderBack,
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"帮助中心",
        HBR_icon: " ",
      },
    }
  },
  methods: {
    signOut() {
      this.$vux.toast.show({
        type:'warn',
        text:'不能退出,就是这么强硬',
        width: '16.5em'
      });
    }
  }
}
</script>

<style>
/* vux-cell-box 组件样式重置*/
.help .weui-cells{
  font-size: .28rem !important;
  margin-top: 0 !important;
}
.help .weui-cells:before{
  border-top: 0 !important;
}
.help .weui-cell:before{
  left: 0 !important;
}
.help .weui-cell{
  padding: .28rem .4rem !important;
}
.help .weui-cell_access .weui-cell__ft:after{
  height: 8px !important;
  width: 8px !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help{
  padding-top: .95rem;
}
.server_tel{
  width: 100%;
  font-size: .28rem;
  padding: .28rem .4rem;
}
.exit{
  width: 100%;
  font-size: .28rem;
  margin-top: .2rem;
  padding: .28rem 0;  
  text-align: center;
}
</style>