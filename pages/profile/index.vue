<template lang="">
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>
							{{ profile.bio }}
						</p>

						<button v-if="myself" class="btn btn-sm btn-outline-secondary action-btn" @click="toSetting">
							<i class="ion-gear-a"></i>
							&nbsp; Edit Profile Settings
						</button>

						<button
							v-else
							class="btn btn-sm btn-outline-secondary action-btn"
							:disabled="profile.followDisabled"
							@click="followUser"
						>
							<i class="ion-plus-round"></i>
							&nbsp; {{ profile.following ? "Unfollow" : "Follow" }}Follow {{ profile.username }}
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<span
									class="nav-link"
									:class="{ active: tab === 'my_articles' }"
									@click="handleTabChange('my_articles')"
									>My Articles</span
								>
							</li>
							<li class="nav-item">
								<span
									class="nav-link"
									:class="{ active: tab === 'favorited_articles' }"
									@click="handleTabChange('favorited_articles')"
									>Favorited Articles</span
								>
							</li>
						</ul>
					</div>

					<article-preview :articles="articles" :loading="articleLoading"></article-preview>
				</div>
			</div>
			<nav v-if="totalPage > 1">
				<ul class="pagination offset-md-1">
					<li class="page-item" :class="{ active: pageNum === page }" v-for="pageNum in totalPage" :key="pageNum">
						<span
							class="page-link"
							@click="handlePageChange(pageNum)"
							>{{ pageNum }}</span
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>
<script>
import { getProfile, followUser, unfollowUser } from "@/api/profile";
import { getArticles } from "@/api/article";
import articlePreview from "@/components/articlePreview";
export default {
	// 路由跳转当前页面时会自动调用该中间件进行校验
	middleware: "auth",
	name: "UserProfilePage",
	watchQuery: ["page", "tab"],
	components: {
		articlePreview,
	},
	async asyncData({ params, store }) {
		try {
			const username = params.username;
			const myself = params.username === store.state.user.username;
			let profile;
			if (myself) {
				profile = { ...store.state.user };
			} else {
				const { data } = await getProfile(username);
				profile = data.profile;
				profile.followDisabled = false;
			}
			return {
				profile,
				myself,
			};
		} catch (error) {
			console.log(error);
		}
	},
	data() {
		return {
			tab: "my_articles",
			page: 1,
			articles: [],
			articlesCount: 0,
			limit: 20,
			articleLoading: false,
		};
	},
	computed: {
		// 总页数
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit) || 1;
		},
	},
	mounted() {
		this.getArticles();
	},

	methods: {
		toSetting() {
			this.$router.push({ name: "setting" });
		},

		async followUser() {
			try {
				this.profile.followDisabled = true;
				this.profile.following ? await unfollowUser(this.profile.username) : await followUser(this.profile.username);
				this.profile.following = !this.profile.following;
			} catch (error) {}
			this.profile.followDisabled = false;
		},

		// 获取文章列表
		async getArticles() {
			this.articleLoading = true;
			try {
				const params = {
					limit: this.limit,
					offset: (this.page - 1) * this.limit,
				};
				params[this.tab === "favorited_articles" ? "favorited" : "author"] = this.profile.username;
				const { data } = await getArticles(params);

				this.articles = data.articles;
				this.articlesCount = data.articlesCount;
			} catch (error) {}
			this.articleLoading = false;
		},

		//tab切换事件
		handleTabChange(val) {
			this.tab = val;
			this.page = 1;
			this.getArticles();
		},

		//page切换事件
		handlePageChange(val) {
			this.page = val;
			this.getArticles();
		},
	},
};
</script>
<style lang=""></style>
