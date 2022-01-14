<template lang="">
	<div class="article-meta">
		<nuxt-link
			:to="{
				name: 'profile',
				params: {
					username: article.author.username,
				},
			}"
		>
			<img :src="article.author.image" />
		</nuxt-link>
		<div class="info">
			<nuxt-link
				:to="{
					name: 'profile',
					params: {
						username: article.author.username,
					},
				}"
				class="author"
			>
				{{ article.author.username }}
			</nuxt-link>
			<span class="date">{{ article.createdAt | data("MMM DD, YYYY") }}</span>
		</div>
		<button
			class="btn btn-sm btn-outline-secondary"
			:class="{ active: article.author.following }"
			:disabled="followDisabled"
			@click="handleFollowUser"
		>
			<i class="ion-plus-round"></i>
			&nbsp; {{ article.author.following ? "Unfollow" : "Follow" }} {{ article.author.username }}
			<span class="counter">({{ article.author.followedBy.length }})</span>
		</button>
		&nbsp;&nbsp;
		<button
			class="btn btn-sm btn-outline-primary"
			:class="{ active: article.favorited }"
			:disabled="favoriteDisabled"
			@click="handleLike"
		>
			<i class="ion-heart"></i>
			&nbsp; {{ article.favorited ? "Unfavorite" : "Favorite" }} Post
			<span class="counter">({{ article.favoritesCount }})</span>
		</button>
	</div>
</template>
<script>
import { followUser, unfollowUser } from "@/api/profile";
import { favorite, cancelFavorite } from "@/api/article";
export default {
	name: "aticleMeta",
	props: {
		article: {
			type: Object,
			require: true,
		},
	},
	data() {
		return {
			followDisabled: false,
			favoriteDisabled: false,
		};
	},
	methods: {
		async handleFollowUser() {
			this.followDisabled = true;
			try {
				this.article.author.following
					? await unfollowUser(this.article.author.username)
					: await followUser(this.article.author.username);
				this.$emit("follow");
			} catch (error) {}
			this.followDisabled = false;
		},

		// 点赞
		async handleLike() {
			this.favoriteDisabled = true;
			try {
				this.article.favorited ? await cancelFavorite(this.article.slug) : await favorite(this.article.slug);
				this.$emit("favorite");
			} catch (error) {
				console.log(error);
			}
			this.favoriteDisabled = false;
		},
	},
};
</script>
<style lang=""></style>
