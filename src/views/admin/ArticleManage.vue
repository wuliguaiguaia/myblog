<template>
  <div class="article-manage flex">
      <div class="left-menu">
        <div class="add-category">
            <z-button @click="_showNewForm">新增分类</z-button>
            <div v-if="isShowNew" >
                <input type="text" ref="input" v-model="newCategory">
                <z-button @click="_postCategory">添加</z-button>
                <z-button @click="_showNewForm(0)">取消</z-button>
            </div>
			<z-button @click="_deleteCategory">删除分类</z-button>
			<z-button @click="_putCategory">修改分类</z-button>
        </div>
        <div class="list">
            <div v-for="(item, idx) in list" 
                :key="idx" 
                @click="_setCurCategory(item)"
            >{{item.value}}</div>
        </div>
      </div>
      <article-list :curCategory="curCategory"></article-list>
      <edit-page :curCategory="curCategory"></edit-page>
  </div>
</template>

<script>

import ArticleList from './components/articleList';
import editPage from './components/editPage';
import { mapStateCategory, mapActionsCategory, mapMutationsCategory } from '@/store/modules/category';

export default {
	name: 'articleManage',
	data(){
		return{
			newCategory: '',
			isShowNew: false,
		};
	},
    
	components: {
		ArticleList,
		editPage
	},
	created () {
		this.getCategoryList();
		
	},
	computed: {
		...mapStateCategory([
			'list',
			'total',
			'curCategory'
		])
	},
	watch: {
		list(val){
			if (val) {
				this.setCurCategory(this.list[0]);
			}
		}
	},
	methods: {
		...mapActionsCategory([
			'postCategory',
			'deleteCategory',
			'putCategory',
			'getCategoryList'
		]),
		...mapMutationsCategory([
			'setCurCategory'
		]),
		_showNewForm(val){
			if(typeof val === 'number' && val === 0){
				this.isShowNew = false;
				return;
			}
			this.isShowNew = !this.isShowNew;
			if(this.isShowNew) {
				this.$nextTick(()=>{
					this.$refs.input.focus();
				});
			}
		},
		_postCategory () {
			this.postCategory(this.newCategory);
			this.newCategory = '';
		},
		_putCategory () {
			this.putCategory(this.newCategory);
		},
		_deleteCategory () {
			// diaglog
			this.deleteCategory(this.curCategory._id);
		},
		_setCurCategory(item){
			this.setCurCategory(item);
		}
	}
};
</script>

<style>

</style>