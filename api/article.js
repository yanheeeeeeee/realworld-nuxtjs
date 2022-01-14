import { request } from "@/plugins/request";

/**
 * 获取首页全部内容
 * @param {string} tag 标签名
 * @param {string} author 作者
 * @param {string} favorited 
 * @param {string} limit 
 * @param {string} offset 
 * @returns 
 */
export const getArticles = params => {
	return request({
		method: "GET",
		url:"/articles",
		params
	});
}


/**
 * 获取首页关注内容
 * @param {string} limit 
 * @param {string} offset 
 * @returns 
 */
 export const getFeedArticles = params => {
	return request({
		method: "GET",
		url:"/articles/feed",
		params
	});
}

/**
 * 获取标签列表
 * @returns 
 */
 export const getTag = params => {
	return request({
		method: "GET",
		url:"/tags",
		params
	});
}

/**
 * 添加点赞
 * @param {string} slug 文章slug
 * @returns 
 */
 export const favorite = slug => {
	return request({
		method: "POST",
		url:`/articles/${slug}/favorite`
	});
}


/**
 * 取消点赞
 * @param {string} slug 文章slug
 * @returns 
 */
 export const cancelFavorite = slug => {
	return request({
		method: "DELETE",
		url:`/articles/${slug}/favorite`
	});
}


/**
 * 获取文章详情
 * @param {string} slug 文章slug
 * @returns 
 */
 export const getArticle = slug => {
	return request({
		method: "GET",
		url:`/articles/${slug}`
	});
}


/**
 * 获取文章评论
 * @param {string} slug 文章slug
 * @returns 
 */
 export const getArticleComments = slug => {
	return request({
		method: "GET",
		url:`/articles/${slug}/comments`
	});
}


/**
 * 添加文章
 * @param {string} title
 * @param {string} description
 * @param {string} body
 * @param {array} tagList
 * @returns 
 */
 export const ceateArticle = data => {
	return request({
		method: "POST",
		url:`/articles`,
		data
	});
}


/**
 * 编辑文章
 * @param {string} title
 * @param {string} description
 * @param {string} body
 * @param {array} tagList
 * @returns 
 */
 export const updateArticle = (slug, data) => {
	return request({
		method: "PUT",
		url:`/articles/${slug}`,
		data: data
	});
}