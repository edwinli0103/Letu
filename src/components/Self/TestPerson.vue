<template>
  <div class="testperson">
    <!-- 头部 -->
    <myHeader :header="header"></myHeader>
    <!-- 检测人为空 -->
    <div class="empty txt_c bg_white marb_2" v-show="isEmpty">
      暂无检测人，请新增检测人哦~
    </div>
    <!-- 检测人列表 -->
    <div v-for="(testPersonItem,index) in testPersonItems" :key="testPersonItem.id + index">
      <myTestPersonItem v-model="testPersonItems[index]"></myTestPersonItem>
      <div class="fx pad_2 marb_2 bg_white col_6">
        <div class="fx_3"></div>
        <div class="fx_1 txt_r editImage" @click="editfn(index)">编辑</div> 
        <div class="fx_1 txt_r detImage" @click="deletefn(index)">删除</div>
      </div>
    </div>
    <!-- 底部 -->
    <myAddButton :addbutton="addbutton"></myAddButton>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import AddButton from '../Common/AddButton'
import TestPersonItem from '../Common/TestPersonItem'

export default {
  name: 'testperson',
  components: {
    myHeader: HeaderBack,
    myAddButton:AddButton,
    myTestPersonItem: TestPersonItem,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"我的检测人",
        HBR_icon: " ",
      },
      addbutton: {
        H_msg: "+新增检测人",
        H_type: "person",
      },
      isEmpty:false,
      testPersonItems: [],
    }
  },
  methods: {
    editfn(index){
      // 编辑页面跳转
      console.log('编辑'+index);
      let value = this.testPersonItems[index];
      this.$store.commit('setData',{key:'testPersonObj',value: value});
      this.$router.push({path:'/mainpage/self/EditPerson'});
    },
    deletefn(index) {
      const _this = this;
      this.$vux.confirm.show({
        // content: '确定删除吗？',
        title: '确定删除吗？',
        onConfirm () {
          // 开始动画
          comTools.showLoading(_this, '删除中...');
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(_this);
            if(true){
              _this.$vux.toast.show({
                type:'success',
                text:'删除成功...',
                width: '7.5em'
              });
              _this.testPersonItems.splice(index, 1);
            }
          }, 500)
        }
      });
    },
    ajax(){
      // 数据加载
      comTools.showLoading(this, '载入中...');
      setTimeout((data) => {
        // 数据加载结束动画
        comTools.hideLoading(this);
        this.testPersonItems = [];
        ['','',''].forEach((element,index,arr) => {
          let o = {
            id: 'testPersion',
            name: '龙龙',
            mobile: '18966688899',
            sex: '男',
            education: ['博士'],
            height: '188',
            weight: '88',
            birthday: '2000-01-01',
            iszz: '是',
            addressValue: ['北京市','北京市','朝阳区'],
            address: '天上人间',
          };
          this.testPersonItems.push(o);
        });
      }, 500)
    }
  },
  watch: {
    
  },
  created () {
    this.ajax();
  }
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.testperson{
  padding-top: .95rem;
}
.empty{
  height: 6rem;
  line-height: 6rem;
}
.editImage{
  background: url("../../assets/images/mine/edit.png") no-repeat .2rem center;
  background-size: 0.3rem 0.3rem;
}
.detImage{
  background: url("../../assets/images/mine/delete.png") no-repeat .2rem center;
  background-size: 0.3rem 0.3rem;
}
</style>