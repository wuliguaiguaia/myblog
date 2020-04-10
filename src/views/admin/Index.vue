<template>
  <div class=""> 
	<div class="nav">
		<z-button v-for="(item, idx) in list" 
		:key="idx"
		plain
		@click="$router.push({name: item.path})"
		>{{item.name}}</z-button>
	</div>
    <router-view/>
  </div>
</template>
<script>
export default {
	name: 'admin',
	data () {
		return {
			list: [
				{
					name: '用户管理',
					path:'userManage'
				},
				{
					name: '文章管理',
					path:'articleManage'
				}
			]
		};
	},
	created () {

	},
	watch: {
		text () {

		}
	},
	methods: {
		
	}
};
</script>
<style lang='scss' scoped>
.nav {
	position: fixed;
	background: rgba(0,0,0,.3);
	bottom: 0;
	left: 0;
	cursor: pointer;
	z-index: 99999;
	display: flex;
	flex-direction: column;
	.z-button+.z-button{
		margin: 0;
	}
}

</style>
