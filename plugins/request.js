/**
 * 基于axios封装的请求模块
 */
import axios from "axios";

export const request = axios.create({
	baseURL: "https://api.realworld.io/api",
});

// 通过插件机制获得上下文对象
// 插件导出函数必须作为默认成员
export default ({ store }) => {
	// 请求拦截器
	request.interceptors.request.use(
		function (config) {
			// 为所有请求添加token
			const { user } = store.state;
			if (user && user.token) {
				config.headers.Authorization = `Token ${user.token}`;
			}
			return config;
		},
		function (error) {
			// 请求失败(此时请求还没有发出)
			return Promise.reject(error);
		}
	);

	// 响应拦截器
	// Add a response interceptor
	request.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			return Promise.reject(error);
		}
	);
};
