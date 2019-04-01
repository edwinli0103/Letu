<template>
  <div class="register bg_white font_28">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 中间部分 -->
    <div class="Reg_c box_pad3 col_9">
      <div class="fx">
        <div class="fx_5">
          <x-input title="手机号" mask="999 9999 9999" v-model="telPhoneNum" :max="13" is-type="china-mobile" placeholder="请输入..." ref="pInput"></x-input>
        </div>
        <div class="fx_2 txt_c act_but1 font_26" :class="{'canSend':!canSend}" @click="getCodeFn">
          {{canSend ? '获取验证码' : '('+sendNum +'s)后获取'}}
        </div>
      </div>
      <div class="fx">
        <div class="fx_1">动态码:</div>
        <div class="fx_5">
          <input type="text" v-model="phoneCode" value="phoneCode" placeholder="请输入...">
        </div>
      </div>      
    </div>    
    <div class="act_but txt_c font_30 color_white" @click="submitFn">确 &nbsp;定 </div>
  </div>
</template>

<script>

import { XInput } from 'vux'
import HeaderBack from '../Common/HeaderBack'

export default {
  name: 'register',
  components: {
    myHeader: HeaderBack,
    XInput,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"手机验证", 
        HBR_icon: " ",
      },
      telPhoneNum: '',
      phoneCode: '',
      canSend: true,
      sendNum: 60,
    }
  },
  computed:{
    
  },
  methods: {
    getCodeFn() {
      if (this.canSend) {
        // 手机号码是否为空
        if (!this.telPhoneNum) {
          this.$vux.toast.text('请输入手机号码...', 'success');
          return;
        }
        // 判断验证是否通过
        let valide = this.$refs.pInput.valid;
        if (!valide) {
          this.$vux.toast.show('输入的号码有误...', 'success');
          return;
        }
        this.canSend = false;
        let telPhoneNum = this.telPhoneNum.replace(/\s+/g,"");
        this.$http.get("/weixin/phone/sendNumber", { phone: telPhoneNum })
          .then((data) => {
            if (data === 'success') {
              let self = this;
              this.$vux.toast.show('发送成功...','success');
              let sendTimer = setInterval(function () {
                self.sendNum -= 1;
                if (self.sendNum === 0) {
                  self.sendNum = 60;
                  self.canSend = true;
                  clearInterval(sendTimer);
                }
              }, 1000);
            } else {             
              this.canSend = true;
            }
          })
      }
    },
    submitFn() {
      if (!this.telPhoneNum) {
        this.$vux.toast.text('请输入手机号码...','top');
        return;
      } else if (!this.phoneCode) {
        this.$vux.toast.text('请输入验证码...','top');
        return;
      } else {
        let telPhoneNum = this.telPhoneNum.replace(/\s+/g,"");
        this.$http.post("/weixin/phone/bindSave", { phone: telPhoneNum, number: this.phoneCode })
          .then((data) => {
            if(!data.success){
              this.$vux.toast.show({
                type:'warn',
                text:'验证失败...',
              });
            } else {
              this.$router.go(-1);
            };
          })
      }
      
    }
  },
  watch: {
    header:{
      handler: function (newVal, oldVaal) {
       
      },
      deep: true
    }
  }
}
</script>

<style>
.weui-icon-clear:before {
  margin-left: .1rem !important;
  margin-right: .4rem !important;
}
.weui-icon-warn:before{
  margin-left: -0.2rem !important;
  margin-right: 0.1rem !important;
}
</style>
<style scoped>
/* 清除vux的样式 */
.weui-cell {
  padding: 0;
}

.register {
  height: 10rem;
  padding-top: 0.75rem;
  padding-bottom: 0.5rem;
}
.Reg_c>div{
  padding: 0.3rem 0; 
  border-bottom: 1px solid #f3f3f3;
}
.Reg_c input{
  color: #999;
  font-size: 0.28rem;
  padding-left: 0.1rem; 
}
.act_but1 {
  color: #FFF;
  border-radius: 0.1rem;
  background-color: #18A6AA;
}
.canSend {
  background-color: #eee;
}
.act_but {
  width: 90%;
  margin: 1rem auto;
  padding: 0.2rem 0;
  border-radius: 0.1rem;
  background-color: #18A6AA;
}

</style>
