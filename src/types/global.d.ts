//* 申明外部 npm 插件模块

declare module 'js-cookie'
declare module 'qs'

// 声明文件，定义全局变量
/* eslint-disable */
declare interface Window {
	nextLoading: boolean
}
