<template>
	<div>
		<div class="card comment-form">
			<div class="card-block">
				<textarea
					class="form-control"
					v-model="commentBody"
					placeholder="Write a comment..."
					rows="3"
					:disabled="!user || addDisabled"
				></textarea>
			</div>
			<div class="card-footer">
				<img v-if="user" :src="user.image" class="comment-author-img" />
				<button class="btn btn-sm btn-primary" @click="addComment" :disabled="!user || addDisabled">
					Post Comment
				</button>
			</div>
		</div>

		<div class="card" v-for="(comment, i) in comments" :key="comment.id">
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
				<span class="mod-options" v-if="comment.author.username === user.username" @click="delComment(comment.id, i)">
					<i class="ion-trash-a"></i>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { getArticleComments, addArticleComments, delArticleComments } from "@/api/article";
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
			commentBody: "",
			addDisabled: false,
			delDisabled: false
		};
	},
	computed: {
		...mapState({
			user: state => state.user,
		}),
	},
	// 文章评论不需要seo, 可以在mounted中获取
	async mounted() {
		const { data } = await getArticleComments(this.article.slug);
		this.comments = data.comments;
	},
	methods: {
		async addComment() {
			if (!this.commentBody) return;
			this.addDisabled = true;
			try {
				const { data } = await addArticleComments(this.article.slug, { comment: { body: this.commentBody } });
				this.comments.push(data.comment);
				this.commentBody = "";
			} catch (error) {}
			this.addDisabled = false;
		},

		async delComment(id, index){
			if(this.delDisabled) return
			this.delDisabled = true;
			try {
				await delArticleComments(this.article.slug, id);
				this.comments.splice(index, 1);
			} catch (error) {}
			this.delDisabled = false;
		}
	},
};
</script>
<style lang=""></style>
