<template>
  <div class="article-list">
    <div class="add-article">
      <z-button @click='_postArticle'>新增文章</z-button>
    </div>
    <div> 共有{{total}}篇文章</div>
    <template v-if="list">
      <div class="article-item" 
        v-for="(article, idx) of list" 
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
			'list',
			'total',
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
		list (val) {
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
  width: 20%;
  border: 1px solid red;
}
.article-item{
  border-bottom: 1px solid #333;
}
</style>