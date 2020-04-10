import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const home = () => import(/* webpackChunkName: "home" */ '@/views/home/Index')
const admin = () => import(/* webpackChunkName: "admin" */ '@/views/admin/Index')
const userManage = () => import(/* webpackChunkName: "userManage" */ '@/views/admin/UserManage')
const articleManage = () => import(/* webpackChunkName: "userManage" */ '@/views/admin/ArticleManage')
const articleList = () =>import(/* webpackChunkName: "articleList" */ "@/views/articleList/Index");
const article = () =>import(/* webpackChunkName: "blog" */ "@/views/article/Index");
const login = () => import(/* webpackChunkName: "login" */ '@/views/login/Index')

export default new Router({
	mode: "hash",
	routes: [
		{
			path: "/",
			component: home,
			name: "home"
		},
		{
			path: "/admin",
			name: "admin",
			component: admin,
			children: [
				{
					path: "user",
					name: "userManage",
					component: userManage
				},
				{
					path: "article",
					name: "articleManage",
					component: articleManage
				}
			]
		},
		{
			path: "/articleList",
			name: "articleList",
			component: articleList
		},
		{
			path: "/article/:id",
			name: "article",
			component: article
		},
		{
			path: "/login",
			name: "login",
			component: login
		}
	]
});
