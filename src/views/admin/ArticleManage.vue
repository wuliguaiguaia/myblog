<template>
  <div class="article-manage flex">
      <div class="left-menu">
		<z-button class="back" float @click="$router.push({path: '/'})">回到首页</z-button>
        <div class="add-category">
			<span class="button" @click="_showNewForm"><i class="el-icon-plus"></i>新增分类</span>
            <div v-if="isShowNew" >
                <input type="text" ref="input" v-model="newCategory">
                <z-button type="primary" size="mini" class="add" @click="_postCategory">添加</z-button>
                <z-button type="text" size="mini"  @click="_showNewForm(0)">取消</z-button>
            </div>
			<!-- <div class="menu">
				<z-button type="text" @click="_deleteCategory">删除</z-button>
				<z-button type="text" @click="_putCategory">修改</z-button>
			</div> -->
        </div>
        <div class="category-list">
            <div v-for="(item, idx) in categoryList" 
				:class="{'category-item': true, 'active': curCategory._id === item._id}"
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
			'categoryList',
			'categoryTotal',
			'curCategory'
		])
	},
	watch: {
		categoryList(val){
			if (val) {
				this.setCurCategory(this.categoryList[0]);
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
			if(!this.newCategory.trim()) return;
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

<style lang="scss" scoped>
.back {
	width: 100%;
}
.article-manage {
	font-size: 14px;
	position: relative;
	.left-menu {
		width: 200px;
		min-width: 200px;
		height: 100vh;
		overflow-y: auto;
		background-color: #404040;
		color: #f2f2f2;
		box-sizing: border-box;
		padding: 20px;
		cursor: pointer;
	}
	.add-category{
		margin-top: 10px;

		input {
			margin-bottom: 10px;
		}
	}
	.button {
		margin: 10px 0;
		display: inline-block;
		i {
			margin-right: 10px;
			font-weight: bold;
		}
	}
	.category-list {
		margin-top: 10px;
	}
	.category-item {
		margin: 0 -20px;
		padding: 10px 0px 10px 20px;
		border-left: 3px solid transparent;
		
		&:hover,
		&:active {
			background: rgba(0,0,0, .3);
			border-left: 3px solid #ddd;
		}

		&.active {
			background: rgba(0,0,0, .3);
			border-left: 3px solid #ddd;
		}
	}
}


</style>