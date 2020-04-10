<template>
  <div class="article-list">
    <div class="add-article">
      <span @click='_postArticle'><i class="el-icon-plus"></i>新增文章</span>
    </div>
    <div> 共有{{articleTotal}}篇文章</div>
    <template v-if="articleList">
      <div v-for="(article, idx) of articleList" 
		:class="{'article-item': true, 'active': curArticle._id === article._id}" 
        :key="idx"
        @click="handleSelect(article)">
        {{article.title}}
      </div>
    </template>
    <div v-show="showMenu">
      <z-button @click="_deleteArticle">删除</z-button>
    </div>
  </div>
</template>

<script>
import { mapStateArticle, mapActionsArticle, mapMutationsArticle } from '@/store/modules/article';
export default {
	name: 'articleList',
	props: ['curCategory'],
	data(){
		return{
			postData: {
				pn: 1,
				num: 10,
				category: ''
			},
			defaultInfo:{
				title: '无标题文章',
				content: '还没有内容',
				category: '',
				isPost: false
			},
			showMenu: false
		};
	},
	computed: {
		...mapStateArticle([
			'articleList',
			'articleTotal',
			'curArticle'
		]),
	},
	watch: {
		curCategory (val) {
			if (val) {
				this.setArticleList({ empty: true });
				this.postData.category = val._id;
				this.getArticleList(this.postData);
				this.defaultInfo.category = val._id;
			}
		},
		articleList (val) {
			if (val) {
				this.setCurArticle(val[0]);
			}
		}
	},
	methods: {
		...mapActionsArticle([
			'getArticleList',
			'postArticle',
			'deleteArticle'
		]),
		...mapMutationsArticle([
			'setArticleList',
			'setCurArticle'
		]),
		handleSelect(item){
			this.setCurArticle(item);
		},
		_postArticle(){
			this.postArticle(this.defaultInfo);
		},
		_deleteArticle(){
			this.deleteArticle(this.curArticle._id);
		},
	}
};
</script>

<style lang="scss" scoped>
.article-list{
  width: 300px;
  padding: 20px;
  border-right: 1px solid rgb(218, 218, 218);
}

.add-article {
	width: 100%;
	padding-bottom: 10px;
	border-bottom: 1px solid rgb(195, 195, 195);
	span {
		display: inline-block;
		i {
			margin-right: 10px;
			font-weight: bold;
		}
	}
}

.article-item {
	border-left: 3px solid transparent;
	border-bottom: 1px solid rgb(221, 220, 220);
	padding: 20px;
	margin: 0 -20px;
	
	&:hover,
	&:active {
		background: rgba(0,0,0, .05);
		border-left: 3px solid rgb(233, 123, 123);
	}

	&.active {
		background: rgba(0,0,0, .05);
		border-left: 3px solid rgb(233, 123, 123);
	}
}
</style>