/**
 * 判断两数组字符串是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @param newArr 新数据
 * @param oldArr 原数据
 * @returns 两数组相同返回 `true`，反之则 `false`
 */
export function judementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	const news = removeDuplicate(newArr)
	const olds = removeDuplicate(oldArr)
	let count = 0
	const length = news.length
	for (const i in olds) {
		for (const j in news) {
			if (olds[i] === news[j]) count++
		}
	}
	return count === length ? true : false
}

/**
 * 数组、数组对象去重
 * @param arr 数组内容
 * @param attr 需要去重的键值（数组对象）
 * @returns <Array>
 */
export function removeDuplicate(arr: EmptyArrayType, attr?: string) {
	if (!Object.keys(arr).length) {
		return arr
	} else {
		if (attr) {
			const obj: EmptyObjectType = {}
			return arr.reduce((cur: EmptyArrayType, item: EmptyArrayType) => {
				//@ts-ignore
				obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item))
			}, [])
		} else {
			return [...new Set(arr)]
		}
	}
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则 `false`
 */
export function isObjectValueEqual<T>(a: T, b: T): boolean {
	if (!a || !b) return false
	const aProps = Object.getOwnPropertyNames(a)
	const bProps = Object.getOwnPropertyNames(b)
	if (aProps.length != bProps.length) return false
	for (let i = 0; i < aProps.length; i++) {
		const propName = aProps[i]
		// @ts-ignore
		const propA = a[propName]
		// @ts-ignore
		const propB = b[propName]
		if (!b.hasOwnProperty(propName)) return false
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false
		} else if (propA === propB) {
			return false
		}
	}
	return true
}
