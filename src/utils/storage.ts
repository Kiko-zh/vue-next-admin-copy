import Cookies from 'js-cookie'

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置 永久缓存
 * @method get 获取 永久缓存
 * @method remove 移除 永久缓存
 * @method clear 移除全部 永久缓存
 */
export const Local = {
	// 设置 永久缓存
	set(key: string, val: any) {
		window.localStorage.setItem(key, JSON.stringify(val))
	},
	// 获取 永久缓存
	get(key: string) {
		const json = <string>window.localStorage.getItem(key)
		return JSON.parse(json)
	},
	// 移除 永久缓存
	remove(key: string) {
		window.localStorage.removeItem(key)
	},
	// 移除全部 永久缓存
	clear() {
		window.localStorage.clear()
	}
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置 临时缓存
 * @method get 获取 临时缓存
 * @method remove 移除 临时缓存
 * @method clear 移除全部 临时缓存
 */
export const Session = {
	// 设置 临时缓存
	set(key: string, val: any) {
		if (key === 'token') return Cookies.set(key, val)
		window.sessionStorage.setItem(key, JSON.stringify(val))
	},
	// 获取 临时缓存
	get(key: string) {
		if (key === 'token') return Cookies.get(key)
		const json = <string>window.sessionStorage.getItem(key)
		return JSON.parse(json)
	},
	// 移除临时缓存
	remove(key: string) {
		if (key === 'token') return Cookies.remove(key)
		window.sessionStorage.removeItem(key)
	},
	// 移除全部 临时缓存
	clear() {
		Cookies.remove('token')
		window.sessionStorage.clear()
	}
}
