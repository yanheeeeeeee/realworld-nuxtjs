module.exports = {
	router: {
    // 自定义活动路由类名
    linkActiveClass:"active", 
		// 自定义路由表
		extendRoutes(routes, resolve) {
			// 清空nuxtJs默认生成的路由表
			routes.splice(0);
			routes.push(
				...[
					{
						path: "/",
						component: resolve(__dirname, "pages/layout"),
						children: [
              // 首页
              {
                name:'home',
                path:'',  // 默认子路由, 不需要填写路径
                component: resolve(__dirname, "pages/home"),
              },
              // 登录页
              {
                name:'login',  
                path:'login',  
                component: resolve(__dirname, "pages/login"),
              },
              // 注册页
              {
                name:'register',
                path:'register',  
                component: resolve(__dirname, "pages/login"),
              },
              // 用户个人资料页
              {
                name:'profile',
                path:'profile/:username',
                component: resolve(__dirname, "pages/profile"),
              },
              // 设置页
              {
                name:'setting',
                path:'setting',  
                component: resolve(__dirname, "pages/setting"),
              },
              // 创建文章
              {
                name:'editor',
                path:'editor',  
                component: resolve(__dirname, "pages/editor"),
              },
              // 创建文章
              {
                name:'article',
                path:'article/:slug',  
                component: resolve(__dirname, "pages/article"),
              },
            ],
					},
				]
			);
		},
	},

  // 注册插件
  plugins:['~/plugins/request.js']
};
