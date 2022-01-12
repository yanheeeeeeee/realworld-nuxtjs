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
								<a class="nav-link active" href="">My Articles</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Favorited Articles</a>
							</li>
						</ul>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
							<div class="info">
								<a href="" class="author">Eric Simons</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 29</button>
						</div>
						<a href="" class="preview-link">
							<h1>How to build webapps that scale</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
						</a>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
							<div class="info">
								<a href="" class="author">Albert Pai</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 32</button>
						</div>
						<a href="" class="preview-link">
							<h1>The song you won't ever stop singing. No matter how hard you try.</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
							<ul class="tag-list">
								<li class="tag-default tag-pill tag-outline">Music</li>
								<li class="tag-default tag-pill tag-outline">Song</li>
							</ul>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getProfile, followUser, unfollowUser } from "@/api/profile";
export default {
	// 路由跳转当前页面时会自动调用该中间件进行校验
	middleware: "auth",
	name: "UserProfilePage",
	async asyncData({ params, store }) {
		try {
			const username = params.username;
			console.log(store.state.user.username);
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
	},
};
</script>
<style lang=""></style>
