import { v4 as uuid } from 'uuid'


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
      // console.log(stylesheet.cssRules[0].cssText);
      document.adoptedStyleSheets = [stylesheet] // 挂载到 document 上
    })
    .catch((err) => {
      console.error('Failed to replace styles:', err)
    })
  // return
}