<template>
  <div  class="catgory fx bg_white" :value="value">
    <div class="fx_1 catgory_l bg_main" @click="goToActivity(0)">
      <img :src="value[0].IMG" :alt="value[0].NAME" >
    </div>
    <div class="fx_1 fx_col catgory_r">
      <div class="fx_1 bg_main" @click="goToActivity(1)">
        <img :src="value[1].IMG" :alt="value[1].NAME" >
      </div>
      <div class="fx_1 bg_main" @click="goToActivity(2)">
        <img :src="value[2].IMG" :alt="value[2].NAME" >
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'catgory',
  props:['value'],
  data () {
    return {
      
    }
  },
  methods: {
    goToActivity(type) {
      let id = this.value[type].ACTIVITY_ID;
      this.$store.commit('setId',{key:'activityId',value:id});
      this.$router.push({path:'/mainpage/home/allActivity/actDetail/' + id});
    },
  },
  created () {
  }
}
</script>

<style scoped>
.catgory {
  margin-bottom: 0.1rem;
  height: 2.32rem; 
}
</style>
