<template lang="">
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<ul class="error-messages">
						<li v-if="errors">{{errors}}</li>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									v-model="user.image"
									type="text"
									placeholder="URL of profile picture"
									:disabled="isloading"
									required
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									v-model="user.username"
									type="text"
									placeholder="Your Name"
									:disabled="isloading"
									required
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									v-model="user.bio"
									rows="8"
									placeholder="Short bio about you"
									:disabled="isloading"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									v-model="user.email"
									type="text"
									placeholder="Email"
									:disabled="isloading"
									required
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									v-model="user.password"
									type="password"
									placeholder="Password"
									:disabled="isloading"
								/>
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right" :disabled="isloading">Update Settings</button>
						</fieldset>
					</form>
					<hr>
					<button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { updateUser } from "~~/api/user";
// 仅在客户端加载 js-cookie, 用于在客户端设置cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
	middleware: "auth",
	name: "SettingPage",
	data() {
		return {
			user: {},
			errors: "",
			isloading:false
		};
	},
	created() {
		const user = JSON.parse(JSON.stringify(this.$store.state.user));
		this.user = { ...user, password: "" };
	},
	methods: {
		async onSubmit() {
			try {
				this.isloading = true
				const { data } = await updateUser({user: this.user});
				// 重定向到首页
				this.$router.replace({name:'profile', params:{username:this.user.username}})
				
				// 更新vuex及cookie
				this.$store.commit('setUser', data.user)
				Cookie.set('user',JSON.stringify(data.user))
			} catch (error) {
				this.errors = error.response.data;
			}
			
			this.isloading = false
		},

		logout(){
				// 清空登录信息
				this.$store.commit('setUser', null)
				// 删除cookie
				Cookie.remove('user');
				// 重定向到首页
				this.$router.replace({name:'home'})
		}
	},
};
</script>
<style lang=""></style>
