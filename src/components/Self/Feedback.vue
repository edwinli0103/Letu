<template>
  <div class="feedBack" ref="feedBackPage">
    <myHeader :header="header"></myHeader>
    <div class="box">
      <p>您的批评和建议能帮助我们更好完善萌萌商城，请留下您的宝贵意见！</p>
      <checker v-model="opinion" default-item-class="opinion-item" selected-item-class="opinion-item-selected">
        <checker-item value="商品种类">{{ ('商品种类') }}</checker-item>
        <checker-item value="商品品质">{{ ('商品品质') }}</checker-item>
        <checker-item value="软件功能">{{ ('软件功能') }}</checker-item>
        <checker-item value="促销活动">{{ ('促销活动') }}</checker-item>
        <checker-item value="配送服务">{{ ('配送服务') }}</checker-item>
        <checker-item value="其它问题">{{ ('其它问题') }}</checker-item>
      </checker>
      <textarea v-model="feedBackText" name="" id="" cols="" rows="10" placeholder="请输入宝贵意见（300字以内）">
      </textarea>
      <button class="submit" @click="sendFeedback">提交</button>
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import { Checker, CheckerItem, XTextarea, Group, XButton } from 'vux'

export default {
  components: {
    myHeader: HeaderBack,
    Checker,
    CheckerItem,
    XTextarea,
    Group,
    XButton,
  },
  data () {
    return {
      header: {
        HBL_icon: "icon_back",
        HBC_text: "意见反馈",
        HBR_icon: " ",
      },
      opinion: '',
      feedBackText: '',
    }
  },
  methods: {
    sendFeedback() {
      let sendObj = {
        type: this.opinion,
        text: this.feedBackText,
      }
      this.$vux.toast.show({
        type:'success',
        text:'提交成功...',
        width: '7.5em'
      });
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000)
    }
  },
  mounted() {
    let d = this.$refs.feedBackPage;
    comTools.resetHeight(d, 0.75);
  },
}
</script>

<style>
  /* vux-checker组件样式重置 */
  .feedBack .vux-checker-item.opinion-item {
    display: inline-block;
    width: 1.9rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    margin-bottom: .2rem;
    color: #999;
    border: 1px solid #e5e5e5;
    border-radius: .3rem;
  }
  .feedBack .vux-checker-item.opinion-item.opinion-item-selected {
    color: #fff;
    background-color: #18A6AA;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .feedBack {
    padding-top: .75rem;
    background-color: #ffffff;
  }
  .box {
    padding: .5rem .2rem 0;
  }
  .box>p {
    margin-bottom: .5rem;
  }
  .submit {
    width: 100%;
    height: .75rem;
    line-height: .75rem;
    margin-top: .8rem;
    font-size: .3rem;
    font-weight: 600;
    background-color: #18A6AA;
    color: #fff;
    border-width: 0;
    border-radius: 5px;
    outline: 0;
    -webkit-appearance: none;
  }
  textarea {
    resize:none;
    box-sizing: border-box;
    width: 100%;
    padding: .16rem;
    outline:none;
    background-color: #f1f1f1;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  } 
</style>