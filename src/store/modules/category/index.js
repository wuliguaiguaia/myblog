
import { createNamespacedHelpers } from 'vuex';

const {
	mapState,
	mapActions,
	mapMutations,
	mapGetters
} = createNamespacedHelpers('category');

export const mapStateCategory = mapState;
export const mapActionsCategory = mapActions;
export const mapMutationsCategory = mapMutations;
export const mapGettersCategory = mapGetters;
