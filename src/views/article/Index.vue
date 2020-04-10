<template>
  <div class="article-container" v-if="curArticle">
    <div class="header">
      {{curArticle.title}}
    </div>
    <div class="content">
      {{curArticle.content}}
    </div>
    <div class="time">最后修改于：{{curArticle.updateTime.slice(0,9)}}</div>
    <div class="tags">
      <z-button>{{curArticle.categoryLabel}}</z-button>
      <z-button v-for="(item, idx) in curArticle.tag" :key="idx">{{item}}</z-button>
    </div>
    <z-button>点赞：</z-button>
    <z-button>访问量：</z-button>

    <z-button>展开互动区</z-button>
    <div class="blank">
      <img src="./../../assets/blank.jpeg" alt="">
    </div>
    <div class="bottom">
      <img src="./../../assets/bottom.jpg" alt="">
    </div>
    <p>到底啦，可我不想和你说再见</p>
  </div>
</template>

<script>
import { mapStateArticle, mapActionsArticle, mapMutationsArticle } from '@/store/modules/article';
export default {
	name: 'article',
	data () {
		return   {
			id: this.$route.params.id,
			articleInfo: null
		};
	},
	created () {
		this.getArticle(this.id);
		this.articleInfo = this.curArticle;
	},
	computed: {
		...mapStateArticle([
			'curArticle'
		])
	},
	methods: {
		...mapActionsArticle([
			'getArticle'
		])
	}
};
</script>

<style lang="scss" scoped>
@import "./../../common/style/prism.scss";

</style>