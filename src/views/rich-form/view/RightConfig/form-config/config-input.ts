import { configMap } from './common'
import { FormOption } from './form-config'

const configInput:FormOption[] = [
  {
    keyId: 'id',
    keyName: 'ID',
    tips: '',
    setters: ['input'],
    default: '',
  },
  {
    keyId: 'name',
    keyName: '名称',
    tips: '',
    setters: ['input'],
    default: '',
  },
  {
    keyId: 'defaultValue',
    keyName: '默认值',
    tips: '',
    setters: ['input'],
    default: '',
  },
  configMap.placeholder
]

export default configInput