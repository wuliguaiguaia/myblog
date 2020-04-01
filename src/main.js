import Vue from 'vue';
import App from './App.vue';
import router from './router';
import zWheel from 'z-wheel-0201/lib/z-wheel-0201.common';
import 'z-wheel-0201/lib/styles/index.css';
import '@/common/style/reset.scss';
console.log(zWheel);

Vue.use(zWheel)
	.config.productionTip = false;
import store from './store';
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
