<template>
  <div class="collection">
    <myHeader :header="header" @isEdited="isEditedCollection"></myHeader>
    <!-- 收藏列表 -->
    <div v-for="(collectionItem,index) in collectionItems" :key="collectionItem.id">
      <myCollectionItem ref="collectionItem" v-model="collectionItems[index]"></myCollectionItem>
    </div>
    <!-- 列表为空 -->
    <div class="empty txt_c" v-show="collectionEmpty">
      您没有已收藏的商品哦~
    </div>
    <!-- 底部的菜单 -->
    <div class="bottom pos-fixed col_9" v-show="showBottom">
      <div class="fx font_30">
        <div class="fx_2 fx" :class="{'selectedAll':selectedAll}" @click="selectedAllFn()">
          <div class="fx_2 icon_all icon_checked"></div>
          <div class="fx_3">{{!selectedAll ? '全选' : '取消'}}</div>
        </div>
        <div class="fx_2">
        </div>
        <div class="fx_2 txt_c delete" @click="deletefn()">删除</div>
      </div>      
    </div>
  </div>
</template>

<script>
import HeaderBack from '../Common/HeaderBack'
import CollectionItem from '../Common/CollectionItem'

export default {
  components: {
    myHeader: HeaderBack,
    myCollectionItem: CollectionItem,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"商品收藏",
        HBR_icon: " ",
        HBR_show: true,
        HBR_type: "collection",
        HBR_show_long:true,
        HBR_text_long:"编辑",
      },
      showBottom: false,
      collectionItems: [],
      selectedAll: false,
      idList: [],
      collectionEmpty: false,
    }
  },
  methods: {
    selectedAllFn() {
      let selected = this.selectedAll;
      this.selectedAll = !selected;
      this.collectionItems.forEach(function(item,index){
        item.selected = !selected;
      }); 
    },
    isEditedCollection (isShow) {
      let list = this.collectionItems;
      if(JSON.stringify(list)=='[]'){
        return;
      }

      this.$refs.collectionItem.forEach((element)=>{
        element.isShowChecked(isShow);
      })
     
      this.showBottom = isShow;
    },
    deletefn() {
      const _this = this;

      this.$vux.confirm.show({
        // content: '确定删除吗？',
        title: '确定删除吗？',
        onConfirm () {
          // 开始动画
          comTools.showLoading(_this, '删除中...');
          // 删除Ajax
          setTimeout((data) => {
            // 结束动画
            comTools.hideLoading(_this);
            if(true){
              _this.$vux.toast.show({
                type:'success',
                text:'删除成功...',
                width: '7.5em'
              });
              setTimeout(function() {
                // _this.isEditedCollection(true);
              }, 2000)
            }
          }, 500)
        }
      });

    },
    ajax(){
      // 数据加载
      comTools.showLoading(this, '载入中...');
      // 获取收藏列表
      setTimeout(() => {
        // 数据加载结束动画
        comTools.hideLoading(this);
        let data = this.$store.state.allGoods, self = this;
        data.forEach((element,index,arr) => {
          let o = {};
          if (!element.collection)
            return
          o.id = element.ID;
          o.name = element.NAME;
          o.price = element.MARKET_PRICE;
          o.smallImg = element.SMALL_IMG;
          o.beforePrice = 999;
          o.selected = false;
          self.collectionItems.push(o);
        });
        console.log(this.collectionItems);
      }, 500)
    }
  },
  watch: {
    collectionItems: {
      handler: function (curVal, oldVal) {
        let self = this; 
        self.selectedAll = true;
        self.idList = [];
        curVal.forEach(function(item,index) {
          if(!item.selected) {
            self.selectedAll = false;
          } else {
            self.idList.push(item.id);
          }
          
        })
      },
      deep: true
    }
  },
  created() {
    this.ajax();
  },
}
</script>

<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.collection{
  padding-top: .85rem;
  font-size: .24rem;
}
/* 底部菜单栏 */
.bottom {
  left: 0;
  bottom: 0;
  height: 0.8rem;
  line-height: 0.8rem;
  border-top: 1px solid #e3e1e1;
  background-color: #f9f9f9; 
}
.bottom .fx_col div:first-child {
  line-height: 0.45rem;
}
.bottom .fx_col div:last-child {
  line-height: 0.35rem;
}
.delete {
  color: #fff;
  background-color: #18a6aa;
}
.icon_checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.4rem 0.4rem;
}
.selectedAll .icon_checked {
  background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.4rem 0.4rem;
}
.empty{
  height: 6rem;
  line-height: 6rem;
}
</style>