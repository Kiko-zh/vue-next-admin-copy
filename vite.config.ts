import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 可以直接在 script setup 上写 name
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir)
}

const alias: Record<string, string> = {
	'/@': pathResolve('./src/')
}

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd())
	return {
		plugins: [
			vue(),
			VueSetupExtend(),
			AutoImport({
				imports: ['vue', 'vue-router'],
				eslintrc: {
					enabled: false, // Default `false`
					filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
					globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
				}
			})
		],
		root: process.cwd(),
		resolve: {
			alias
		},
		base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		optimizeDeps: {
			include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw']
		},
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: env.VITE_OPEN === 'true',
			hmr: true,
			proxy: {
				'/gitee': {
					target: 'https://gitee.com',
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/gitee/, '')
				}
			}
		},
		build: {
			outDir: 'dist',
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].[hash].js`,
					chunkFileNames: `assets/[name].[hash].js`,
					assetFileNames: `assets/[name].[hash].[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts']
					}
				}
			}
		}
	}
})
