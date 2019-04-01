<template>
  <div>
    <myHeader :header="header" @sendPerson='sendPersonFn'></myHeader>
    <div class="addPerson_main">
      <group label-width="5.5em" label-margin-right="1.75em" label-align="left">
        <x-input title="<span style='color:red;padding-right:.24rem;'>*</span>姓名" placeholder="请输入姓名" v-model="testPerson.name"></x-input>
        <checker v-model="testPerson.sex" default-item-class="check-item" selected-item-class="check-item-selected">
          <span class="check_title"><span style='color:red;padding-right:.24rem;'>*</span>性别</span>
          <checker-item value="男">男</checker-item>
          <checker-item value="女">女</checker-item>
        </checker>
        <checker v-model="testPerson.iszz" default-item-class="check-item" selected-item-class="check-item-selected">
          <span class="check_title"><span style='color:red;padding-right:.24rem;'>*</span>纸质报告</span>
          <checker-item value="是">是</checker-item>
          <checker-item value="否">否</checker-item>
        </checker>
        <datetime title="<span style='color:red;padding-right:.24rem;'>*</span>出生年月" placeholder="请选择" v-model="testPerson.birthday" value-text-align="left" :min-year=1900></datetime>
        <x-input title="<span style='padding-right:.36rem;'></span>身高(cm)" placeholder="请输入身高" v-model="testPerson.height"></x-input>
        <x-input title="<span style='padding-right:.36rem;'></span>体重(kg)" placeholder="请输入体重" v-model="testPerson.weight"></x-input>
        <x-input title="<span style='color:red;padding-right:.24rem;'>*</span>手机号码" placeholder="请输入手机号码" v-model="testPerson.mobile"></x-input>
        <x-address title="<span style='color:red;padding-right:.24rem;'>*</span>地址" v-model="testPerson.addressValue" raw-value :list="addressData" value-text-align="left" placeholder="请选择"></x-address>
        <x-textarea title="<span style='padding-right:.36rem;'></span>街道" placeholder="请输入乡镇、街道、楼牌号" :show-counter="false" :rows="3" v-model="testPerson.address"></x-textarea>
        <popup-picker title="<span style='padding-right:.36rem;'></span>教育程度" :data="educationlist" v-model="testPerson.education" value-text-align="left" placeholder="请选择"></popup-picker>
      </group>
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import { Group, Checker, CheckerItem, Datetime, XInput, ChinaAddressData, XAddress, XTextarea, PopupPicker, } from 'vux'

export default {
  components: {
    myHeader: HeaderBack,
    Group,
    Checker,
    CheckerItem,
    Datetime,
    XInput,
    XAddress,
    XTextarea,
    PopupPicker,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"修改检测人",
        HBR_icon: " ",
        HBR_show: true,
        HBR_type: "addperson",
        HBR_show_long:true,
        HBR_text_long:"保存",
      },
      testPerson: {
        id: '',
        name: '',
        sex: '',
        iszz: '',
        birthday: '',
        height: '',
        weight: '',
        mobile: '',
        addressValue: [],
        address: '',
        education: [],
      },
      addressData: ChinaAddressData,
      educationlist: [['未上学', '小学', '初中', '高中', '大专', '大学', '硕士', '博士']],
    }
  },
  methods: {
    sendPersonFn() {
      let personData = this.testPerson;     
      let regName = /^[a-zA-Z\u4E00-\u9FA5]+$/;
      let regTel = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!regName.test(personData.name)) {
        this.$vux.toast.show({
          type: 'cancel',
          text: '亲，检测人姓名填写有误哦~',
          width: '16em'
        });
      } else if (!regTel.test(personData.mobile)) {
        this.$vux.toast.show({
          type: 'cancel',
          text: '亲，检测人电话填写有误哦~',
          width: '16em'
        });
      } else {
        // 开始动画
        comTools.showLoading(this, '修改中...');
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(this);
            if (true) {
              this.$vux.toast.show({
                type: 'success',
                text: '修改成功~',
                width: '7.5em'
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 3000)
            }
          }, 500)
      }
    }
  },
  created () {
    let perObj = this.$store.state.testPersonObj;
    console.log(this.$store.state.testPersonObj);
    this.testPerson = perObj;
  }
}
</script>

<style>
.addPerson_main .weui-cells{
  margin-top: 0 !important;
  font-size: .28rem !important;
}
.addPerson_main .weui-cell{
  padding: .2rem !important;
}
.addPerson_main .weui-cell:before,.vux-cell-box:before{
  left: 0 !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addPerson_main{
  padding-top: .85rem;
  font-size: .28rem;
}
.vux-checker-box{
  border-top: 1px solid #E6E6E6;
  padding: .2rem;
}
.check-item {
  width: 1rem;
  height: .35rem;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 5px;
  line-height: .35rem;
  text-align: center;
}
.check-item-selected {
  color: #fff;
  background-color: #18A6AA;
  /* border-color: #18A6AA; */
}
.check_title{
  display: inline-block;
  width: 1.95rem;
}
</style>