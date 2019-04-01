<template>
  <div class="H_addButtonBox bg_white col_main pad_2">
    <div class="H_addButton" @click="handleH()">{{H_msg}}</div>
  </div>   
</template>

<script>
export default {
  name: 'addbutton',
  props: ['addbutton'],
  data () {
    return {
      H_msg: this.addbutton.H_msg,
      H_type: this.addbutton.H_type,
    }
  },
  methods: {
    ajaxReq() {
      
    },
    handleH(){
      if (this.H_type === 'address') {
        // 新增地址
        this.$router.push({path:"/mainpage/self/addaddress"});
      }else if (this.H_type === 'person') {
        // 新增检测人
        this.$router.push({path: '/mainpage/self/addperson'});
      }
    }
  }
}
</script>

<style scoped>
.H_addButtonBox {
}
.H_addButton {
  background: url("../../assets/images/mine/jian-right.png") no-repeat right center;
  background-size: 0.15rem 0.25rem;
}
</style>
