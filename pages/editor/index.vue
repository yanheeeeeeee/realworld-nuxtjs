<template lang="">
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<ul class="error-messages">
						<template v-for="(messages, key) in errors">
							<li v-for="(message, index) in messages" :key="index">{{key}} {{message}}</li>
						</template>
					</ul>
					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.title"
									:disabled="isloading"
									class="form-control form-control-lg"
									placeholder="Article Title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.description"
									:disabled="isloading"
									class="form-control"
									placeholder="What's this article about?"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									v-model="article.body"
									:disabled="isloading"
									rows="8"
									placeholder="Write your article (in markdown)"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.tagList"
									:disabled="isloading"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button class="btn btn-lg pull-xs-right btn-primary" :disabled="isloading">Publish Article</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { ceateArticle } from "@/api/article";
export default {
	middleware: "auth",
	name: "EditorPage",
	data() {
		return {
			article: {},
			isloading: false,
			errors:""
		};
	},
	mounted() {
		this.article = {
			title: "",
			description: "",
			body: "",
			tagList: ""
		};
	},
	methods:{
		async onSubmit(){
			try {
				this.isloading = true
				const article = {...this.article}
				article.tagList = article.tagList.split(' ')
				const { data } = await ceateArticle({article});
				// 重定向到文章页
				this.$router.replace({path:`/article/${data.article.slug}`})
			} catch (error) {
				this.errors = error.response.data.errors;
			}
			
			this.isloading = false
		}
	}
};
</script>
<style lang=""></style>
