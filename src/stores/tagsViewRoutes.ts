import { defineStore } from 'pinia'
import { Session } from '/@/utils/storage'

/**
 * TagsView 路由列表
 * @method setTagsViewRoutes 设置 TagsView 路由列表
 * @method setCurrentFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useTagsViewRoutes = defineStore('tagsViewRoutes', {
	state: (): TagsViewRoutesState => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: false
	}),
	actions: {
		async setTagsViewRoutes(data: Array<string>) {
			this.tagsViewRoutes = data
		},
		setsetCurrenFullscreen(bool: boolean) {
			Session.set('isTagsViewCurrenFull', bool)
			this.isTagsViewCurrenFull = bool
		}
	}
})
