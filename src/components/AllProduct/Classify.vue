<template>
  <div class="classify">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 中间部分 -->
    <div class="classify_content">
      <router-link to="/mainpage/all" tag="div" class="all_classify bg_white font_22 clearfix">
        全部分类<div class="icon_next _right"></div>
      </router-link>
      <!-- 分类列表 -->
      <ul class="classify_box">
        <li class="classify_item bg_white font_22" v-for="(classifyItem,index) in classifyItems" :key="classifyItem.ClassOneId">
          <div class="first_classify" @click="goClassify(classifyItem.ClassOneId)">
            {{classifyItems[index].ClassOneName}}
            <div class="icon_next _right"></div>
          </div>
          <ul class="classify_box_second clearfix">
            <li class="second_classify _left"
            v-for="(classifyTwoItem,i) in classifyItems[index].ClassTwoList"
            :key="classifyTwoItem.ClassTwoId"
            @click="goClassify(classifyTwoItem.ClassTwoId)">
            {{classifyItems[index].ClassTwoList[i].ClassTwoName}}
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import HeaderBack from '../Common/HeaderBack'

export default {
  name: 'classify',
  components: {
    myHeader: HeaderBack,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"商品分类",
        HBR_icon: "icon_search",
        HBR_show: true,
        HBR_type: "search",
      },
      classifyItems: [
        {
          ClassOneId: 'class001',
          ClassOneName: '儿童智力检测',
          ClassTwoList:[
            {
              ClassTwoId:'class001001',
              ClassTwoName: '儿童智力检测-001',
            },
            {
              ClassTwoId:'class001002',
              ClassTwoName: '儿童智力检测-002',
            },
            {
              ClassTwoId:'class001003',
              ClassTwoName: '儿童智力检测-003',
            },
            {
              ClassTwoId:'class001004',
              ClassTwoName: '儿童智力检测-004',
            },
            {
              ClassTwoId:'class001005',
              ClassTwoName: '儿童智力检测-005',
            },
            {
              ClassTwoId:'class001006',
              ClassTwoName: '儿童智力检测-006',
            }
          ],
        },
        {
          ClassOneId: 'class002',
          ClassOneName: '成人健康检测',
          ClassTwoList:[
            {
              ClassTwoId:'class002001',
              ClassTwoName: '成人健康检测-001',
            },
            {
              ClassTwoId:'class002002',
              ClassTwoName: '成人健康检测-002',
            },
            {
              ClassTwoId:'class002003',
              ClassTwoName: '成人健康检测-003',
            },
            {
              ClassTwoId:'class002004',
              ClassTwoName: '成人健康检测-004',
            },
            {
              ClassTwoId:'class002005',
              ClassTwoName: '成人健康检测-005',
            },
            {
              ClassTwoId:'class002006',
              ClassTwoName: '成人健康检测-006',
            }
          ],
        }
      ],
    }
  },
  computed: {
  },
  methods: {
    ajax(){
      // 数据加载开始动画
      comTools.showLoading(this, '载入中...');
      this.$http.post('/information/getProClass',{})
        .then((data) => {
            // 加载完成结束动画
            comTools.hideLoading(this);
            this.classifyItems = data;
        })
    },
    goClassify(classId){
      this.$store.commit('setId',{key:'classId',value: classId});
      this.$router.push({path:'/mainpage/all'});
    },

  },
  mounted() {
   
  },
  created() {
    // this.ajax();
  }
}
</script>

<style scoped>
.classify {
  padding-top: 0.95rem;
}
.classify_content{
  overflow: hidden;
}
.all_classify{
  overflow: hidden;
  width: 100%;
  height: .75rem;
  line-height: .75rem;
  padding: 0 .2rem;
}
.classify_box{
  overflow: hidden;
  margin-top: .2rem;
}
.classify_item{
  overflow: hidden;
  margin-bottom: .2rem;
}
.first_classify{
  width: 100%;
  height: .75rem;
  line-height: .75rem;
  padding: 0 .2rem;
}
.icon_next{
  background-image: url("../../assets/images/icon_jian_right999.png");
  background-size: 0.14rem 0.28rem;
  background-repeat: no-repeat;
  background-position: center;
  width: 1.2rem;
  height: .75rem;
}
.classify_box_second{
  border-top: 1px solid #dddddd;
  padding: 0 .2rem;
}
.second_classify{
  width: 50%;
  height: .65rem;
  line-height: .65rem;
  color: #999999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
