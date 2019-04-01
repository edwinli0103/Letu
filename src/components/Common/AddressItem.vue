<template>
    <div class="bg_white modal" :value="value">
      <div class="pad_2f" @click="goToWhereFn">
        <div class="fx addrBox">
          <div class="fx_1">收货人：{{selData.name}}</div>
          <div class="fx_1 txt_r">{{selData.tel}}</div>
        </div>
        <div class="fx addrTxt">
          <div class="fx_1">{{selData.addr}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'addressitem',
  props:['value'],
  data () {
    return {
      selData:{
        id: this.value.id,
        name: this.value.name,
        tel: this.value.tel,
        addr: this.value.addr,
      },
    }
  },
  methods: {
    goToWhereFn () {
      let goToType = this.$store.state.goToType;
      if(goToType === 'setAddress') {
        let addressObj = {
          acceptName: this.value.name,
          address0: this.value.addressValueDetail,
          areas: this.value.addressValue,
          id: this.value.id,
          mobile: this.value.tel,
          postcode: this.value.postcode,
        }
        this.$store.commit('setData',{key:'addressObj',value: addressObj});
        this.$router.go(-1);
      }
    }
  },
  watch:{
    
  }
}
</script>

<style scoped>
.modal{

}
.addrBox{

}
.addrTxt{
  padding-top: .1rem;
  line-height: 1.2;
  color: #999999;
}
.editImage{
  background: url("../../assets/images/mine/edit.png") no-repeat .2rem center;
  background-size: 0.3rem 0.3rem;
}
.detImage{
  background: url("../../assets/images/mine/delete.png") no-repeat .2rem center;
  background-size: 0.3rem 0.3rem;
}
</style>
