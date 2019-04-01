<template>
  <div class="allActivity">
    <!-- 头部导航栏 -->
    <myHeader :header="header"></myHeader>
    <!-- 中间部分 -->
    
    <!-- 热卖商品 -->
    <div class="H_hotSales clearfix">
      <div v-for="(item,index) in allActivitys" :key="item.Id">
        <myActItem v-model="allActivitys[index]"></myActItem>
      </div>
    </div>        
  </div>
</template>

<script>
import ActItem from "./ActItem";
import HeaderBack from '../Common/HeaderBack'
export default {
  name: 'allActivity',
  components: {
    myHeader: HeaderBack,
    myActItem: ActItem 
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back", 
        HBC_text:"萌萌推荐活动系列", 
        HBR_icon: " ",
      },
      // 热卖商品数据
      allActivitys:[],
      activitys: [
        {
          ID: 'act001',  
          NAME: 'Number One',
          TYPE: 'One',
          IMG: require('../../assets/images/home/activity_02.png'),
        },
        {
          ID: 'act002',  
          NAME: 'Number Two',
          TYPE: 'Two',
          IMG: require('../../assets/images/home/activity_03.png'),
        },
        {
          ID: 'act003',  
          NAME: 'Number Three',
          TYPE: 'Three',
          IMG: require('../../assets/images/home/activity_02.png'),
        },
        {
          ID: 'act004',  
          NAME: 'Number Four',
          TYPE: 'Four',
          IMG: require('../../assets/images/home/activity_03.png'),
        },
      ],
    }
  },
  methods: {
    goToAll () {
      this.$router.push({path: '/mainpage/all'});
    }
  },
  created () {
    // 数据加载 
    comTools.showLoading(this);
    setTimeout((data) => {
      this.allActivitys = this.activitys;
      // 数据加载 结束
      comTools.hideLoading(this);
    }, 500)
  }
}
</script>

<style scoped>
 .allActivity {
  padding-top: 0.9rem;
  padding-bottom: 1rem;
}

.H_hotSales {
  width: 100%;
  padding-bottom: .2rem;
}
.H_lookAll {
  color: #999;
  margin-bottom: .3rem;
}
</style>
