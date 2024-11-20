// 简单类型，同 form 表单
type SettersSimple = 'input' | 'textarea' | 'color' | 'switch' | 'slider' | 'select' | 'number'

// 复杂类型 调用对应的组件
// function，会提供并且创建一个函数进行书写
// json 会使用 JSON.parse 进行解析的复杂数据
type SettersComplex = 'function' | 'json' | 'radio-button' | 'icon-picker'

type MultiKeySetter = 'box-side'

type Recurrence = 'array' | 'object'

// 嵌套类型，组件嵌套组件
// 以 children 的 keyId 作为 key 的对象构成


type OptionalSelect = Array<{ label: string, value: string}>
interface FormOption {
  keyId: string,
  keyName: string,
  setters: Array<SettersSimple | SettersComplex | Recurrence | MultiKeySetter>,
  multiKeys?:string[]
  optionalValue?: OptionalSelect
  // 如果只有一个 setter，作为这个 setter v-bind 的配置
  config?: Record<string, unknown>
  tips?: string
  default?: unknown
  children?: Array<EchartsOption>
}

// 示例
// {
//   keyId: "show", // ehcarts 中的属性名称
//   keyName: "显示",
//   setters: ['switch'], // 多个设置方式，如果是数值，可以采用 slider，滑块
//   optionalVal: [], // 提供 select 或者级联选择调取，可选值
//   tips: "", // 提供的详情介绍
//   default: "", // 默认内容同 echarts 提供的内容
//   children: [], // 子属性节点
//   当某些属性启动时，可以使用
//   optionEnable: ['!xAxis.max', 'xAxis.min']
//   当想要使用默认填充的时候，可以使用
//   fillValue:[213, 461, 124, 342, 197]
// }

export {
  FormOption
}

