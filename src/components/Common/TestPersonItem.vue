<template>
    <div class="bg_white modal" :value="value">
      <div class="pad_2f">
        <div class="fx addrBox">
          <div class="fx_1">检测人：{{selData.name}}</div>
          <div class="fx_1 txt_r">{{selData.mobile}}</div>
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
        mobile: this.value.mobile,
        addr: this.value.addressValue.join("") + this.value.address,
      },
    }
  },
  methods: {
    
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
