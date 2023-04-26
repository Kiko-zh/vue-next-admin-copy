import type { App } from 'vue'
import { authDirective } from '/@/directive/authDirective'
import { wavesDirective, dragDirective } from '/@/directive/customDirective'

/**
 * 导出指令方法：v-xxx
 * @method authDirective 用户权限指令，用法：v-auth
 * @method wavesDirective 按钮波浪指令，用法：v-waves
 * @method dragDirective 自定义拖动指令，用法：v-drag
 */
export function directive(app: App) {
	// 用户权限指令
	authDirective(app)
	// 按钮波浪指令
	wavesDirective(app)
	// 自定义拖动指令
	dragDirective(app)
}
