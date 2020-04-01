
import $http from '@/utils/axios/index';
export default {
	namespaced: true,
	state: {
		list: [],
		total: 0,
		curArticle: null
	},
	getters: {},
	actions: {
		async getArticle({ commit }, id) {
			const data = await $http(`/articles/${id}`);
			commit('setCurArticle', data);
		},
		async postArticle({ commit }, articleInfo) {
			const data = await $http.post('/articles', articleInfo);
			commit('setCurArticle', data);
			commit('setArticleList', { newData: data });
		},
		async deleteArticle({ commit }, id) {
			await $http.delete(`/articles/${id}`);
			commit('setCurArticle', null);
		},
		async putArticle({ state }, articleInfo) {
			await $http.put(`/articles/${state.curArticle._id}`, articleInfo);
		},
		async getArticleList({ commit }, postData) {
			const data = await $http('/articles', {
				params: postData
			});
			commit('setArticleList', { data });
		},
		async addArticleVC({ state }) {
			await $http(`/articles/${state.curArticle._id}/view-count`);
		}
	},
	mutations: {
		setArticleList(state, { data, newData, empty }) {
			if (newData) {
				state.list.push(newData);
				state.total++;
				return;
			}

			if (empty) {
				state.total = 0;
				state.list = [];
				return;
			}

			state.total = data.total || 0;
			state.list.push(...data.list);
		},
		setCurArticle(state, data) {
			state.curArticle = data;
		}
	}
};
