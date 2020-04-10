import $http from '@/utils/axios/index';
export default {
	namespaced: true,
	state: {
		categoryList: [],
		categoryTotal: 0,
		curCategory: null
	},
	getters: {},
	actions: {
		async postCategory({ commit }, category) {
			const data = await $http.post('/categories', { value: category });
			commit('setCurCategory', data);
			commit('setCategoryList', { newData: data });
		},
		async deleteCategory({ commit }, id) {
			await $http.delete(`/categories/${id}`);
			commit('setCurCategory', null);
		},
		async putCategory({ state }, category) {
			await $http.put(`/categories/${state.curCategory._id}`, category);
		},
		async getCategoryList({ commit }) {
			const data = await $http('/categories');
			commit('setCategoryList', { data });
		}
	},
	mutations: {
		setCategoryList(state, {data, newData}) {
			if (newData) {
				state.categoryList.push(newData);
				state.categoryTotal++;
				return;
			}
			state.categoryTotal = data.total || 0;
			state.categoryList = data.list;
		},
		setCurCategory(state, data) {
			state.curCategory = data;
		}
	}
};
