<template>
	<div class="login-container flex">
		<div class="login-left">
			<div class="login-left-logo">
				<img :src="logoMini" />
				<div class="login-left-logo-text">
					<span>{{ getThemeConfig.globalViceTitle }}</span>
					<span class="login-left-logo-text-msg">{{ getThemeConfig.globalViceTitleMsg }}</span>
				</div>
			</div>
			<div class="login-left-img">
				<img :src="loginMain" />
			</div>
			<img :src="loginBg" class="login-left-waves" />
		</div>
		<div class="login-right flex">
			<div class="login-right-wrap flex-margin">
				<div class="login-right-wrap-one"></div>
				<div class="login-right-wrap-two"></div>
				<div class="login-right-wrap-main">
					<div class="login-right-wrap-main-title">{{ getThemeConfig.globalTitle }}</div>
					<div class="login-right-wrap-main-form">
						<div v-if="!state.isScan">
							<el-tabs v-model="state.tabsActiveName">
								<el-tab-pane :label="$t('message.label.one1')">
									<Account />
								</el-tab-pane>
								<el-tab-pane :label="$t('message.label.two2')" name="mobile">
									<Mobile />
								</el-tab-pane>
							</el-tabs>
						</div>
						<Scan v-if="state.isScan" />
						<div class="login-content-main-scan">
							<i class="iconfont" :class="state.isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
							<div class="login-content-main-scan-delta"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="loginIndex">
import { defineAsyncComponent, reactive, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '/@/stores/themeConfig'
import { NextLoading } from '/@/utils/loading'
import logoMini from '/@/assets/logo-mini.svg'
import loginMain from '/@/assets/login-main.svg'
import loginBg from '/@/assets/login-bg.svg'

// 引入组件
const Account = defineAsyncComponent(() => import('/@/views/login/component/account.vue'))
const Mobile = defineAsyncComponent(() => import('/@/views/login/component/mobile.vue'))
const Scan = defineAsyncComponent(() => import('/@/views/login/component/scan.vue'))

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const state = reactive({
	tabsActiveName: 'account',
	isScan: false
})

// 获取布局配置信息
const getThemeConfig = computed(() => {
	return themeConfig.value
})
// 页面加载时
onMounted(() => {
	NextLoading.done()
})
</script>

<style lang="scss" scoped>
.login-container {
	height: 100%;
	background-color: var(--el-color-white);
	.login-left {
		flex: 1;
		position: relative;
		background-color: rgba(211, 239, 255, 1);
		margin-right: 100px;
		.login-left-logo {
			display: flex;
			align-items: center;
			position: absolute;
			top: 50px;
			left: 80px;
			z-index: 1;
			animation: logoAnimation 0.3s ease;
			img {
				width: 52px;
				height: 52px;
			}
			.login-left-logo-text {
				display: flex;
				flex-direction: column;
				span {
					margin-left: 10px;
					font-size: 28px;
					color: #26a59a;
				}
				.login-left-logo-text-msg {
					font-size: 12px;
					color: #32a99e;
				}
			}
		}
		.login-left-img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 52%;
			img {
				width: 100%;
				height: 100%;
				animation: error-num 0.6s ease;
			}
		}
		.login-left-waves {
			position: absolute;
			top: 0;
			right: -100px;
		}
	}
	.login-right {
		width: 700px;
		.login-right-wrap {
			border: 1px solid var(--el-color-primary-light-3);
			border-radius: 3px;
			width: 500px;
			height: 500px;
			position: relative;
			overflow: hidden;
			background-color: var(--el-color-white);
			.login-right-wrap-one,
			.login-right-wrap-two {
				position: absolute;
				display: block;
				width: inherit;
				height: inherit;
				&::before,
				&::after {
					content: '';
					position: absolute;
					z-index: 1;
				}
			}
			.login-right-wrap-one {
				&::before {
					filter: hue-rotate(0deg);
					top: 0px;
					left: 0px;
					width: 100%;
					height: 3px;
					background: linear-gradient(90deg, transparent, var(--el-color-primary));
					animation: loginLeft 3s linear infinite;
				}
				&::after {
					filter: hue-rotate(60deg);
					top: -100%;
					right: 2px;
					width: 3px;
					height: 100%;
					background: linear-gradient(180deg, transparent, var(--el-color-primary));
					animation: loginTop 3s linear infinite;
					animation-delay: 0.7s;
				}
			}
			.login-right-wrap-two {
				&::before {
					filter: hue-rotate(120deg);
					bottom: 2px;
					right: -100%;
					width: 100%;
					height: 3px;
					background: linear-gradient(270deg, transparent, var(--el-color-primary));
					animation: loginRight 3s linear infinite;
					animation-delay: 1.4s;
				}
				&::after {
					filter: hue-rotate(300deg);
					bottom: -100%;
					left: 0px;
					width: 3px;
					height: 100%;
					background: linear-gradient(360deg, transparent, var(--el-color-primary));
					animation: loginBottom 3s linear infinite;
					animation-delay: 2.1s;
				}
			}
			.login-right-wrap-main {
				display: flex;
				flex-direction: column;
				height: 100%;
				.login-right-wrap-main-title {
					height: 130px;
					line-height: 130px;
					font-size: 27px;
					text-align: center;
					letter-spacing: 3px;
					animation: logoAnimation 0.3 ease;
					animation-delay: 0.3s;
					color: var(--el-text-color-primary);
				}
				.login-right-wrap-main-form {
					flex: 1;
					padding: 0 50px 50px;
					.login-content-main-scan {
						position: absolute;
						top: 0;
						right: 0;
						width: 50px;
						height: 50px;
						overflow: hidden;
						cursor: pointer;
						transition: all ease 0.3;
						color: var(--el-color-primary);
						&-delta {
							position: absolute;
							width: 35px;
							height: 70px;
							z-index: 2;
							top: 2px;
							right: 21px;
							background: var(--el-color-white);
							transform: rotate(-45deg);
						}
						&:hover {
							opacity: 1;
							transition: all ease 0.3s;
							color: var(--el-color-primary) !important;
						}
						i {
							width: 47px;
							height: 50px;
							display: inline-block;
							font-size: 48px;
							position: absolute;
							right: 1px;
							top: 0px;
						}
					}
				}
			}
		}
	}
}
</style>
