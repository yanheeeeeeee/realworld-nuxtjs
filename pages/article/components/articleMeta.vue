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
		<template v-if="!myself">
			<!-- 关注作者 -->
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
			<!-- 喜欢文章 -->
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
		</template>

		<template v-if="myself">
			<!-- 编辑文章 -->
			<nuxt-link :to="`/editor/${article.slug}`">
				<button class="btn btn-outline-secondary btn-sm"><i class="ion-edit"></i> Edit Article</button>
			</nuxt-link>

			<!-- 删除文章 -->
			<button class="btn btn-outline-danger btn-sm" :disabled="delDisabled" @click="delArticle">
				<i class="ion-trash-a"></i> Delete Article
			</button>
		</template>
	</div>
</template>
<script>
import { followUser, unfollowUser } from "@/api/profile";
import { favorite, cancelFavorite, delArticle } from "@/api/article";
import { mapState } from "vuex";
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
			myself: false,
			delDisabled: false
		};
	},
	computed:{
		...mapState(['user'])
	},
	created(){
		this.myself = this.user && this.article.author.username === this.user.username
	},
	methods: {
		async handleFollowUser() {
			if(!this.user){
				return this.$router.push({name:'login'})
			}
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
			if(!this.user){
				return this.$router.push({name:'login'})
			}
			this.favoriteDisabled = true;
			try {
				this.article.favorited ? await cancelFavorite(this.article.slug) : await favorite(this.article.slug);
				this.$emit("favorite");
			} catch (error) {
				console.log(error);
			}
			this.favoriteDisabled = false;
		},

		async delArticle(){
			this.delDisabled = true
			try {
				await delArticle(this.article.slug)
				this.$router.replace({name:'home'})
			} catch (error) {}
			this.delDisabled = false
		}
	},
};
</script>
<style lang=""></style>
