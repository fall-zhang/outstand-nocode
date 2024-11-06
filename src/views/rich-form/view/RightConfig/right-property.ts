
import type { FormOption } from './form-config/form-config.d.ts'
const rightProperty: Array<FormOption> = [
  {
    keyId: 'color',
    keyName: '颜色列表',
    tips: '不同的 series 拥有不同的颜色',
    setters: ['json'],
    default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
  },
  {
    keyId: 'backgroundColor',
    keyName: '背景颜色',
    setters: ['color', 'input'],
    default: ''
  },
]
export default rightProperty