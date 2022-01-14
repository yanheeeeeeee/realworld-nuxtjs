<template lang="">
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>

				<article-meta :article="article"></article-meta>
			</div>
		</div>

		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.body"></div>
			</div>

			<hr />

			<div class="article-actions">
				<article-meta :article="article" @favorite="handleLikeEnd" @follow="handleFollowUserEnd"></article-meta>
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<article-comment :article="article"></article-comment>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import articleMeta from "./components/articleMeta";
import articleComment from "./components/articleComment";
export default {
	name: "ArticlePage",
	components: {
		articleMeta,
		articleComment,
	},
	async asyncData({ params }) {
		const slug = params.slug;
		const { data: articleData } = await getArticle(slug);
		const { article } = articleData;
		// 使用MarkdownIt将markdown内容转换为html标签
		const md = new MarkdownIt();
		article.body = md.render(article.body);
		return {
			article,
		};
	},
	// 动态设置当前html页面的head 中的title和description
	// 以提高页面的SEO性能
	head() {
		return {
			title: `${this.article.title} - RealWorld`,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.article.description,
				},
			],
		};
	},
	methods: {
		async handleFollowUserEnd() {
			this.article.author.following = !this.article.author.following;
		},

		// 点赞
		async handleLikeEnd() {
			if (this.article.favorited) {
				this.article.favorited = false;
				this.article.favoritesCount--;
			} else {
				this.article.favorited = true;
				this.article.favoritesCount++;
			}
		},
	},
};
</script>
<style lang=""></style>
