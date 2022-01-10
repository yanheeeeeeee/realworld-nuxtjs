<template>
	<div>
		<form class="card comment-form">
			<div class="card-block">
				<textarea class="form-control" placeholder="Write a comment..." rows="3" :disabled="!user"></textarea>
			</div>
			<div class="card-footer">
				<img v-if="user" :src="user.image" class="comment-author-img" />
				<button class="btn btn-sm btn-primary" :disabled="!user">Post Comment</button>
			</div>
		</form>

		<div class="card" v-for="comment in comments" :key="comment.id">
			<div class="card-block">
				<p class="card-text">{{ comment.body }}</p>
			</div>
			<div class="card-footer">
				<nuxt-link
					class="comment-author"
					:to="{
						name: 'profile',
						params: {
							username: comment.author.username,
						},
					}"
				>
					<img :src="comment.author.image" class="comment-author-img" />
				</nuxt-link>
				&nbsp;
				<nuxt-link
					class="comment-author"
					:to="{
						name: 'profile',
						params: {
							username: comment.author.username,
						},
					}"
				>
					{{ comment.author.username }}
				</nuxt-link>
				<span class="date-posted">{{ comment.updateAt | data("MMM DD, YYYY") }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { getArticleComments } from "@/api/article";
import { mapState } from "vuex";
export default {
	name: "articleComment",
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			comments: [],
		};
	},
	computed: {
		...mapState({
      user: state => state.user
    })
	},
	// 文章评论不需要seo, 可以在mounted中获取
	async mounted() {
		const { data } = await getArticleComments(this.article.slug);
		console.log(data);
		this.comments = data.comments;
	},
};
</script>
<style lang=""></style>
