<template>
    <div id="editor">
		<div v-if="!curArticle"></div>
		<div v-else class="content flex-col">
			<div class="top">
				<input type="text" v-model="articleInfo.title">
				<input type="radio" v-model="articleInfo.isPost">是否发布
				<input type="radio" v-model="articleInfo.isPrivate">是否私密
				<z-button @click="_putArticle">保存</z-button>
				添加标签
			</div>
			<div class="editor-area flex">
				<div class="left">
					<textarea name="" id="" cols="30" rows="10" v-model="articleInfo.content"></textarea>
				</div>
				<div class="right">
					<div ref="product" v-html="html"></div>
				</div>
			</div>
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
#editor {
	flex: auto;
	min-width: 600px;
	font-size: 14px;
	line-height: 1.5;
}

.content {
	height: 100vh;
	.top{
		padding: 20px;
		border-bottom: 1px solid rgb(221, 217, 217);
	}
	.editor-area {
		flex: auto;
	}
	.left, .right{
		flex: 1;
		padding: 20px;

	}
	.left {
		height: 100%;
		border-right: 1px solid rgb(221, 221, 221);
		textarea {
			width: 100%;
			height: 100%;
			border: none;
			outline: none;
			line-height: 1.5;;
			font-size: 14px;
		}
	}
}
</style>
<style lang="scss">
@import "./../../../common/style/prism.scss";
</style>