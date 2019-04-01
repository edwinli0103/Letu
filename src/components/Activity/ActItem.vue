<template>
  <div class="bg_white box_pad3">
    <div class="actHeader font_28 fx">
      <div class="fx_8 fx col_3 actHeader_l">
        <span></span>
        <span>{{ NAME }}</span>
      </div>
      <div class="fx_2 fx font_24 txt_r" @click="goToMoreFn">
        <span class="fx_2 col_c">GO</span>
        <span class="fx_1 icon_all icon_more"></span>
      </div>      
    </div>
    <div class="actIrem_Img bg_main">
      <img :src="IMG">
    </div>    
  </div>
</template>

<script>
export default {
  name: 'actItem',
  props:['value'],
  data () {
    return {
      ID: this.value.ID,
      IMG: this.value.IMG,
      NAME: this.value.NAME,
      TYPE: this.value.TYPE,
    }
  },
  methods: {
    goToMoreFn() {
      this.$router.push({path: "/mainpage/home/allActivity/ActDetail/" + this.ID});            
    }
  }
}
</script>

<style scoped>

.actHeader {
  width: 100%;
  line-height: 0.44rem;
  padding: 0.2rem 0;
}
.actHeader_l span:first-child {
  display: inline-block;
  width: 0.12rem;
  background-color: #17A5A9; 
  border-radius: 3px;
}
.actHeader_l span:last-child {
  text-indent: 0.8em;
}
.actIrem_Img {
  width: 100%;
  min-height: 1rem;
}
.actIrem_Img img {
  width: 100%;
  max-height: 2rem;
}
.icon_more {
  background-image: url("../../assets/images/icon_more.png");
  background-size: 0.11rem 0.2rem;
}

</style>
