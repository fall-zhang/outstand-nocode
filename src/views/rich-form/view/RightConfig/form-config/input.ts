import { FormOption } from './form-config'

const inputConfig:FormOption[] = [{
  keyId: 'id',
  keyName: 'ID',
  tips: '指定则可用于在 option 或者 API 中引用组件。',
  setters: ['input'],
  default: '',
},
{
  keyId: 'name',
  keyName: '名称',
  tips: '用于提示（tooltip）和图例（legend）的显示',
  setters: ['input'],
  default: '',
}]

export default inputConfig