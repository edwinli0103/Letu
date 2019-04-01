<template>
  <div class="commentItem box_pad3 bg_white col_3">
    <!-- 内容 -->
    <div class="up fx">
      <div class="fx_1">
        <div class="headImg icon_all"><img :src="HEADIMGURL" alt=""></div>
      </div>
      <div class="up fx_7">{{NICKNAME}}</div>
    </div>
    <div class="center">
      <p>{{COMMENTS}}</p>
      <div>
        <img :src="item" v-for="(item,index) in imgList">
      </div>
    </div>
   
    <div class="down col_9">
      <div>{{PRO_NAME}}</div>
      <div>{{CREATE_TIME}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: ['value'],
  components: {
  },
  data() {
    return {
      REPLY: this.value.REPLY,
      PRO_NAME: this.value.PRO_NAME,
      NICKNAME: this.value.NICKNAME,
      COMMENTS: this.value.COMMENTS,
      HEADIMGURL: this.value.HEADIMGURL,
      CREATE_TIME: this.value.CREATE_TIME,
      imgList: this.value.imgList,
      // 动态拼接图片路径
      imgUrl:this.$store.state.imgUrl,
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
    },
   
  }
};
</script>

<style scoped>
.commentItem {
  width: 100%;
  margin: 0.1rem 0;
}
.up div,
.down div {
  display: inline-block;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0.1rem 0;
}

.down div:last-child {
  padding-left: 0.2rem;
}

.up .headImg {
  width: 0.6rem;
  height: 0.6rem;
  padding: 0;
  border-radius: 50%;
  background-image: url("../../assets/images/icon_self.png");
  background-size: 0.49rem 0.48rem;
}

.up img {
  width: 100%;
  height: 100%;
  margin-top: -0.06rem;
  vertical-align: middle;
  border-radius: 50%;
}
.center div img {
  width: 30%;
  margin: 1.2%;
  max-height: 2rem;
  vertical-align: middle;
}


</style>
