<template>
  <div class="mainpage">
    <!-- 首页的路由入口 -->
    <div class="mainpage_view">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </div>

    <ul class="M_footmenu fx">
      <router-link to="/mainpage/home" tag='li' class="fx_1">
        <div class="M_home"></div>
        <div>首页</div>  
      </router-link>
      <router-link to="/mainpage/all" tag='li' class="fx_1">
        <div class="M_all"></div>
        <div>全部商品</div>
      </router-link>
      <router-link to="/mainpage/car" tag='li' class="fx_1">
        <div class="M_car pos-relative">
          <span v-show="productNum" class="pos-absolute font_24 txt_c">{{productNum}}</span>
        </div>
        <div class="">购物车</div>
      </router-link>
      <router-link to="/mainpage/self" tag='li' class="fx_1">
        <div class="M_self"></div>
        <div>我的</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mainpage',
  data () {
    return {
     
    }
  },
  computed:{
      productNum(){
        return this.$store.state.goodsNum;
      }
  }
}
</script>

<style scoped>
.mainpage {
  width: 100%;
  height: auto;
}
.mainpage_view {
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 1rem;
}
.M_footmenu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;
  text-align: center;
  border-top: 1px solid #e3e1e1;
  background-color: rgba(246,246,246,.95);
}
.M_footmenu li{
  height: 1rem;
}
.M_footmenu li div:first-child{
  height: .6rem;
  background-repeat: no-repeat;
  background-position: center .1rem;
  background-size: 0.5rem 0.5rem;
}
.M_footmenu li div:last-child{
  height: .4rem;
  line-height: .4rem;
}
.M_footmenu .active {
  color: #18A5A9;
}
.M_home {
  background-image: url("../assets/images/icon_home.png"); 
}
.active .M_home {
  background-image: url("../assets/images/icon_home_active.png");
}

.M_all {
  background-image: url("../assets/images/icon_all.png");
}
.active .M_all{
  background-image : url("../assets/images/icon_all_active.png");
}

.M_car {
  background-image: url("../assets/images/icon_car.png");
}
.M_car span {
  display: inline-block;
  top: 0.08rem;
  right: 0.2rem;
  width: 0.35rem;
  height: 0.35rem;
  line-height: 0.35rem;
  color: #fff;
  border-radius: 50%;
  background-color: #f00;
}
.active .M_car{
  background-image: url("../assets/images/icon_car_active.png");
}

.M_self {
  background-image: url("../assets/images/icon_self.png");
}
.active .M_self{
  background-image: url("../assets/images/icon_self_active.png");
}
</style>
