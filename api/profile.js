import { request } from "@/plugins/request";

/**
 * 获取个人信息
 * @param {string} username 用户名
 * @returns 
 */
export const getProfile = username => {
	return request({
		method: "GET",
		url:`/profiles/${username}`
	});
}

/**
 * 关注用户
 * @param {string} username 用户名
 * @returns 
 */
export const followUser = username => {
	return request({
		method: "POST",
		url: `/profiles/${username}/follow`
	});
}

/**
 * 取消关注用户
 * @param {string} username 用户名
 * @returns 
 */
export const unfollowUser = username => {
	return request({
		method: "DELETE",
		url: `/profiles/${username}/follow`
	});
}
