import { defineStore } from 'pinia'

/**
 * 路由缓存列表
 * @method setCacheKeepAlive 设置要缓存的路由 names（开启 tagsView）
 * @method addCacheView 添加要缓存的路由 names（关闭 TagsView）
 * @method delCacheView 删除要缓存的路由 names（关闭 TagsView）
 * @method delOtherCacheViews 右键菜单 `关闭其他`，删除要缓存的路由 names（关闭 TagsView）
 * @method delAllCacheViews 右键菜单 `全部关闭`，删除要缓存的路由 names（关闭 TagsView）
 */
export const useKeepAliveNames = defineStore('keepAliveNames', {
	state: (): KeepAliveNamesState => ({
		keepAliveNames: [],
		cachedViews: []
	}),
	actions: {
		async setCacheKeepAlive(data: Array<string>) {
			this.keepAliveNames = data
		},
		async addCachedView(view: any) {
			if (view.meta.isKeepAlive) this.cachedViews?.push(view.name)
		},
		async delCachedView(view: any) {
			const index = this.cachedViews.indexOf(view.name)
			index > -1 && this.cachedViews.splice(index, 1)
		},
		async delOthersCachedViews(view: any) {
			if (view.meta.isKeepAlive) this.cachedViews = [view.name]
			this.cachedViews = []
		},
		async delAllCachedViews() {
			this.cachedViews = []
		}
	}
})
