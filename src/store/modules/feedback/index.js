
import { createNamespacedHelpers } from 'vuex';

const {
	mapState,
	mapActions,
	mapMutations,
	mapGetters
} = createNamespacedHelpers('article');

export const mapStateArticle = mapState;
export const mapActionsArticle = mapActions;
export const mapMutationsArticle = mapMutations;
export const mapGettersArticle = mapGetters;
