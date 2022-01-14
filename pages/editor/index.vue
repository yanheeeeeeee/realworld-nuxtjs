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
					<form>
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
									v-model="tag"
									@keyup.enter="addTag"
									:disabled="isloading"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list">
									<span v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill ng-binding ng-scope">
                  	<i class="ion-close-round" @click="removeTag(index)"></i>
                  	{{tag}}
                	</span>
								</div>
							</fieldset>
						</fieldset>
					</form>
					<button class="btn btn-lg pull-xs-right btn-primary" @click="sava" :disabled="isloading">Publish Article</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getArticle, ceateArticle, updateArticle } from "@/api/article";
export default {
  middleware: "auth",
  name: "EditorPage",
  data() {
    return {
      slug: "",
      article: {},
      tag: "",
      isloading: false,
      errors: "",
    };
  },
  async created() {
    this.slug = this.$route.params.slug;
    let article;
    if (this.slug) {
      const { data: articleData } = await getArticle(this.slug);
      article = articleData.article;
    }
    console.log(article);
    this.article = {
      title: article.title || "",
      description: article.description || "",
      body: article.body || "",
      tagList: article.tagList || "",
    };
  },
  mounted() {},
  methods: {
    async sava() {
      try {
        this.isloading = true;
        const article = { ...this.article };

        const { data } = this.slug
          ? await updateArticle(this.slug, { article })
          : await ceateArticle({ article });
        // 重定向到文章页
        this.$router.replace({ path: `/article/${data.article.slug}` });
      } catch (error) {
        this.errors = error.response.data.errors;
      }

      this.isloading = false;
    },

		addTag(){
			this.article.tagList.push(this.tag)
			this.tag = ""
		},

		removeTag(index){
			if(this.isloading) return 
			this.article.tagList.splice(index, 1)
		}
  },
};
</script>
<style lang=""></style>
