<template>
  <div class="H_head txt_c font_12 clearfix">
    <div class="H_head_l _left" @click="goBack()">
      <div class="back_icon_all" :class="[HBL_icon]"></div>
    </div>
    <div class="H_head_c font_B30 _left">{{HBC_text}}</div>
    <div class="H_head_r _right" v-show="HBR_show" :class="[HBR_show_long?H_text_long:HBR_icon]" @click="handleHBR()">  
      {{HBR_text_long}}
    </div>
  </div>     
</template>

<script>
export default {
  name: 'headBack',
  props: ['header'],
  data () {
    return {
      HBL_icon: this.header.HBL_icon,
      HBL_type: this.header.HBL_type,
      HBC_text: this.header.HBC_text,
      HBR_icon: this.header.HBR_icon+' back_icon_all',
      HBR_show: this.header.HBR_show,
      HBR_type: this.header.HBR_type,
      HBR_show_long: this.header.HBR_show_long,
      HBR_text_long: this.header.HBR_text_long,
      H_text_long: 'H_text_long',
      isOver: false,
    }
  },
  methods: {
    goBack() {
      if(this.HBL_type === 'orderList' || this.HBL_type === 'sheetList'){
        this.$router.push({ path: "/mainpage/self" });
      } else {
        this.$router.go(-1);
      }
      // 清除跳转类型缓存
      this.$store.commit('resetId','goToType');
    },
    // 右边按钮点击事件
    handleHBR() {
      if (this.HBR_type === 'search') {
        this.$router.push({path: '/mainpage/all/search'})
      } else if(this.HBR_type === 'couponexplain'){
        this.$router.push({path: '/mainpage/self/couponexplain'})
      } else if(this.HBR_type === 'addaddress'){
        this.$emit('sendAddr','');
      } else if(this.HBR_type === 'addperson'){
        this.$emit('sendPerson','');
      } else if (this.HBR_type === 'addevaluate') {
        this.$emit('sendEva', '');
      } else if(this.HBR_type === 'collection'){
        if(!this.isOver){
          let isShow = !this.isOver;
          this.HBR_text_long = '完成';
        } else {
          this.HBR_text_long = this.header.HBR_text_long;
        }      
        this.isOver = !this.isOver; 
        this.$emit('isEdited',this.isOver);      
      } else if (this.HBR_type === 'share') {
        this.$emit('showShare', '');
      }
    },
    changeText (key,value) {
      this[key] = value;
    }
  }
}
</script>

<style scoped>
.H_head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: .75rem;
  line-height: .75rem; 
  z-index: 9;
  background-color: #18A6AA;
  font-size: .3rem;
  color: #fff;
}
.H_head_l{
  width: .8rem;
}
.H_head_c {
  width: 4.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
}
.H_head_r{
  width: .8rem;
}
.H_text_long{
  position: absolute;
  right: .2rem;
  width: 1.6rem;
  height: .75rem;
  text-align: right;
}

.icon_back {
  background-image: url("../../assets/images/icon_back.png");
  background-size: 0.22rem 0.38rem;
}

.icon_search {
  background-image: url("../../assets/images/icon_search.png");
  background-size: 0.4rem 0.4rem;  
}

.icon_edit {
  background-image: url("../../assets/images/edit.png");
  background-size: 0.4rem 0.4rem;
}

.icon_search {
  background-image: url("../../assets/images/icon_search.png");
  background-size: 0.4rem 0.4rem;
}

.icon_share {
  background-image: url("../../assets/images/icon_shareb.png");
  background-size: 0.4rem 0.4rem;
}

</style>
