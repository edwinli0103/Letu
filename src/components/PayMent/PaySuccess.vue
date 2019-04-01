<template>
  <div class="paySuccess bg_white" ref="paySuccess">
    <msg :title="title" 
    :description="description" 
    :buttons="buttons" 
    :icon="icon"></msg>
  </div>
</template>

<script>

import { Msg } from 'vux'

export default {
  components: {
    Msg
  },
  data () {
    return {
      id:'',
      icon: 'success',
      title: '支付成功!',
      description: '您的订单已经支付成功,请及时查看...',
      buttons: [{
        type: 'primary',
        text: '查看订单详情',
        onClick: this.changeIcon.bind(this)
      }, {
        type: 'default',
        text: '返回首页',
        link: '/'
      }]
    }
  },
  methods: {
    changeIcon () {
      this.$router.push({path:"/mainpage/self/orderdetail/" + this.id});
    },
  }, 
  created () {
    let type = this.$route.params.type;
    this.icon = type;
    if(type === 'fail') {
      this.icon = 'warn';
      this.title = '支付失败!';
      this.description = '您的订单支付失败,请查看余额是否充足...';
    }
    this.id = this.$route.params.orderID;
    
  },
  mounted () {
    let d = this.$refs.paySuccess;
    comTools.resetHeight(d,0);
  },
}
</script>

<style scoped>

</style>