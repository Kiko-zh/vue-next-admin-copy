//* 申明外部 npm 插件模块

declare module 'js-cookie'
declare module 'qs'

// 声明文件，定义全局变量
/* eslint-disable */
declare interface Window {
	nextLoading: boolean
	BMAP_SATELLITE_MAP: any
	BMap: any
}

// 声明路由当前项类型
declare type RouteItem<T = any> = {
	path: string
	name?: string | symbol | undefined | null
	redirect?: string
	k?: T
	meta?: {
		title?: string
		isLink?: string
		isHide?: boolean
		isKeepAlive?: boolean
		isAffix?: boolean
		isIframe?: boolean
		roles?: string[]
		icon?: string
		isDynamic?: boolean
		isDynamicPath?: string
		isIframeOpen?: string
		loading?: boolean
	}
	children: T[]
	query?: { [key: string]: T }
	params?: { [key: string]: T }
	contextMenuClickId?: string | number
	commonUrl?: string
	isFnClick?: boolean
	url?: string
	transUrl?: string
	title?: string
	id?: string | number
}

// 声明路由 to from
declare interface RouteToFrom<T = any> extends RouteItem {
	path?: string
	children?: T[]
}

// 声明 ref
declare type RefType<T = any> = T | null

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null

// 申明 数组
declare type EmptyArrayType<T = any> = T[]

// 申明对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T
}
