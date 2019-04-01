<template>
  <div class="G_detail"> 
      <!-- 头部导航栏 -->
    <div class="pos-fixed" >
      <div class="GD_header fx pos-relative bg_white">
        <div class="fx_2 fx" @click="goBack">
          <span class="fx_1"></span>
          <span class="fx_1 icon_all goBack"></span>
          <span class="fx_2"></span> 
        </div>
        <tab class="fx_9 GD_tab" :animate="true">
          <tab-item :selected="tabShow.index1" @on-item-click="goToAnchor('baseInfo')">商品</tab-item>
          <tab-item :selected="tabShow.index2" @on-item-click="goToAnchor('imgDetail')">详情</tab-item>
          <tab-item :selected="tabShow.index3" @on-item-click="goToAnchor('comments')">评价<span>{{number}}</span></tab-item>
        </tab>
        <div class="fx_2 txt_c icon_all icon_share" @click="showShareFn"></div>
      </div>
      
    </div>
    <!-- 详情页部分 -->
    <div class="G_center" ref="baseInfo">
      <!-- 商品基本信息 -->
      <div>
        <div style="height:5rem;width:100%;">
          <swiper height="5rem">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in baseList" :key="index">
                <img :src="item">
            </swiper-item>
          </swiper>
        </div>
        
        <div class="G_info bg_white">

          <div class="fx">
            <div class="fx_5">
              <div class="font_28 indend">{{goodsName + specimenId}}</div>
              <div class="fx indend">
                <span class="font_30 col_main">￥{{specimenPrice}}</span>
                &nbsp;
                <s class="font_26">￥{{goodsPrice}}</s>
              </div>
            </div>
            <div class="fx_2 fx_col" 
              :class="{'selected':selected}" 
              @click="collectFn">
              <div class="fx_1"></div>
              <div class="fx_3 icon_all icon_collect"></div>
              <div class="fx_3 col_c txt_c" :class="{'col_main':selected}">收藏</div>
            </div>
          </div>
          <!-- 规格和样本 -->
          <div class="font_26 col_3 specification box_b" v-show="speciesShow">
            <div class="classCell font_26 col_9">种类</div>
            <ul class="kind clearfix">
              <li v-for="(item,i) in specList" :key="item.ID + i" >
                <div :class="{'selected':item.check}" @click="chiseFn(i,item.ID,true)">
                  {{item.SPEC_NAME}}
                </div>  
              </li>            
            </ul>
            <div class="classCell font_26 col_9">样本</div>
            <ul class="specimen clearfix">
              <li v-for="(item,i) in specValueList" :key="item.ID + i">
                <div :class="{'selected':item.check}" @click="chiseFn(i,item.ID,false)">
                  {{item.SPEC_VALUE}}
                </div>
              </li>
            </ul>            
          </div>
          <div class="fx indend col_c">
            <div class="fx_4">快递: <span>免运费</span></div>
            <div class="fx_3">收藏: <span>7202</span></div>
            <div class="fx_4"></div>
          </div>
        </div> 
      </div>
      <!-- 锚点 -->
      <div  ref="imgDetail" id="imgDetail" class="anchor"></div>
      <!-- 分割线 -->
      <div ref="imgDetails" class="cutOff">
         <div class="icon_all icon_detail"></div>
      </div>
      <!-- 图片详情 -->
      <div style="height: auto;">
        <img :src="detailImg" alt="">
      </div>
      <!-- 锚点 -->
      <div ref="comments" id="comments" class="anchor"></div>
      <!-- 分割线 -->
      <div class="cutOff">
        <div class="icon_all icon_comments"></div>
      </div>
      <!--评论  -->
      <div>
        <!-- 评论头部 -->
        <myComHeader 
          v-for="(item,i) in proCommentRows" 
          v-model="proCommentRows[i]" 
          :key="item.A"
          @changeType="getMoreComments">
        </myComHeader>
        
        <div>
          <div v-for="(item,i) in productCommentsList" :key="item.ID">
            <myComItem v-model="productCommentsList[i]"></myComItem>
          </div>
        </div>
        <!-- 查看更多评论 -->
        <div class="lookMore font_28 txt_c col_c">
          <div @click="getMoreComments()">查看更多评论 >>></div>
        </div>
      </div>
    </div>
    <!-- 分享按钮指引 -->
    <div v-model="showHideOnBlur" v-show="showHideOnBlur">
      <div class="my_msk" @click.stop="showHideOnBlur = false">
        <div class="my_imgBox" @click.stop="showHideOnBlur = false"></div>
      </div>
    </div>       
  </div>
</template>

<script>
import CommentHeader from './CommentHeader'
import CommentItem from './CommentItem'
import { Tab, TabItem, Swiper, SwiperItem  } from 'vux'

export default {
  name: "G_detail",
  components: {
    myComHeader:CommentHeader,
    myComItem:CommentItem,
    Swiper,
    SwiperItem,
    Tab, 
    TabItem,
  },
  data() {
    return {
      keepEd: false,
      baseList: [],
      number: 23,
      tabShow:{
        index1: true,
        index2: false,
        index3: false,
      },
      selected: false, // 商品头部tab
      nextClick: true,
      // 种类选择数据
      goodsId: '',
      goodsName: '',
      goodsPrice: '',
      detailImg: '',
      smallImg: '',
      specimenId: '',
      specimenPrice: '',
      // 是否显示种类和样本
      speciesShow: true,
      //类别数组 
      specList:[],
      // 当前的类别的对应样本数组
      specValueList: [],
      // 样本数组的数组
      specValueArray: [],
      // 商品评论概况
      proCommentRows: [{
        A: 10,AA: 10,AAA: 10,total: 30,
      }],
      // 商品评论数组
      productCommentsList: [],
      // 动态拼接图片路径
      imgUrl:this.$store.state.imgUrl,
      // 是否显示分享指引
      showHideOnBlur: false,
    }
  },
  created() {
    // this.detailInit(this.addScrollWatch);
  },
  mounted() {
  },
  activated() {
    let goodsID = this.$route.params.goodsID;
    let oldGoodsID = this.$store.state.goodsID; 
    // 判断是否是同一个商品
    if (oldGoodsID !== goodsID) {
      this.detailInit(this.addScrollWatch);
    }    
  },
  deactivated() {
    window.onscroll = null;
  },
  destroyed () {
    console.log('detail===================destroyed')
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 分享指引
    showShareFn () {
      this.showHideOnBlur = true;
    },
    // 页面初始化和数据更新
    detailInit(callback) {
      let data = {}, self = this, goodsID = this.$route.params.goodsID,
      allGoods = this.$store.state.allGoods;
      // 获取data
      allGoods.forEach((ele,i) => {
        if(ele.ID === goodsID) {
          data = ele;
        }
      })
      // 数据加载
      comTools.showLoading(this);

      setTimeout((e) => {
        self.goodsId = goodsID;
        self.goodsName = data.NAME;
        self.goodsPrice = data.MARKET_PRICE;
        self.detailImg = data.DETAIL_IMG;
        self.smallImg = data.SMALL_IMG;
        self.baseList =data.LOOP_IMG;
        // 清空数组
        self.specList = [];
        self.specValueArray = [];
        // data数据是否为空
        if (data.specList && data.specList.length !== 0) {
          data.specList.forEach((element,index)=>{
            let o ={},a = [];
            o.ID = element.ID;
            o.SPEC_NAME = element.SPEC_NAME;
            if(index === 0) {
              o['check'] = true;
            }else {
              o['check'] = false;
            }
            self.specList.push(o);
            // 样本数据
            data.specList[index].specValueList.forEach((ele,index)=>{
              let ob = {};
              ob.ID = ele.ID;
              ob.PRICE = ele.PRICE;
              ob.SPEC_VALUE = ele.SPEC_VALUE;
              if(index === 0) {
                ob['check'] = true;
              }else {
                ob['check'] = false
              }
              a.push(ob);
            })
            self.specValueArray.push(a);
          })
          self.specValueList = self.specValueArray[0];
          // Id和价格
          self.specimenId = self.specValueList[0].ID;
          self.specimenPrice = self.specValueList[0].PRICE;
          // 更新欲加入购物车商品信息
          self.resetSelGoods();
          // 更新商品显示的数量
          self.$emit('reset', self.specimenId, data.ID);
        } else {
          self.speciesShow = false;
        }
        // 商品评论部分
        self.proCommentRows[0] = data.proCommentRows;
        if (data.productCommentsList) {
          self.productCommentsList = data.productCommentsList;
        }
        // 数据加载 结束
        comTools.hideLoading(self);
        //  缓存id
        this.$store.commit('setId',{key:'goodsID',value: goodsID});
        // 回调函数的执行
        callback && callback();

      }, 500)

    },
    // 滚动监听,tab改变
    addScrollWatch () {
      let self = this;    
      setTimeout(() => {      
        let imgDetail = self.$refs['imgDetail'].offsetTop;
        let comments = self.$refs['comments'].offsetTop;
        window.onscroll = function(e){
          setTimeout(function(){
            let docScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (docScrollTop < imgDetail) {
              comTools.reObj(self.tabShow,'index1', false)
            } else if(docScrollTop >= imgDetail && comments >= docScrollTop ) {
              comTools.reObj(self.tabShow,'index2', false)
            } else if (docScrollTop >= comments) {
              comTools.reObj(self.tabShow,'index3', false)
            }
          },0);
        };
        // 初始化数据
        comTools.reObj(self.tabShow,'index1', false);
      }, 10);
    },
    // 收藏按钮
    collectFn () {
      if (this.nextClick) {
        // 防止频繁点击
        this.nextClick = false;

        let type = 'success', self = this;

        if (this.selected)
          type = 'cancel';

        this.selected = !this.selected;

        this.$vux.toast.show({
          type: type,
          text: type
        })
        
        setTimeout(() => {
          self.nextClick = true;
        }, 3000);
      }
    },
    // 评论跳转
    getMoreComments (type) {
      this.$router.push({path:"/goodsdetail/comments/"+ type +"/" + this.goodsId})
    },
    // 锚点按钮
    goToAnchor(anchor) {
      this.$refs[anchor].scrollIntoView();
    },
    // 二级三级分类点击按钮逻辑
    chiseFn(index,id,type) {
      if(type) {
        // 二级分类的业务逻辑
        //数据重置
        this.specList = comTools.reArr(this.specList,'check',index);
        // 重新赋值
        this.specValueList = this.specValueArray[index];
        //数据重置
        this.specValueList = comTools.reArr(this.specValueList,'check',0);
        // 重置样本价格
        this.specimenId = this.specValueList[0].ID;
        this.specimenPrice = this.specValueList[0].PRICE;
        // 更新欲加入购物车商品信息
        this.resetSelGoods();
        // 更新商品显示的数量
        this.$emit('reset', id, this.goodsId);
      }else {
        // 三级分类的业务逻辑
        this.specValueList = comTools.reArr(this.specValueList,'check',index);
        // 重置样本价格
        this.specimenId = this.specValueList[index].ID;
        this.specimenPrice = this.specValueList[index].PRICE;
        // 更新欲加入购物车商品信息
        this.resetSelGoods();
        // 更新商品显示的数量
        this.$emit('reset', id, this.goodsId);
      }
    },
    // 更新欲加入购物车信息
    resetSelGoods () {
      this.$store.commit('setData',{
        key:'selGoods',
        value: {
          id: this.goodsId,
          goodsName: this.goodsName + this.specimenId,
          specificsChild:this.specimenId,
          price:this.specimenPrice,
          img: this.smallImg,
          proNum: 1,
          selected: true,
        }
      });
    },
  }, 
};
</script>

<style scoped>
  .GD_header {
    width:100%;
    height: 0.8rem; 
    line-height: 0.8rem;
    font-size: 0.24rem ;
    color: #666;
    border-bottom: 1px solid #e5e5e5;
  }

  .G_center{
    width: 100%;
    padding-top: 0.8rem;
    padding-bottom: 1rem;
  }
  .G_info {
    padding: 0.1rem 0 0.2rem 0;
    border-top: 1px solid #f5f5f5;
  }
  .G_info .indend {
    text-indent: 12px;
    padding: 0.1rem 0;
  }
  .cutOff {
    background: #f5f5f5;
    padding: 0.2rem 0;
  }
  .cutOff div {
    height: 0.3rem;
  }
  .anchor {
    height: 0.8rem;
    margin-top: -0.8rem;
    z-index: 0;
  }
  .goBack {
    background-image: url("../../assets/images/icon_back1.png");
    background-size: 0.32rem 0.4rem;
  }
  .icon_share {
    background-image: url("../../assets/images/icon_share.png");
    background-size: 0.35rem 0.35rem;
  }
  .icon_collect {
    background-image: url("../../assets/images/icon_collection.png");
    background-size: 0.4rem 0.4rem;
  }
  .selected .icon_collect {
    background-image: url("../../assets/images/icon_collected.png");
    background-size: 0.4rem 0.4rem;
  }
  .icon_detail {
    background-image: url("../../assets/images/icon_detail.png");
    background-size: 3.876rem 0.276rem;
  }
  .icon_comments {
    background-image: url("../../assets/images/icon_comments.png");
    background-size: 3.876rem 0.276rem;
  }
  .classCell {
    padding: 0.1rem 0.2rem;
  }
  .specification {
    padding: 0 0.1rem
  }
  .specification>ul li{
    margin: 0.1rem 0.1rem;
    float: left;
  }
  .specification>ul li div {
    padding: 0 0.2rem;
    border-radius: 3px;
    border: 1px solid #ededed;
    background-repeat: no-repeat;
    background-position: right bottom;
  }

  .specification div.selected {
    background-image: url("../../assets/images/icon_checked.png");
    background-size: 0.25rem 0.25rem;
    border-color: #18A5A9 !important;
  }

  .vux-tab,
  .vux-tab .vux-tab-item {
    height: 0.8rem !important;
    line-height: 0.8rem !important;
    font-size: 0.24rem !important;
    background: none;
  }

  .lookMore>div {
    widows: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
  }

  .vux-tab-ink-bar {
    /* 可以设置下划线的样式 */
  }
  .swiper-demo-img img,img {
    width: 100%;
    vertical-align: middle;
  }
  .my_imgBox {
    background-image: url('../../assets/images/share.png');
  }

</style>
