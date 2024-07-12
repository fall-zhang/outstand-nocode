import { inject } from 'vue'
const _bem = (
  namespace,
  block,
  element,
) => {
  let cls = `${namespace}-${block}`
  if (element) {
    cls += `__${element}`
  }
  return cls
}
const statePrefix = 'is-'
export const useNamespace = (block, Namespace) => {
  const defaultNamespace = Namespace || inject('Everright').state.Namespace
  const namespace = `ER-${defaultNamespace}`
  const b = () => `${namespace}-${block}`
  const e = (element) => element ? _bem(namespace, block, element) : ''
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }
  return {
    namespace,
    b,
    e,
    is
  }
}
