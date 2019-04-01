<template>
  <div>
    <myHeader :header="header" @sendAddr='sendAddrFn'></myHeader>
    <div class="add_main">
      <group label-width="4.5em" label-margin-right="1.75em" label-align="left">
        <x-input title="收货人" placeholder="请输入姓名" v-model="name"></x-input>
        <checker v-model="sex" default-item-class="sex-item" selected-item-class="sex-item-selected">
          <checker-item value="先生">先生</checker-item>
          <checker-item value="女士">女士</checker-item>
        </checker>
        <x-input title="手机号码" placeholder="请输入手机号码" v-model="tel"></x-input>
        <x-address title="所在地区" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
        <x-textarea title="详细地址" placeholder="请输入乡镇、街道、楼牌号" :show-counter="false" :rows="3" v-model="addressValueDetail"></x-textarea>
        <x-input title="邮编" placeholder="请输入邮编" v-model="postcode"></x-input>
      </group>
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import { Group, Checker, CheckerItem, XInput, ChinaAddressData, XAddress, XTextarea , Value2nameFilter as value2name} from 'vux'

export default {
  components: {
    myHeader: HeaderBack,
    Group,
    Checker,
    CheckerItem,
    XInput,
    XAddress,
    XTextarea,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"添加地址",
        HBR_icon: " ",
        HBR_show: true,
        HBR_type: "addaddress",
        HBR_show_long:true,
        HBR_text_long:"保存",
      },
      name: '',
      sex: '先生',
      tel: '',     
      addressData: ChinaAddressData,
      addressValue: ['北京市', '市辖区', '朝阳区'],
      addressValueDetail: '',
      postcode: '',
    }
  },
  methods: {
    sendAddrFn() {
      let regName=/^[a-zA-Z\u4E00-\u9FA5]+$/; 
      let regTel = /^1[3|4|5|7|8][0-9]{9}$/;
      let addrData = {
        acceptName:this.name,
        mobile:this.tel,
        gender:this.sex,
        areas:this.addressValue,
        address0:this.addressValueDetail,
        postcode:this.postcode
      }
      if(!regName.test(this.name)){
        this.$vux.toast.show({
          type:'cancel',
          text:'亲，收货人姓名填写有误哦~',
          width: '16em'
        });
      } else if(!regTel.test(this.tel)) {
        this.$vux.toast.show({
          type:'cancel',
          text:'亲，收货人电话填写有误哦~',
          width: '16em'
        });
      } else {
        // 开始动画
        comTools.showLoading(this, '保存中...');
        setTimeout((data) => {
          // 结束动画
          comTools.hideLoading(this);
          if(true){
            this.$vux.toast.show({
              type:'success',
              text:'保存成功~',
              width: '7.5em'
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 3000)
          }
        })
      }     
    },
    getAddressName () {
      let addressValue = this.addressValue;
      return value2name(addressValue, ChinaAddressData);
    },
  },
}
</script>

<style>
.add_main .weui-cells{
  margin-top: 0 !important;
  font-size: .28rem !important;
}
.add_main .weui-cell{
  padding: .2rem !important;
}
.add_main .weui-cell:before,.vux-cell-box:before{
  left: 0 !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_main{
  padding-top: .85rem;
  font-size: .28rem;
}
.vux-checker-box{
  border-top: 1px solid #E6E6E6;
  padding: .2rem 0 .2rem 1.95rem;
}
.sex-item {
  width: 1rem;
  height: .35rem;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 5px;
  line-height: .35rem;
  text-align: center;
  margin-right: .5rem;
}
.sex-item-selected {
  border-color: #18A6AA;
}
</style>