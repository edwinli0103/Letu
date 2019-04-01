<template>
  <div>
    <div class="square grid-div" @click.stop="addMedia">
      <input 
        ref="input" 
        type="file"
        accept="image/*" 
        capture="camera"
        @change="onFileChange"
        style="display: none;width:0;height:0"/>
      <img class="img-add" src="../../assets/vux_logo.png"/>
    </div>
    <div class="img">
      <div v-for="(item,index) in imgUrls" :Key="index">
        <img :src="item" alt="">
      </div>
    </div>
  </div>
	
	
</template>

<script>
  import lrz from 'lrz'
	export default {
		data: function () {
			return {
        imgUrls: [],
			}
		},
		watch: {
		
		},
		methods: {
      addMedia() {
        let vm = this;
        this.$refs.input.click();
        return false;
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files, e);
      },
      createImage: function (file, e) {
        let self = this;
        //调用 lrz 函数库对图片进行处理
        lrz(file[0], {width: 480,fieldName:'file1'}).then(function (rst) {
          // fieldName 为 formData 中多媒体的字段名
          // self.imgUrls = rst.base64;
          self.imgUrls.push(rst.base64);
          // vm.formDatas.push(rst.formData);
          return rst;
        }).always(function () {
            // 清空文件上传控件的值
            e.target.value = null;
        });
      },
     
  }
	}
	
</script>

<style scoped>
  .img-add {
    width: 2rem;
  }
  .img div{
    display: inline-block;
    width: 25%
  }
</style>