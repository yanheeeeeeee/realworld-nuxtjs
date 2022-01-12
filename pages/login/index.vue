<template lang="">
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
					<p class="text-xs-center">
						<nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
						<nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
					</p>

					<ul class="error-messages">
						<template v-for="(messages, key) in errors">
							<li v-for="(message, index) in messages" :key="index">{{key}} {{message}}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset class="form-group" v-if="!isLogin">
							<input
								class="form-control form-control-lg"
								v-model="user.username"
								type="text"
								placeholder="Your Name"
								required
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								v-model="user.email"
								type="email"
								placeholder="Email"
								required
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								v-model="user.password"
								type="password"
								placeholder="Password"
								required
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">{{ isLogin ? "Sign in" : "Sign up" }}</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie, 用于在客户端设置cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
	middleware:"no-auth",
	name: "LoginPage",
	data() {
		return {
			user: {
				username: "",
				email: "",
				password: "",
			},
			errors: "",
		};
	},
	computed: {
		isLogin() {
			return this.$route.name === "login";
		},
	},
	methods: {
		async onSubmit() {
			try {
				const { data } = await (this.isLogin ? login({ user: this.user }) : register({ user: this.user }));
				// 将登录状态存入vuex中, 方便全局取用
				this.$store.commit('setUser', data.user)
				
				// 将登录状态存入Cookie中, 防止刷新页面时数据丢失
				// 同时可以使服务端能读取到登录状态
				Cookie.set('user',JSON.stringify(data.user))
				this.$router.push("/");
			} catch (error) {
				console.dir(error);
				this.errors = error.response.data.errors;
			}
		},
	},
};
</script>
<style lang=""></style>
