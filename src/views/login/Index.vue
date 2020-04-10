<template>
  <div>home
      <form class="register">
          <label for="username">
                用户名：<input type="text" v-model="username">
          </label>
          <label for="username">
                密码<input type="password"  v-model="password">
          </label>
          <label for="username">
                邮箱<input type="eamil"  v-model="email">
          </label>
          <button @click="registry">注册</button>
          <button @click="login">登录</button>
      </form>
      <button @click="loginout">退出</button>

      <button @click="$router.push({path:'/admin'})">admin</button>
  </div>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			username: '',
			password: '',
			email: ''
		};
	},
	created () {
		this.$http('/home', res => {
			console.log(res);
		});
	},
	methods: {
		registry () {
			if (!this.username || !this.password) return;
			this.$http.post('/user/registry', {
				username: this.username,
				password: this.password
			}, res => {
				console.log(res);
			});
		},
		login () {
			if (!this.username || !this.password) return;
			this.$http.post('/user/login', {
				username: this.username,
				password: this.password
			}, res => {
				console.log(res);
			});
		},
		loginout () {
			this.$http('/user/loginout', res => {
				console.log(res);
				location.reload();
			});
		}
	}
};
</script>

<style>

</style>
