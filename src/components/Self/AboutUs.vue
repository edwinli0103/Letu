<template>
  <div>
    <myHeader :header="header"></myHeader>
    <div class="about_us pos-absolute"></div>
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
        HBC_text:"关于我们",
        HBR_icon: " ",
      },
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about_us{
  top: .75rem;
  bottom: 0;
  width: 100%;
  height: auto;
  background: url(../../assets/images/mine/aboutwe.jpg) no-repeat center;
  background-size: 100% 100%;
}
</style>