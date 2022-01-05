import request from "~~/utils/request";

/**
 * 获取首页全部内容
 * @param {string} tag 标签名
 * @param {string} author 作者
 * @param {string} favorited 
 * @param {string} limit 
 * @param {string} offset 
 * @returns 
 */
export const articles = params => {
	return request({
		method: "GET",
		url:"articles",
		params
	});
}


/**
 * 获取首页关注内容
 * @param {string} limit 
 * @param {string} offset 
 * @returns 
 */
 export const feedArticles = params => {
	return request({
		method: "GET",
		url:"articles/feed",
		params
	});
}
