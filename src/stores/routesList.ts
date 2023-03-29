import { defineStore } from 'pinia'

/**
 * 路由列表
 * @method setRoutesList 设置路由数据
 * @method setColumnsMenuHover 设置分栏布局 菜单鼠标移入 boolean
 * @method setColumnsNavHover 设置分栏布局 最左侧导航鼠标移入 boolean
 */
export const useRoutesList = defineStore('routesList', {
	state: (): RoutesListState => ({
		routesList: [],
		isColumnsMenuHover: false,
		isColumnsNavHover: false
	}),
	actions: {
		async setRoutesList(data: Array<string>) {
			this.routesList = data
		},
		async setColumnsMenuHover(bool: Boolean) {
			this.isColumnsMenuHover = bool
		},
		async setColumnsNavHover(bool: Boolean) {
			this.isColumnsNavHover = bool
		}
	}
})
