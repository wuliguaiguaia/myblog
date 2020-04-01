import Vue from 'vue';
import Vuex from 'vuex';

import article from './modules/article/controller';
import category from './modules/category/controller';
import comment from './modules/comment/controller';
import feedback from './modules/feedback/controller';
import user from './modules/user/controller';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		article,
		category,
		comment,
		feedback,
		user
	}
});
