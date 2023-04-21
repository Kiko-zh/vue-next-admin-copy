/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm` `YYYY-mm-dd`
 * @description format 季度：`YYYY-mm-dd HH:MM:SS QQQQ`
 * @description format 星期：`YYYY-mm-dd HH:MM:SS WWW`
 * @description format 几周：`YYYY-mm-dd HH:MM:SS ZZZ`
 * @description format 季度 + 星期 + 几周： `YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ`
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: Date, format: string): string {
	const we = date.getDay() // 星期
	const z = getWeek(date) // 周
	const qut = Math.floor((date.getMonth() + 3) / 3).toString() // 季度
	const opt: { [key: string]: string } = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月（月份从 0 开始， 要 + 1）
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		'q+': qut // 季度
	}
	// 中文数字（星期）
	const week: { [key: string]: string } = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六'
	}
	// 中文数字（季度）
	const quarter: { [key: string]: string } = {
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四'
	}
	if (/(W+)/.test(format))
		format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' + week[we] : '周' + week[we]) : week[we])
	if (/(Q+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut])
	if (/(Z+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 3 ? '第' + z + '周' : z + '')
	for (const k in opt) {
		const r = new RegExp('(' + k + ')').exec(format)
		// 若输入的长度不为 1，则前面补 0
		if (r) format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0'))
	}
	return format
}

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function getWeek(dateTime: Date): number {
	const temptTime = new Date(dateTime.getTime())
	// 周几
	const weekday = temptTime.getDay() || 7
	// 周1+5 天 = 周六
	temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
	let firstDay = new Date(temptTime.getFullYear(), 0, 1)
	const dayOfWeek = firstDay.getDay()
	let spendDay = 1
	if (dayOfWeek !== 0) spendDay = 7 - dayOfWeek + 1
	firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
	const d = Math.ceil(temptTime.valueOf() - firstDay.valueOf())
	const result = Math.ceil(d / 7)
	return result
}

/**
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @param format 需要转换的时间格式字符串
 * @description param 10秒： 10 * 1000
 * @description param 1分： 60 * 1000
 * @description param 1小时：60 * 60 * 1000
 * @description param 24小时： 24 * 60 * 60 * 1000
 * @description param 3天： 3 * 24 * 60 * 60 * 1000
 * @returns 返回拼接后的时间字符串
 */
export function formatPast(param: string | Date, format = 'YYYY-mm-dd'): string {
	// 传入格式处理、存储转换值
	let t: any, s: number
	// 获取 js 时间戳
	let time: number = new Date().getTime()
	// 是否是对象
	typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param)
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - t}`)
	if (time < 10 * 1000) {
		// 10s内
		return '刚刚'
	} else if (time < 60 * 1000 && time > 10 * 1000) {
		// 超过 10s 小于1分钟内
		s = Math.floor(time / 1000)
		return `${s}秒前`
	} else if (time < 60 * 60 * 1000 && time > 60 * 1000) {
		// 超过1分钟少于1小时
		s = Math.floor(time / (60 * 1000))
		return `${s}分钟前`
	} else if (time < 24 * 60 * 60 * 1000 && time > 60 * 60 * 1000) {
		// 超过1小时少于24小时
		s = Math.floor(time / (60 * 60 * 1000))
		return `${s}小时前`
	} else if (time < 3 * 24 * 60 * 60 * 1000 && time > 24 * 60 * 60 * 1000) {
		// 超过1天少于3天内
		s = Math.floor(time / (24 * 60 * 60 * 1000))
		return `${s}天前`
	} else {
		// 超过3天
		const date = typeof param === 'string' || 'object' ? new Date(param) : param
		return formatDate(date, format)
	}
}

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatAxis(param: Date): string {
	const hour: number = new Date(param).getHours()
	if (hour < 6) return '凌晨好'
	else if (hour < 9) return '早上好'
	else if (hour < 12) return '上午好'
	else if (hour < 14) return '中午好'
	else if (hour < 17) return '下午好'
	else if (hour < 19) return '傍晚好'
	else if (hour < 22) return '晚上好'
	else return '夜里好'
}
