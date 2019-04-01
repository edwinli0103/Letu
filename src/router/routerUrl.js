export default [ 
    {path: '/', redirect:'/mainpage'},
    {
      path: '/mainpage',
			name: 'mainpage',
			redirect:'/mainpage/home',
      component:function (MainPage) {
        require(['../components/MainPage'], MainPage)
			},
			meta:{
				keepAlive: true
			},
      children:[
        {
          path: '/mainpage/home',
					name:'home',
					component: function (Home) {
         	 require(['../components/Home/Home'], Home)
					},
					meta:{
						keepAlive:true
					}
				},
				{
					path: '/mainpage/all',
					name:'all',
					component: function (All) {
						require(['../components/AllProduct/All'], All)
					},
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/mainpage/car',
					name:'car',
					component: function (Car) {
						require(['../components/Car/Car'], Car)
					},
					meta: {
						keepAlive: true
					}
				},
				{
					path: '/mainpage/self',
					name:'self',
					component: function (Self) {
						require(['../components/Self/Self'], Self)
					},
					meta: {
						keepAlive: true
					}
				}
      ]
		},
		// 搜索路由
		{
			path: '/mainpage/all/search',
			name: 'search',
			component: function (Search) {
				require(['../components/AllProduct/Search'], Search)
			},
			meta: {
				keepAlive: true
			}
		},
		// 更多热卖商品路由
		{
			path: '/moreHot/:type',
			name: 'moreHot',
			component: function (MoreHot) {
				require(['../components/Home/MoreHot'], MoreHot)
			}
		},
		// 所有活动路由
		{
			path: '/mainpage/home/allActivity',
			name: 'allActivity',
			component: function (AllActivity) {
				require(['../components/Activity/AllActivity'], AllActivity)
			}
		},
		// 活动详情路由
		{
      path: '/mainpage/home/allActivity/ActDetail/:activityId',
			name: 'actDetail',
      component: function (ActDetail) {
				require(['../components/Activity/ActDetail'], ActDetail)
			}
		},
		// 商品分类路由
		{
			path: '/classify',
			name: 'classify',
			component: function (Classify) {
				require(['../components/AllProduct/Classify'], Classify)
			}
		},
		 //商品详情路由  
		{
      path: '/goodsdetail/:goodsID',
			name: 'goodsDetail',
			redirect:'/goodsdetail/detail/:goodsID',
      component: function (GoodsDetail) {
				require(['../components/GoodsDetail/GoodsDetail'], GoodsDetail)
			},
			meta:{
				keepAlive: true
			},
			children: [
				{
          path: '/goodsdetail/detail/:goodsID',
					name:'G_detail',
					component: function (Detail) {
         	 require(['../components/GoodsDetail/Detail'], Detail)
					},
					meta: {
						keepAlive: true
					}					
				},
				{
          path: '/goodsdetail/comments/:type/:goodsID',
					name:'G_comments',
					component: function (Comments) {
         	 require(['../components/GoodsDetail/Comments'], Comments)
					},
					meta: {
						keepAlive: true
					}					
				},

			]
		},
		// 结算确认路由
		{
      path: '/payMent',
			name: 'payMent',
      component: function (PayMent) {
				require(['../components/PayMent/PayMent'], PayMent)
			},
			meta: {
				keepAlive: false
			}
		},
		// 结算结束路由
		{
			path: '/payMent/:type/:orderID',
			name: 'paySuccess',
			component: function (PaySuccess) {
				require(['../components/PayMent/PaySuccess'], PaySuccess)
			},
			meta: {
				keepAlive: false
			}
		},
		// 盒子激活路由
		{
      path: '/useBox',
			name: 'useBox',
      component: function (UseBox) {
				require(['../components/UseBox/UseBox'], UseBox)
			},
			meta:{
				keepAlive: true
			},
		},
		// *****个人中心路由*****
		// 我的-会员中心
		{
			path: '/mainpage/self/myself',
			name:'myself',
			component: function (Myself) {
				require(['../components/Self/Myself'], Myself)
			}
		},
		// 我的-订单列表
		{
			path: '/mainpage/self/orderlist/:type',
			name:'orderlist',
			component: function (OrderList) {
				require(['../components/Self/OrderList'], OrderList)
			}
		},
		// 我的-订单详情
		{
			path: '/mainpage/self/orderdetail/:orderID',
			name:'orderdetail',
			component: function (OrderDetail) {
				require(['../components/Self/OrderDetail'], OrderDetail)
			}
		},
		// 我的-订单-运输物流
		{
			path: '/mainpage/self/logistics',
			name: 'logistics',
			component: function (Logistics) {
				require(['../components/Self/Logistics'], Logistics)
			}
		},
		// 我的-订单-发表评价
		{
		  path: '/mainpage/self/evaluate',
		  name: 'evaluate',
		  component: function (Evaluate) {
		    require(['../components/Self/Evaluate'], Evaluate)
		  }
		},
		// 我的-检测单
		{
			path: '/mainpage/self/testsheet/:type',
			name:'testsheet',
			component: function (TestSheet) {
				require(['../components/Self/TestSheet'], TestSheet)
			}
		},
		// 我的-检测单详情
		{
			path: '/mainpage/self/sheetdetail/:sheetID',
			name: 'sheetdetail',
			component: function (SheetDetail) {
				require(['../components/Self/SheetDetail'], SheetDetail)
			}
		},
		// 我的-检测人
		{
			path: '/mainpage/self/testperson',
			name:'testperson',
			component: function (TestPerson) {
				require(['../components/Self/TestPerson'], TestPerson)
			}
		},
		// 我的-添加检测人
		{
			path: '/mainpage/self/addperson',
			name:'addperson',
			component: function (AddPerson) {
				require(['../components/Self/AddPerson'], AddPerson)
			}
		},
		// 我的-修改检测人
		{
			path: '/mainpage/self/editperson',
			name: 'editperson',
			component: function (EditPerson) {
				require(['../components/Self/EditPerson'], EditPerson)
			}
		},
		// 我的-在线报告查询
		{
			path: '/mainpage/self/onlinequery',
			name:'onlinequery',
			component: function (OnlineQuery) {
				require(['../components/Self/OnlineQuery'], OnlineQuery)
			}
		},
		// 我的-收货地址
		{
			path: '/mainpage/self/address',
			name:'address',
			component: function (Address) {
				require(['../components/Self/Address'], Address)
			}
		},
		// 我的-添加收货地址
		{
			path: '/mainpage/self/addaddress',
			name:'addaddress',
			component: function (AddAddress) {
				require(['../components/Self/AddAddress'], AddAddress)
			}
		},
		// 我的-修改收货地址
		{
			path: '/mainpage/self/editAddress',
			name: 'editAddress',
			component: function (EditAddress) {
				require(['../components/Self/EditAddress'], EditAddress)
			}
		},
		// 我的-商品收藏
		{
			path: '/mainpage/self/collection',
			name:'collection',
			component: function (Collection) {
				require(['../components/Self/Collection'], Collection)
			}
		},
		// 我的-优惠券
		{
			path: '/mainpage/self/coupon',
			name:'coupon',
			component: function (Coupon) {
				require(['../components/Self/Coupon'], Coupon)
			}
		},
		// 我的-优惠券使用说明
		{			
			path: '/mainpage/self/couponexplain',
			name:'couponexplain',
			component: function (CouponExplain) {
				require(['../components/Self/CouponExplain'], CouponExplain)
			}
		},
		// 我的-意见反馈
		{
			path: '/mainpage/self/feedback',
			name:'feedback',
			component: function (Feedback) {
				require(['../components/Self/Feedback'], Feedback)
			}
		},
		// 我的-帮助中心
		{
			path: '/mainpage/self/help',
			name:'help',
			component: function (Help) {
				require(['../components/Self/Help'], Help)
			}
		},
		// 我的-帮助中心-常见问题
		{
			path: '/mainpage/self/question',
			name:'question',
			component: function (Question) {
				require(['../components/Self/Question'], Question)
			}
		},
		// 我的-帮助中心-关于我们
		{
			path: '/mainpage/self/aboutus',
			name:'aboutus',
			component: function (AboutUs) {
				require(['../components/Self/AboutUs'], AboutUs)
			}
		},
		//健康调查问卷路由   
		{
			path: '/khq',
			name: 'khq',
			component: function (KHQ) {
				require(['../components/Other/KHQ'], KHQ)
			}
		},
		//手机验证页面路由
		{
			path: '/register',
			name: 'register',
			component: function (Register) {
				require(['../components/Other/Register'], Register)
			}
		},
    //其他页面路由   
    {
      path: '/hello1',
      name: 'hello1',
      component: function (Hello1) {
				require(['../components/HelloFromVux'], Hello1)
	  	}
		},
		 //其他页面路由   
		{
      path: '/hello2',
      name: 'hello2',
      component: function (Hello2) {
				require(['../components/HelloWorld'], Hello2)
			}
		},
		//其他页面路由   
		{
			path: '/test',
			name: '',
			component: function (ScrollTemplate) {
				require(['../components/Common/ScrollTemplate'], ScrollTemplate)
			}
		},
		//其他页面路由   
		{
			path: '/upload',
			name: 'upload',
			component: function (Upload) {
				require(['../components/Other/Upload'], Upload)
			}
		},
  ]