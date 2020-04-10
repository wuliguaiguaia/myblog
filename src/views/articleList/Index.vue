<template>
  <div class="container flex">
		<div class="left-list flex-col">
			<z-button v-for="(item, idx) in categoryList" 
			:key="idx"
			:class="{'active': curCategory && curCategory._id === item._id}"
			@click="_setCurCategory(item)"
		>{{item.value}}</z-button>
		</div>
		<div class="right-list">
			<div v-for="(list, time) of curList" :key="time">
				<p>{{time}}</p>
				<div class="list">
					<p v-for="(item, idx) in list" 
						:key="idx"
						@click="gotoArticle(item)"
					>{{item.title}}</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapStateCategory, mapActionsCategory, mapMutationsCategory } from '@/store/modules/category';
import { mapStateArticle, mapActionsArticle, mapMutationsArticle } from '@/store/modules/article';

export default {
	name: 'articleList',
	data () {
		return {
			postData: {
				pn: 1,
				num: 10,
				category: ''
			}
		};
	},
	computed: {
		...mapStateCategory([
			'categoryList', 
			'categoryTotal',
			'curCategory'
		]),
		...mapStateArticle([
			'articleList', 
			'articleTotal'
		]),
		curList () {
			let list = {};
			this.articleList.forEach(item => {
				let time = item.createTime.slice(0, 7);
				if (list[time]) {
					list[time].push(item);
				} else {
					list[time] = [item];
				}
			});
			return list;
		}
	},
	watch: {
		curCategory (val) {
			if (val) {
				this.setArticleList({ empty: true });
				this.postData.category = val._id;
				this.getArticleList(this.postData);
			}
		},
	},
	created () {
		this.getCategoryList();
		this.getArticleList(this.postData);
	},
	methods: {
		...mapActionsArticle([
			'getArticleList'
		]),
		...mapMutationsArticle([
			'setArticleList'
		]),
		...mapMutationsCategory([
			'setCurCategory'
		]),
		...mapActionsCategory([
			'getCategoryList'
		]),
		_setCurCategory (item) {
			this.setCurCategory(item);
		},
		gotoArticle (item) {
			this.$router.push({name: 'article', params: {id: item._id}}); // name&&params
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	max-width: 700px;
	margin: 0 auto;
}
.left-list {

}

.right-list {
	margin-left: 20px;
}
</style>