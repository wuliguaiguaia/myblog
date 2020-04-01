import $http from '@/utils/axios/index';
export default {
	namespaced: true,
	state: {
		list: [],
		total: 0,
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
				state.list.push(newData);
				state.total++;
				return;
			}
			
			state.total = data.total || 0;
			state.list = data.list;
		},
		setCurCategory(state, data) {
			state.curCategory = data;
		}
	}
};
