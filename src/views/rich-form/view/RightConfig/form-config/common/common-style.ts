import { FormOption } from '../form-config'

export const configStyle:FormOption[] = [
  {
    keyId: 'backgroundColor',
    keyName: '背景颜色',
    setters: ['color'],
    tips: '',
    default: undefined
  },
  {
    keyId: 'margin',
    keyName: '外边距',
    multiKeys: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
    setters: ['box-side'],
    tips: '外边距',
    default: '0',
  },
  {
    keyId: 'padding',
    keyName: '内边距',
    multiKeys: ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
    setters: ['box-side'],
    tips: '内边距',
    default: '0',
  },
  {
    keyId: 'border',
    keyName: '边框',
    multiKeys: ['borderLeft', 'borderRight', 'borderTop', 'borderBottom'],
    setters: ['box-side'],
    tips: '边框',
    default: '0',
  },
  // {
  //   keyId: 'borderColor',
  //   keyName: '边框颜色',
  //   multiKeys: ['borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor'],
  //   setters: ['box-side'],
  //   tips: '',
  //   default: undefined
  // },
  {
    keyId: 'borderRadius',
    keyName: '边框圆角',
    multiKeys: [],
    setters: ['number'],
    tips: '',
    default: undefined
  },
  {
    keyId: '',
    keyName: '边框圆角',
    multiKeys: [],
    setters: ['number'],
    tips: '',
    default: undefined
  },
]