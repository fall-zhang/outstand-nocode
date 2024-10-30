import { FormOption } from './form-config'

export default {
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