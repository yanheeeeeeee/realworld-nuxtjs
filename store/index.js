import Vue from "vue";
import Vuex from "vuex";
// 仅在服务端加载 cookieparser, 用于读取cookie
const cookieparser = process.server ? require("cookieparser") : undefined;

Vue.use(Vuex);
// 服务端渲染期间, vuex运行的都是同一个实例
// 此时需要使用一个函数来返回state, 类似于vue组件的data函数
// 以避免数据冲突
export const state = () => {
	return {
		user: null,
	};
};

export const mutations = {
	setUser(state, value) {
		state.user = value;
	},
};

export const actions = {
	// 初始化vuex容器, 并将服务端的数据传递到客户端
	// nuxtServerInit 是一个特殊的action, 它仅会在服务端渲染期间自动运行
	// 它的第二个参数为页面的上下文对象 context
	nuxtServerInit({ commit }, { req }) {
		let user = null;
    
		// 当在客户端登录过后, 会创建一个cookie, 其中包含了登录状态
		// 使用 cookieparser 把 cookie 字符串转为js对象
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie);

			try {
				parsed.user && (user = JSON.parse(parsed.user))
			} catch (error) {
				console.log(error);
			}
		}
		// 将登录状态存储到vuex中
		commit("setUser", user);
	},
};
