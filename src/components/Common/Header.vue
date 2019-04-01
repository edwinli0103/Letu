<template>
  <div class="H_head fx txt_c font_12">
    <div class="H_head_l fx_1 icon_all" :class="[HL_icon]" @click="handleHL()"></div>
    <div class="H_head_c fx_6 font_B30">
      {{HC_text}}
    </div>
    <div class="H_head_r fx_1 fx_col" @click="handleHR()">
      <div class="fx_2 icon_all" :class="[HR_icon]"></div>
    </div>
  </div>    
</template>

<script>
export default {
  name: 'home',
  props: ['header'],
  data () {
    return {
      HL_icon: this.header.HL_icon,
      HL_text: this.header.HL_text,
      HL_type: this.header.HL_type,
      HC_text: this.header.HC_text, 
      HR_icon: this.header.HR_icon,
      HR_text: this.header.HR_text,
      HR_type: this.header.HR_type,

      showLogo: false,

      weixin: {
        appId: '',
        timestamp: '', 
        nonceStr: '', 
        signature: '',
      }
    }
  },
  methods: {
    // 左边按钮点击事件
    handleHL() {
      if (this.HL_type === 'scan') {
        this.$vux.toast.show({
          type:'success',
          text:'扫描成功'
        })
      }else if (this.HL_type === 'classify') {
        // 分类
        this.$router.push({path: '/classify'})
      }
    },
    // 右边按钮点击事件
    handleHR() {
      if (this.HR_type === 'search') {
        this.$router.push({path: '/mainpage/all/search'})
      } else if (this.HR_type === 'usebox') {
        this.$router.push({path: '/useBox'})
      }
     
    },
  },
  created() {
  }
}
</script>

<style scoped>
  .H_head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: .76rem;
    z-index: 9;
    background-color: #18A6AA;
  }
  .H_head_c {
    line-height: .75rem;
    color: #fff;
  }
  .icon_scanner {
    background-image: url("../../assets/images/icon_scanner.png");
    background-size: 0.4rem 0.4rem;
  }

  .icon_search {
    background-image: url("../../assets/images/icon_search.png");
    background-size: 0.4rem 0.4rem;
  }

  .icon_category {
    background-image: url("../../assets/images/icon_category.png");
    background-size: 0.4rem 0.4rem;
  }
</style>
