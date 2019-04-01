<template>
  <div class="onlineQuery">
    <myHeader :header="header"></myHeader>
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
        HBC_text:"在线查询",
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
  .onlineQuery{
    padding-top: .75rem;
  }
</style>