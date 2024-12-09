import { nanoid } from 'nanoid'
import { PlatformType } from '@/views/rich-form/types/rich-form'
import { isEmpty } from '@/utils/utils'
import { AllFieldType, FieldContainerInner, FieldItemBase, FieldItemContainer } from '@/views/rich-form/types/rich-form-item'

const renderFieldData = ():FieldContainerInner => {
  const result:FieldContainerInner = {
    id: nanoid(),
    type: 'col',
    label: '',
    list: [],
    options: {},
    span: 0,
    offset: 0
  }
  return result
}

const excludes:Array<string> = ['grid', 'col', 'table', 'tr', 'td', 'tabs', 'tabsCol', 'collapse', 'collapseCol', 'divider', 'inline']
const flatNodes = (nodes:any[], excludes:any[], fn:any, excludesFn:any = null) => {
  return nodes.reduce((res, node, currentIndex) => {
    if (excludes.indexOf(node.type) === -1) {
      res.push(node)
      fn && fn(nodes, node, currentIndex)
    } else {
      excludesFn && excludesFn(nodes, node, currentIndex)
    }
    const children = node.list || node.rows || node.columns || node.children || []
    res = res.concat(flatNodes(children, excludes, fn, excludesFn))
    return res
  }, [])
}
const getAllFields = (store) => flatNodes(store, excludes)
const pickFields = (list) => flatNodes(list, excludes)
const disassemblyData1 = (data) => {
  const result = {
    list: data.list,
    config: data.config,
    fields: flatNodes(data.list, excludes, (nodes, node, currentIndex) => {
      nodes[currentIndex] = node.id
    }),
    data: data.data
  }
  return result
}
const combinationData1 = (data) => {
  const result = {
    list: data.list,
    config: data.config,
    data: data.data,
    fields: data.fields,
    logic: data.logic
  }
  flatNodes(data.list, excludes, (nodes, node, currentIndex) => {
    const cur = data.fields.find(e => e.id === node)
    if (!isEmpty(cur)) {
      nodes[currentIndex] = cur
    }
  })
  return result
}
const combinationData2 = (list, fields) => {
  flatNodes(list, excludes, (nodes, node, currentIndex) => {
    const cur = fields.find(e => e.id === node)
    if (!isEmpty(cur)) {
      nodes[currentIndex] = cur
    }
  })
}
const repairLayout = (layout, fields) => {
  flatNodes(layout, excludes, (nodes, node, currentIndex) => {
    if (typeof node === 'string') {
      if (!isEmpty(fields.find(item => item.id === node))) {
        nodes.splice(currentIndex, 1)
      }
    }
  })
  const temporary = []
  flatNodes(layout, excludes, null, (nodes, node, currentIndex) => {
    if (node.type === 'inline') {
      if (!node.columns.length) {
        temporary.unshift({
          nodes,
          currentIndex
        })
      }
    }
  })
  temporary.forEach(e => {
    e.nodes.splice(e.currentIndex, 1)
  })
}
const disassemblyData2 = (list) => {
  flatNodes(list, excludes, (nodes, node, currentIndex) => {
    nodes[currentIndex] = node.id && node.id
  })
}
const isInlineChildren = (node:FieldItemBase|FieldItemContainer) => {
  if (node.context) {
    return (node.context.parent as FieldItemContainer).type === 'inline'
  }
  return false
}
/**
 * 用来查看是否是 FormItem 类型
 * （不是 container 类型）
 */
const checkIsField = (node:AllFieldType) => ['input', 'textarea', 'number', 'radio', 'checkbox', 'select', 'time', 'date', 'rate', 'switch', 'slider', 'html', 'cascader', 'uploadfile', 'signature', 'region'].includes(node.type)
const calculateAverage = (count, total = 100) => {
  const base = Number((total / count).toFixed(2))
  const result = []
  for (let i = 0; i < count; i++) {
    // result.push(base + (i < rest ? 1 : 0))
    result.push(base)
  }
  return result
}
const syncWidthByPlatform = (node, platform:PlatformType, syncFullPlatform = false, value) => {
  // debugger
  console.log('🚀 ~ syncWidthByPlatform ~ value:', value)
  const isArray = Array.isArray(node)
  if (!isArray) {
    if (typeof node.style.width === 'object') {
      if (syncFullPlatform) {
        node.style.width.pc = node.style.width.mobile = value + '%'
      } else {
        node.style.width[platform] = value + '%'
      }
    } else {
      node.style.width = value + '%'
    }
  }
  const otherNodes = isArray ? node : node.context.parent.columns.filter(e => e !== node)
  const averageWidths = calculateAverage(otherNodes.length, isArray ? 100 : 100 - value)
  otherNodes.forEach((node, index) => {
    const isFieldWidth = typeof node.style.width === 'object'
    if (isFieldWidth) {
      if (syncFullPlatform) {
        node.style.width.pc = node.style.width.mobile = averageWidths[index] + '%'
      } else {
        node.style.width[platform] = averageWidths[index] + '%'
      }
    } else {
      node.style.width = averageWidths[index] + '%'
    }
  })
}

export {
  syncWidthByPlatform,
  renderFieldData,
  getAllFields,
  disassemblyData1,
  combinationData1,
  disassemblyData2,
  combinationData2,
  isInlineChildren,
  checkIsField,
  pickFields,
  repairLayout
}
