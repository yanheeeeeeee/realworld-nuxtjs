import { request } from "@/plugins/request";

// 登录
export const login = data => {
	return request({
		method: "POST",
		url:"/users/login",
		data
	});
}

// 注册
export const register = data => {
	return request({
		method: "POST",
		url: "/users",
		data
	});
}

/**
 * 修改用户资料
 * @param {string} email 邮箱
 * @param {string} username 用户名
 * @param {string} bio 简介
 * @param {string} image 头像图片
 * @param {string} password 密码
 * @returns 
 */
export const updateUser = data => {
	return request({
		method: "PUT",
		url: "/user",
		data
	});
}
