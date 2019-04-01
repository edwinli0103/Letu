<template>
  <div class="evaluate_main">
    <myHeader :header="header" @sendEva='sendEvaFn'></myHeader>
    <div class="myEvaluateList">
      <div v-for="(evaItem,index) in evaList" :key="evaItem.id">
        
        <div class="evaluateItem">
          <div class="bg_white">
            <div class="evaluateItem_pro fx">
              <div class="evaluateItem_l fx_1">
                <div><img :src="evaList[index].img" alt=""></div>
              </div>
              <div class="evaluateItem_c fx_3 font_24">
                <div class="text_top">{{evaList[index].pro_name}}</div>
                <div class="fx col_9">
                  <div class="fx_3">￥{{evaList[index].price}}
                    <span class="col_c">￥999</span>
                  </div>
                  <div class="fx_1">数量:
                    <span class="">X</span>{{evaList[index].proNum}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <group title="">
            <cell title="请您评价">
              <rater v-model="evaList[index].star" star="✩" active-color="#FF9900" :margin="4"></rater>
            </cell>
          </group>
          <div class="eva_textarea bg_white">
            <div>            
              <textarea v-model="evaList[index].comments" name="" id="" cols="" rows="5" placeholder="您可以从商品质量、配送、服务态度等方面来发表评价"></textarea>
              <div class="eva_comImgs">
                <div class="eva_comImg pos-relative" v-for="(item,i) in evaItem.imgList">
                  <div class="eva_closs pos-absolute icon_all" @click.stop="deleteImg(index,i)"></div>
                  <img :src="'data:image/jpeg;base64,'+item.img_url" >
                </div>
                <div class="eva_addImg icon_all" @click.stop="addMedia(index)" v-if="evaItem.isAddImg">
                  <input type="file" accept="image/*" @change="onFileChange" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="send_evabox pad_2 bg_white pos-fixed">
      <button class="send_eva bg_main color_white">提交评价</button>
    </div> -->

  </div>
</template>

<script>
  import lrz from 'lrz'
  import HeaderBack from '../Common/HeaderBack'
  import { Rater, Group, Cell, Range } from 'vux'

  export default {
    name: 'logistics',
    components: {
      myHeader: HeaderBack,
      Rater,
      Group,
      Cell,
    },
    data() {
      return {
        header: {
          HBL_icon: "icon_back",
          HBC_text: "发表评价",
          HBR_icon: "icon_edit",
          HBR_show: true,
          HBR_type: "addevaluate",
          HBR_show_long: true,
          HBR_text_long: "发布",
        },
        isSend: true,
        curComment: 0,
        orderId: '',
        evaList: [],
      }
    },
    methods: {
      addMedia(index) {
        this.curComment = index;
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files, e);
      },
      createImage: function (file, e) {
        let self = this;
        let i = this.curComment;
        //调用 lrz 函数库对图片进行处理
        lrz(file[0], {width: 200,height: 200,fieldName:'file1'}).then(function (rst) {
          // fieldName 为 formData 中多媒体的字段名
          let imgStr = rst.base64, imgStrSend = imgStr.slice(imgStr.indexOf(',') + 1);
          self.evaList[i].imgList.push({img_url:imgStrSend});
          // vm.formDatas.push(rst.formData);
          return rst;
        }).always(function () {
            // 清空文件上传控件的值
            e.target.value = null;
        });
      },
      deleteImg (index,i) {
        this.evaList[index].imgList.splice(i,1);
      },
      sendEvaFn() {
        this.isSend = true;
        this.evaList.forEach((element, index, arr) => {
          if (!element.star) {
            this.isSend = false;
            this.$vux.toast.show({
              type: 'success',
              text: '亲，评论星级不能为空哦~',
              width: '16em'
            });
          } else if (element.comments.replace(/(^\s*)|(\s*$)/g, "") === '') {
            this.isSend = false;
            this.$vux.toast.show({
              type: 'success',
              text: '亲，评论内容不能为空哦~',
              width: '16em'
            });
          }
        });
        if(!this.isSend)
          return
  
        let _evaList = [];
        this.evaList.forEach ( (ele, i) => {
          let o = {},a=[];
          o.pro_id = ele.pro_id;
          o.pro_name = ele.pro_name;
          o.order_id = ele.order_id;
          o.comments = ele.comments;
          o.imgList = ele.imgList;
          o.star = ele.star;
          _evaList.push(o)
        })
        // 开始动画
        comTools.showLoading(this, '发布中...');
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(this);
            if (true) {
              this.$vux.toast.show({
                type: 'success',
                text: '评论成功~',
                width: '7.5em'
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 3000)
            }
          }, 500)
      }

    },
    created() {
      let ordObj = this.$store.state.orderObj;      
      console.log(ordObj);
      ordObj.productList.forEach((element, index, arr) => {
        let o = {};
        o.order_id = ordObj.orderId;
        o.pro_id = element.ID;
        o.pro_name = element.NAME;
        o.img = element.SMALL_IMG;
        o.price = element.MARKET_PRICE;
        o.proNum = 1;
        o.star = 5;
        o.comments = '';
        o.imgList = [];
        o.isAddImg = true;
        this.evaList.push(o);
      })
    },
    watch: {
      evaList:{
        handler: function (curVal, oldVal) {
          curVal.forEach((ele ,i) => {
            if (ele.imgList.length !== 4 && !ele.isAddImg)
              ele.isAddImg = true;
            if (ele.imgList.length === 4 && ele.isAddImg)
              ele.isAddImg = false;
          })
        },
        deep: true
      }
    },
    mounted() {
    },
  }
</script>

<style>
  .evaluateItem .weui-cells{
    margin-top: 0 !important;
    font-size: .28rem !important;
  }
  .evaluateItem .weui-cell{
    padding: .2rem .3rem !important;
  }
  .evaluateItem .weui-cells:before,.weui-cells:after{
    height: 0 !important;
    border-top: none !important;
  }  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .evaluate_main {
    padding-top: .75rem;
    background: #ffffff;
  }
  .myEvaluateList{
    
  }
  .evaluateItem{
    padding-bottom: .2rem;
    background-color: #efefef;  
  }
  .evaluateItem_pro {
    margin: 0 .2rem;
    padding: .2rem .1rem;
    border-bottom: 1px solid #f3f3f3;
  }
  .evaluateItem_l div{
    display: inline-block;
    border: 1px solid #efefef;
  }
  .evaluateItem_l img {
    width: 1.2rem;
    height: 1.2rem;
  }
  .evaluateItem_c{
    
  }
  .evaluateItem_c .text_top{
    height: .8rem;
    line-height: .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .evaluateItem_c .col_c{
    margin-left: .1rem;
    text-decoration: line-through;
  }
  .eva_textarea{
    padding: 0.1rem;
  }
  .eva_textarea>div{
    background-color: #fcfcfc;
    border: 1px solid #D0CCCB;
  }
  .eva_textarea textarea {
    resize:none;
    box-sizing: border-box;
    width: 100%;
    padding: .16rem;
    border: none;
    outline:none;
  }
  .eva_closs {
    top: 0;
    right: 0;
    width: 0.3rem;
    height: 0.3rem;
    background-image: url("../../assets/images/icon_close.png");
    background-size: 0.3rem 0.3rem;
  }
  .eva_comImg {
    display: inline-block;
    width: 1.2rem;
    margin: 0 0 .16rem .16rem;
    padding: .16rem .16rem 0 0;
    height: 1.2rem;
    overflow: hidden;
    vertical-align: bottom;
  }
  .eva_comImg img {
    width: 100%;
    height: 100%;
    max-height: none;
    vertical-align: middle;
  }
  .eva_addImg {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    margin: .16rem;
    background-image: url("../../assets/images/icon_addImg.png");
    background-size: 1.2rem 1.2rem;
  }
  .eva_addImg input[type='file']{
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    opacity: 0;
    vertical-align: middle;
  }

  /* .send_evabox{
    box-sizing:border-box;
    bottom: 0;
  }
  .send_eva{
    outline: none;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    font-size: .28rem;
    border-radius: 5px;
    border-width: 0 !important;
  } */
</style>