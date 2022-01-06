<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<a class="nav-link disabled" href="">Your Feed</a>
							</li>
							<li class="nav-item">
								<a class="nav-link active" href="">Global Feed</a>
							</li>
						</ul>
					</div>

					<div class="article-preview" v-for="article in articles" :key="article.slug">
						<div class="article-meta">
							<nuxt-link :to="'/profile/' + article.author.username"><img :src="article.author.image" /></nuxt-link>
							<div class="info">
								<nuxt-link :to="'/profile/' + article.author.username" class="author">{{
									article.author.username
								}}</nuxt-link>
								<span class="date">{{ article.updatedAt }}</span>
							</div>
							<button
								class="btn btn-outline-primary btn-sm pull-xs-right"
								:class="{ active: article.favorited }"
								@click="handleLike"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link to="" class="preview-link">
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
						</nuxt-link>
					</div>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link v-for="tag in tags" :to="`/?tag=${tag}`" :key="tag" class="tag-pill tag-default">{{
								tag
							}}</nuxt-link>
						</div>
					</div>
				</div>
			</div>

			<nav>
				<ul class="pagination">
					<li class="page-item" :class="{ active: pageNum === page }" v-for="pageNum in totalPage" :key="pageNum">
						<nuxt-link class="page-link" :to="`/?page=${pageNum}&tag=${$route.query.tag}`">{{ pageNum }}</nuxt-link>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>
<script>
import { getArticles, getTag } from "~~/api/article";
export default {
	name: "HomePage",
	// 默认情况下, query参数改变不会重新触发asyncData方法
	// 可以使用watchQuery属性来监听query参数
	// 当被监听的query参数变更时, 会重新调用组件中的所有方法(asyncData, fetch等)
	watchQuery: ["page","tag"],
	// asyncData 会在服务端渲染或者路由更新之前被调用
	// 它的第一个参数为上下文context
	// 它返回的数据会合并到data中
	async asyncData({ query }) {
		try {
			// 获取首页全部内容
			const page = parseInt(query.page || 1);
			const tag = query.tag || undefined;
			const limit = 2;
			const getArticlesTask = getArticles({
				limit: limit,
				offset: (page - 1) * limit,
				tag
			});
			

			// 获取文章标签列表
			// 标签列表需要SEO, 所以需要放到asyncData中
			const getTagTask = getTag();

			// 使用Promise.all方法并行请求, 提高加载速度
			const [articleRes, tagRes] = await Promise.all([getArticlesTask, getTagTask]);
			const { articles, articlesCount } = articleRes.data;
			const { tags } = tagRes.data;

			return {
				articles,
				articlesCount,
				limit,
				page,
				tags,
			};
		} catch (error) {
			console.log(error);
		}
	},
	computed: {
		// 总页数
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit);
		},
	},
	methods: {
		// 点赞
		handleLike() {},
	},
};
</script>
<style></style>
