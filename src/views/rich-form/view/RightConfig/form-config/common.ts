import { FormOption } from './form-config'

export const marginConfig:FormOption[] = [
  {
    keyId: 'marginLeft',
    keyName: '左侧外边距',
    tips: '',
    setters: ['input'],
    default: '',
  },
  {
    keyId: 'marginRight',
    keyName: '右侧外边距',
    tips: '',
    setters: ['input'],
    default: '',
  },
  {
    keyId: 'marginTop',
    keyName: '上侧外边距',
    setters: ['input'],
    default: '',
  },
  {
    keyId: 'marginBottom',
    keyName: '下侧外边距',
    setters: ['input'],
    default: '',
  },
]