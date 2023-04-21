<template>
	<el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
		<RouterView v-show="setLockScreen" />
		<LockScreen v-if="themeConfig.isLockScreen" />
	</el-config-provider>
</template>

<script setup lang="ts" name="app">
import { defineAsyncComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '/@/stores/themeConfig'
import other from '/@/utils/other'

// 引入组件
const LockScreen = defineAsyncComponent(() => import('/@/layout/lockScreen/index.vue'))

// 定义变量内容
const { messages, locale } = useI18n()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 设置锁屏时组件 显示隐藏
const setLockScreen = computed(() => {
	// 防止锁屏后，刷新出现不相关界面
	// https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
	return themeConfig.value.isLockScreen ? themeConfig.value.lockScreenTime > 1 : themeConfig.value.lockScreenTime >= 0
})
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
	return other.globalComponentSize()
})
// 获取全局 i18n
const getGlobalI18n = computed(() => {
	return messages.value[locale.value]
})
</script>
