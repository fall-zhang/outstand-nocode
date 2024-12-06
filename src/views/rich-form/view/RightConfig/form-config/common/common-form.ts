import { FormOption } from '../../types/form-config'

export const configCommon:FormOption[] = [{
  keyId: 'id',
  keyName: 'ID',
  tips: '',
  setters: ['input'],
  default: '',
},
{
  keyId: 'name',
  keyName: '组件别名',
  tips: '',
  setters: ['input'],
  default: '',
},
{
  keyId: 'label',
  keyName: '组件标签',
  tips: '',
  setters: ['input'],
  default: '',
},
{
  keyId: 'labelPosition',
  keyName: '标签对齐',
  tips: '',
  setters: ['input'],
  default: '',
},
]

export const configMap:Record<string,FormOption> = {
  placeholder:{
    keyId: 'placeholder',
    keyName: '标签对齐',
    tips: '',
    setters: ['input'],
    default: '',
  },
  defaultValue:{
    keyId: 'defaultValue',
    keyName: '默认值',
    tips: '',
    setters: ['input'],
    default: '',
  }
}