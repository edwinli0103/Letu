import Vue from 'vue'
import Vuex from 'vuex'

import allGoods from './allGoods'
import allOrder from './allOrder'
import allComments from './allComments'
import allAddress from './allAddress'

// vuex 配置
Vue.use(Vuex);

const state = { 
  imgUrl:'',
  // 路由跳转类型
  goToType: '',
  // 购物车数量
  goodsNum: 0,
  // 首页的轮播图id
  slideShowId: '',
  // 活动id
  activityId: '',
  // 商品分类id
  classId:'',
  // 商品id
  goodsID:'',
   // 所有商品
  allGoods: allGoods,
  // 所有的订单
  allOrder: allOrder,
  // 所有评论
  allComments: allComments,
  // 所有收货地址
  allAddress: allAddress,
  // 等待加入购物车商品数据
  selGoods:{
    id:'',
    specificsChild:'',
    selected: true,
    proNum: 0,
    price: 0,
    img: '',
  },
  // 购物车数据
  car: [],

  // 等待结算商品数据
  payGoods: [],
  // 订单id
  odderDetailType: 0,
  // 单个地址数据
  addressObj:{},
  // 单个检测人数据
  testPersonObj: {},
  // 单个订单数据
  orderObj: {},
  // 个人基本信息数据
  selfObj: {},

  // 购物车设置flag
  csFlag: true,
};
const mutations = {
  // 设置单个 key 的值
  setId (state,obj) {
    let key = obj.key;
    state[key] = obj.value;
  },
  // 重置单个 key 的值
  resetId (state,key) {
    state[key] = '';
  },
  // 设置对象数据
  setData(state, obj) {
    let key = obj.key;
    state[key] = obj.value;
  },
   // 设置对象数据
  carSet(state, obj) {
    // 购物车不存在
    if (!state.car) return; 

    let val = state.selGoods, param = 1; 
    if (obj.value) 
      val = obj.value, param = obj.value.proNum || 1;

    let gId = val.id, sId = val.specificsChild;
    
    // 业务判断处理
    let flag = true; 
    if(state.car.length > 0) {
      state.car.forEach((ele, index)=> {
        if (ele.id === gId && ele.specificsChild === sId) {
          flag = false; 
          if(obj.type) {
            ele['proNum'] += param;
            // 购物车总数相应变化
            state.goodsNum += param;
          } else {           
            // 购物车删除商品
            if(ele['proNum'] > param){
              ele['proNum'] -= param;
              state.goodsNum -= param;
            } else {
              state.goodsNum -= param
              state.car.splice(index,1);
            }
          }
        };
      });
    }
    // 没有该商品,就增加一条
    if(flag && obj.type) {
      state.goodsNum += param;
      val['proNum'] = param;
      state.car.push(val);
    }
    mutations.setId(state,{
      key:'csFlag',
      value: true
    });
  },
  // 购物车内商品数量
  add(state,obj){
    if (!state.csFlag) return;
    // 关闭阀门
    mutations.setId(state,{
      key:'csFlag',
      value: false
    });
    // state.goodsNum += 1;
    if (obj) {
      mutations.carSet(state, {type:true,value:obj});
    } else {
      mutations.carSet(state,{type:true,value:false});
    }
  },
  reduce(state,obj){
    if (!state.csFlag) return;
    // 关闭阀门
    mutations.setId(state,{
      key:'csFlag',
      value: false
    });
    // if (state.goodsNum > 0) {
    //   state.goodsNum -= 1;
    // }
    if (obj) {
      mutations.carSet(state, {type:false,value:obj});
    } else {
      mutations.carSet(state, {type:false,value:false});
    }
    
  },
  col() {
    alert(123);
  },
  
};
const actions = {
  
};


export default new Vuex.Store({
  state,
  mutations,
  actions   
});

