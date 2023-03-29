import { defineStore } from 'pinia'

/**
 * 后端返回原路由（未处理时）
 * @method setRequestOldRoutes 设置接口原始路由数据
 */
export const useRequestOldRoutes = defineStore('requestOldRoutes', {
	state: (): RequestOldRoutesState => ({
		requestOldRoutes: []
	}),
	actions: {
		async setRequestOldRoutes(routes: Array<string>) {
			this.requestOldRoutes = routes
		}
	}
})
