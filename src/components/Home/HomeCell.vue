<template>
  <div  class=" bg_white box_pad3">
    <div class="homeCell font_28 fx">
      <div class="fx_8 fx col_3 homeCell_l">
        <span></span>
        <span>{{ Text_l }}</span>
      </div>
      <div class="fx_2 fx font_24 txt_r" @click="goToMoreFn">
        <span class="fx_2 col_c">{{Text_r}}</span>
        <span class="fx_1 icon_all icon_more"></span>
      </div>      
    </div>    
  </div>
</template>

<script>
export default {
  name: 'homeCell',
  props:['cellData'],
  data () {
    return {
      Text_l: this.cellData.Text_l,
      Text_r: this.cellData.Text_r,
      type: this.cellData.type
    }
  },
  methods: {
    goToMoreFn() {
      let type = this.type;
      this.$router.push({path:type});            
    }
  }
}
</script>

<style scoped>

.homeCell {
  width: 100%;
  line-height: 0.44rem;
  padding: 0.2rem 0;
}
.homeCell_l span:first-child {
  display: inline-block;
  width: 0.12rem;
  background-color: #17A5A9; 
  border-radius: 3px;
}
.homeCell_l span:last-child {
  text-indent: 0.8em;
}
.icon_more {
  background-image: url("../../assets/images/icon_more.png");
  background-size: 0.11rem 0.2rem;
}

</style>
