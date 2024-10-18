export function isNotNull(value: unknown) {
  return (value !== null) && (value !== undefined)
}
export const isEmpty = (v:unknown) => (v === '' || v === null || v === undefined || (Array.isArray(v) && !v.length))

export function deepClone<T>(receive: T): T {
  let middle: unknown = null
  if (isRef(receive)) {
    middle = receive.value
  } else {
    middle = receive
  }
  middle = toRaw(middle)
  // if (isProxy(receive)) {
  //   middle = toRaw(receive)
  // } else {
  //   middle = receive
  // }
  // console.log(middle)

  let result = null
  try {
    result = structuredClone(middle)
  } catch (err) {
    console.error(err)
    result = goClone(middle)
  }
  return result as T
}

function goClone(receive: unknown) {
  return structuredClone(receive)
}

/**
 * 为 DOM 添加事件，返回移除事件的方法
 * @param {Element} target 挂载事件的节点
 * @param {GlobalEventHandlersEventMap} event 挂载的事件类型
 * @param {*} fun 需要执行的方法
 * @returns 移除该事件的函数
 */
// 之后需要添加上节流相关方法
export const addListener = (target: Document | Window, event: string, fun: { (ev: any): void }) => {
  target.addEventListener(event, fun)
  return function () {
    target.removeEventListener(event, fun)
  }
}
export const insertCSS = function (cssStyle: string) {
  const stylesheet = new CSSStyleSheet()
  stylesheet
    .replace(cssStyle)
    .then(() => {
      document.adoptedStyleSheets = [stylesheet] // 挂载到 document 上
    })
    .catch((err) => {
      console.error('Failed to replace styles:', err)
    })
}

export const get = <T>(obj:any, path:string|string[], defValue:T) => {
  // 未定义则返回 undefined
  if (!path) return undefined
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  // Find value
  if (!pathArray) return undefined
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj
  )
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result
}

export const set = <T>(obj:any, path:string|string[], value:T) => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  if (!pathArray) return

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) acc[key] = {}
    if (i === pathArray.length - 1) acc[key] = value
    return acc[key]
  }, obj)
}


/**
 * 获取所有数组中都包含的内容
 * ([2, 1], [4, 2], [1, 2]) => [2]
 */
export function intersection(...arr:Array<unknown[]>) {
  let firstArr = arr[0]
  arr.forEach(item1 => {
    const newArr:unknown[] = []
    item1.forEach(item2 => {
      if (firstArr.includes(item2)) {
        newArr.push(item2)
      }
    })
    firstArr = newArr
  })
  return firstArr
}
