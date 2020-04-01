<template>
    <div id="editor">
		<div v-if="!curArticle"></div>
		<div v-else class="content">
			<input type="text" v-model="articleInfo.title">
			<textarea name="" id="" cols="30" rows="10" v-model="articleInfo.content"></textarea>
			<div ref="product" v-html="html"></div>
			<input type="radio" v-model="articleInfo.isPost">
			<input type="radio" v-model="articleInfo.isPrivate">
			<z-button @click="handleConvert">转换</z-button>
			<z-button @click="_putArticle">发送</z-button>
		</div>
    </div>
</template>

<script>

import marked from 'marked';
import { heightlight } from '@/utils/heightlight/index';
import { mapStateArticle, mapActionsArticle, mapMutationsArticle } from '@/store/modules/article';
export default {
	name: 'editPage',
	props: ['curCategory'],
	data () {
		return {
			text: '',
			html: '',
			articleInfo: {},
			isPost: false
		};
	},
	computed: {
		...mapStateArticle([
			'curArticle'
		])
	},
	watch: {
		'curArticle._id' (val) {
			if (val) {
				this.getArticle(val); 
				this.articleInfo = this.curArticle;
			}
		},
		'articleInfo.content' (){
			this.handleConvert();
		}
	},
	methods:{
		...mapActionsArticle([
			'getArticle',
			'putArticle'
		]),
		_putArticle() {
			this.putArticle(this.articleInfo);
		},
		handleConvert () {
			this.html= marked(this.articleInfo.content);
			this.$nextTick(() => {
				heightlight(this.$refs.product);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import "./../../../common/style/prism.css";
</style>
