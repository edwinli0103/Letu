import Vue from 'vue'
import App from './App'
import store from './store/store'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import http from './untils/http'
import { AlertPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import routesUrl from './router/routerUrl'
// 引入基础的js文件
import './assets/js/phone.js'
import './assets/js/common.js'

//路由配置
Vue.use(VueRouter)
const router = new VueRouter({
  // 路由跳转配置
  routes: routesUrl,
  // 路由模式  
  // mode: 'history',
  // 当前活跃的点解链接 class
  linkActiveClass: 'active',
  // 环境配置
  // strict: process.env.NODE_ENV !== 'production',
  //保持回来的状态
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		  return { x: 0, y: to.meta.savedPosition ||0}
    }
  }
})
// 路由拦截
// router.beforeEach((to, from, next) => {
//   // let token = router.app.$storage.fetch("token");
//   // let needAuth = to.matched.some(item => item.meta.login);
//   // if(!token && needAuth) return next({path: "/login"});
//   console.log(to);
//   console.log(from);
//   if(true) return next({path: "/mainpage/home"});
//   next();
// });
// 是否提示 开发环境
Vue.config.productionTip = false

// http 请求配置
Vue.prototype.$http = http;

// 点击延迟配置
FastClick.attach(document.body)

// 弹框和提示配置
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)


/* eslint-disable no-new */
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
