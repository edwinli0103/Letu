<template>
  <div class="address">
    <!-- 头部 -->
    <myHeader :header="header"></myHeader>
    <!-- 地址为空 -->
    <div class="empty txt_c bg_white marb_2" v-show="isEmpty">
      暂无收货地址，请新增地址哦~
    </div>
    <!-- 地址列表 -->
    <div v-for="(addressItem,index) in addressItems" :key="addressItem.id + index">
      <myAddressItem v-model="addressItems[index]"></myAddressItem>
      <div class="fx pad_2 marb_2 bg_white col_6">
        <div class="fx_2 fx" 
          :class="{'selected': addressItem.isDefault}" 
          @click="setAddress(addressItem.id,index)">
          <span class="fx_1 icon_all checked"></span>
          <span class="fx_3">{{addressItem.isDefault ? '默认地址':'设为默认地址'}}</span>
        </div>
        <div class="fx_1"></div>
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
import AddressItem from '../Common/AddressItem'

export default {
  components: {
    myHeader: HeaderBack,   
    myAddButton: AddButton,
    myAddressItem: AddressItem,
  },
  data () {
    return {
      header: {
        HBL_icon:"icon_back",
        HBC_text:"我的地址",
        HBR_icon: " ",
      },
      addbutton: {
        H_msg: "+新增地址",
        H_type: "address",
      },
      isEmpty:false,
      isSetDefault: false,
      addressItems: [],
    }
  },
  methods: {
    editfn(index){
      // 编辑页面跳转
      // console.log('编辑'+index);
      let value = this.addressItems[index];
      this.$store.commit('setData',{key:'addressObj',value: value});          
      this.$router.push({path:'/mainpage/self/editAddress'});
    },
    deletefn(index) {
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
              _this.addressItems.splice(index, 1);
            }
          }, 500)
        }
      });
    },
    setAddress (a_id, index) {
      this.addressItems.forEach( (ele, i) => {
        if (ele.isDefault) {
          if (index === i) {
            this.isSetDefault = true;
          }else {
            ele.isDefault = false;
          }
        }
      })
      if (this.isSetDefault) {
        this.isSetDefault = false;
        return;
      }
      // 开始动画
      comTools.showLoading(this, '设置中...');
      this.$http.get("interface/address/setDefault",{id:a_id})
        .then((data) => {
          // 结束动画
          comTools.hideLoading(this);
          if(data.success) {
            this.addressItems[index].isDefault = true;
            this.$vux.toast.show({
              type:'success',
              text:'设置默认地址成功...',
              width: '11.5em',
              isShowMask: true
            });
          }
        })
    },
    ajax(){
      // 数据加载
      comTools.showLoading(this, '载入中...');
      // 获取地址列表Ajax
        setTimeout(() => {
          let data = this.$store.state.allAddress;
          // 数据加载结束动画
          comTools.hideLoading(this);
          if(JSON.stringify(data)=='[]'){
            this.isEmpty = true;
          }
          this.addressItems = [];
          data.forEach((element,index,arr) => {
            let o = {
              id: element.id,
              name: element.acceptName,
              tel: element.mobile,
              addr: element.areas.join("")+element.address0,
              gender: '男',
              postcode: element.postcode,
              addressValue: element.areas,
              addressValueDetail: element.address0,
              isDefault: false
            };
            if (index === 0)
              o.isDefault = true;
            this.addressItems.push(o);
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
.address{
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
.checked {
  width: 0.4rem;
  background-image: url("../../assets/images/icon_selector.png");
  background-size: 0.25rem 0.25rem;
}
.selected .checked {
  background-image: url("../../assets/images/icon_selected.png");
  background-size: 0.25rem 0.25rem;
}
</style>