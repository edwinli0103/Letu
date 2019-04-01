<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate () {
    comTools.directRightUrl();
  },
}
</script>

<style lang="less">
@import './assets/css/base.css';
@import '~vux/src/styles/reset.less';

body {
  background-color: #EFEFEF;
  color:#333;
}
</style>
