<template>
	<div>
		<template v-if="!loading">
			<div class="article-preview" v-for="article in articles" :key="article.slug">
				<div class="article-meta">
					<nuxt-link :to="`/profile/${article.author.username}`"><img :src="article.author.image" /></nuxt-link>
					<div class="info">
						<nuxt-link :to="`/profile/${article.author.username}`" class="author">{{
							article.author.username
						}}</nuxt-link>
						<span class="date">{{ article.updatedAt | data("MMM DD, YYYY") }}</span>
					</div>
					<button
						class="btn btn-outline-primary btn-sm pull-xs-right"
						:class="{ active: article.favorited }"
						:disabled="article.favoriteDisabled"
						@click="handleLike(article)"
					>
						<i class="ion-heart"></i> {{ article.favoritesCount }}
					</button>
				</div>
				<nuxt-link :to="`/article/${article.slug}`" class="preview-link">
					<h1>{{ article.title }}</h1>
					<p>{{ article.description }}</p>
					<span>Read more...</span>
					<ul class="tag-list" v-for="tag in article.tagList" :key="tag">
						<li class="tag-default tag-pill tag-outline">{{ tag }}</li>
						<li class="tag-default tag-pill tag-outline">{{ tag }}</li>
					</ul>
				</nuxt-link>
			</div>
		</template>

		<div class="article-preview" v-if="!articles.length || loading">
			{{ loading ? "Loading articles..." : "No articles are here... yet." }}
		</div>
	</div>
</template>
<script>
import { favorite, cancelFavorite } from "@/api/article";
export default {
	name: "articlePreview",
	props: {
		articles: {
			type: Array,
			required: true,
		},

		loading: {
			type: Boolean,
		},
	},

	methods: {
		// 点赞
		async handleLike(article) {
			article.favoriteDisabled = true;
			try {
				if (article.favorited) {
					await cancelFavorite(article.slug);
					article.favorited = false;
					article.favoritesCount--;
				} else {
					await favorite(article.slug);
					article.favorited = true;
					article.favoritesCount++;
				}
			} catch (error) {
				console.log(error);
			}
			article.favoriteDisabled = false;
		},
	},
};
</script>
<style lang=""></style>
