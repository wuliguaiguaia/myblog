<template>
  <div> 
    <z-button v-for="(item, idx) in list" 
      :key="idx"
      @click="$router.push({name: item.path})"
    >{{item.name}}</z-button>
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
#ss{
  border: 1px solid red;
}

</style>
