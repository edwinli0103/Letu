<template>
  <div class="commentHeader txt_c font_24 bg_white" >
    <!-- 内容 -->
    <div class="fx fx_s">
      <div class="item bg_all" @click="getCommentsFn('all')">全部<span>({{total}})</span></div>
      <div class="item bg_good" @click="getCommentsFn('AAA')">好评<span>({{AAA}})</span></div>
      <div class="item bg_good" @click="getCommentsFn('haveImg')">有图<span>({{haveImg}})</span></div>
    </div>
    <div class="fx fx_s">
      <div class="item bg_good" @click="getCommentsFn('AA')">中评<span>({{AA}})</span></div>
      <div class="item bg_good" @click="getCommentsFn('additional')">追加评论<span>({{additional}})</span></div>
      <div class="item bg_bad" @click="getCommentsFn('A')">差评<span>({{A}})</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentHeader",
  props:['value'],
  components: {
  },
  data() {
    return {
      A: this.value.A || 0,
      AA: this.value.AA || 0,
      AAA: this.value.AAA || 0,
      total: this.value.total || 0,
      haveImg: 0,
      additional: 0,        
    }
  },
  methods: {
    getCommentsFn (type) {
      this.$emit('changeType', type)
    },
  }
};
</script>

<style scoped>
.commentHeader {
  width: 100%;
  padding: 0.2rem 0;
  line-height: 0.6rem;
}
.commentHeader>div {
  margin: 0.2rem 0;
}
.commentHeader .item { 
  width: 27.33%;
  height: 0.6rem;
  border-radius: 10px;
}
.bg_all {
  background-color: #FF5300;
}
.bg_good {
  background-color: #FFF3F3;
}
.bg_bad {
  background-color: #F1F1F5;
}
</style>
