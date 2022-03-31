import config from '@/config'

export default {
	state: {
		// 收款账号
		merchantStore: {
			isEditStoreParams: false
		}
	},
	getters: {},
	mutations: {
		setIsEditStoreParams(state, isEditStoreParams) {
			state.merchantStore.isEditStoreParams = isEditStoreParams;
			window.localStorage.setItem('isEditStoreParams', JSON.stringify(isEditStoreParams));
		},
	},
	actions: {}
}
