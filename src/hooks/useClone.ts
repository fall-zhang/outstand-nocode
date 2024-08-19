export function deepClone<T>(receive: T): T {
  let middle: unknown = null
  let result = null
  const isRefState = isRef(receive)
  middle = toRaw(unref(receive))
  try {
    result = structuredClone(middle)
  } catch (err) {
    result = goClone(middle)
  }
  if (isRefState) {
    result = ref(result)
  } else {
    result = reactive(result)
  }
  return result as T
}

/**
 * 使用递归进行克隆
 * @param content 任意类型的数据
 * @returns 克隆后的数据
 */
export function goClone(content: any): any {
  if (typeof content !== 'object') {
    return content
  }
  const result: any = Array.isArray(content) ? [] : {}
  if (Array.isArray(content)) {
    content.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        const afterDeep = deepClone(item)
        result.push(afterDeep)
      } else {
        result.push(item)
      }
    })
  } else {
    Object.keys(content).forEach(item => {
      if (typeof result[item] !== 'object') {
        result[item] = content[item]
      } else {
        const afterDeep = deepClone(item)
        result[item] = afterDeep
      }
    })
  }
  return result
}
