<template>
  <div class="comments">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 内容 -->
    <scroller 
      lock-x scrollbarY 
      use-pullup 
      height='500px'
      :pullup-config="pullup.config"
      @on-pullup-loading="pullupLoading"  
      ref="scroller"
      :scroll-bottom-offst="100" >
      <div class="box2">

        <myComHeader 
          v-for="(item,i) in proCommentRows" 
          v-model="proCommentRows[i]" 
          :key="item.A"
          @changeType="getComments">
        </myComHeader>

        <!-- 评论 -->
        <div class="container">
          <div v-for="(item,i) in proCommentList" :key="item.ID">
            <myComItem v-model="proCommentList[i]"></myComItem>
          </div>
        </div>

        <div class="loading1">
          <load-more tip="loading..." :class="{'isAll':pullup.isLoadMore}"></load-more>
          <p ref="isAll" class="isAll txt_c"> <br> 没有更多数据了...</p>
        </div> 


      </div>


    </scroller>
  
  </div>
</template>
  
<script>
  import { Scroller, LoadMore } from 'vux'
  import HeaderBack from '../Common/HeaderBack'
  import CommentHeader from './CommentHeader'
  import CommentItem from './CommentItem'
  export default {
    name: "comments",
    components: {
      myHeader: HeaderBack,
      myComHeader: CommentHeader,
      myComItem: CommentItem,
      Scroller,
      LoadMore,
    },
    data() {
      return {
        number: 23,
        header: {
          HBL_icon:"icon_back", 
          HBC_text:"所有评论", 
          HBR_icon: " ",
        },
        goodsId: '',
        type: '',
        showCount: 10,
        currentPage: 0,
        //下拉刷新配置数据
        pullup:{
          config: {
            content: '上拉加载更多',
            pullUpHeight: 40,
            height: 40,
            autoRefresh: false,
            downContent: '释放加载',
            upContent: '上拉加载更多',
            loadingContent: '',
            clsPrefix: 'xs-plugin-pullup-'
          },
          isAll: false,
          isLoadMore: true,
          onFetching: false,
        },
        proCommentRows: [{
          A: 10,
          AA: 10,
          AAA: 10,
          total: 30,
        }],
        proCommentList: [
          {
            PRO_NAME: "儿童智力检测",
            NICKNAME: "支付宝",
            COMMENTS: "太好用了,赞一个!!!",
            REPLY: "谢谢您的评价,我们会努力做的更好!!!",
            CREATE_TIME: "2017-12-08",
            HEADIMGURL: ""
          },                                        
        ],
      }
    },
    methods: {
      getComments(type) {
        if (type === 'all') type = '';

        this.type = type;

        this.ajaxHandle(true, () => {
          // 如果初次加载数据过少,就不生成滚动了
          if(this.pullup.isAll) {
            this.$refs.scroller.disablePullup();
          }
        });
      },
      // 上拉刷新操作
      pullupLoading () {
        let self = this;
        if (!self.pullup.onFetching) {
          self.pullup.onFetching = true;
          self.pullup.isLoadMore = false;
          this.ajaxHandle(false,() => {
            setTimeout(() => {
              self.$nextTick(() => {
                self.$refs.scroller.reset()
                self.$refs.scroller.donePullup();
                if (self.pullup.isAll) {
                  self.$refs.scroller.disablePullup();
                  setTimeout(() => {
                    self.$refs.isAll.style.display = 'block';
                  }, 100);
                }
              });
              self.pullup.onFetching = false;
              self.pullup.isLoadMore = true;
            },0);
          });                     
        }
      },
      ajaxHandle (isClear,callback) {
        // 清空数据
        if(isClear) {    
          this.proCommentList=[];
          this.currentPage = 0;
          // 数据加载 
          comTools.showLoading(this);
        };
        // 获取参数
        let params = {
          type: this.type,
          pro_id: this.goodsId,
          showCount: this.showCount,
          currentPage: this.currentPage,
        };
        let allComments = this.$store.state.allComments, self = this;
        
        setTimeout((e) => {
          if(isClear) {
            comTools.hideLoading(self);
            self.proCommentRows[0] = self.proCommentRows[0];
          }
          // 商品数组数据赋值
          if (self.currentPage === 3)
            self.pullup.isAll = true;

          let addData = [], num = self.currentPage*10;
          allComments.forEach((ele,i) => {
            if (num -1 < i && i < num + 10)
              addData.push(ele);
          });
          self.proCommentList.push.apply(self.proCommentList,addData);

          self.currentPage += 1;
          // 更新滚动条
          callback && callback();
        },500)
      }

    },
    created () {
      let type = this.$route.params.type;
      this.goodsId = this.$route.params.goodsID;
      this.getComments(type);
    }, 
    mounted () {
      let self = this;
      // 重置高度
      setTimeout(function () {
        comTools.setHeight(1.75);
        self.$refs.scroller.reset();
      },0)
    } 
  };
</script>
  
<style scoped>
  .comments {
    padding-top: 0.75rem;
    padding-bottom: 1rem;
  }
  .box2 {
    margin-bottom: 0.5rem;
  }
  .isAll {
    display: none;
    padding: 0.1rem 0;
  }
  .loading1 {
    padding-bottom: 0.5rem;
  }
</style>
  