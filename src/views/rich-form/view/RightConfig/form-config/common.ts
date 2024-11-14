import { FormOption } from './form-config'

export const configMap:Record<string, FormOption> = {
  placeholder: {
    keyId: 'placeholder',
    keyName: '占位内容',
    tips: '',
    setters: ['input'],
    default: '',
  },
  // box 的四个边
  margin: {
    keyId: 'margin',
    keyName: '外边距',
    multiKeys: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
    setters: ['box-side'],
    tips: '外边距',
    default: '0',
  },
  padding: {
    keyId: 'padding',
    keyName: '内边距',
    multiKeys: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
    setters: ['box-side'],
    tips: '内边距',
    default: '0',
  },
  border: {
    keyId: 'border',
    keyName: '边框',
    multiKeys: ['borderLeft', 'borderRight', 'borderTop', 'borderBottom'],
    setters: ['box-side'],
    tips: '边框',
    default: '0',
  },
}

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
