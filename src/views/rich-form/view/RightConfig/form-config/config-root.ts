import { FormOption } from './form-config'
const configRoot:FormOption[] = [
  {
    keyId: 'size',
    keyName: '字段大小',
    tips: '',
    setters: ['radio-button'],
    optionalValue: [
      { label: '大', value: 'large' },
      { label: '中', value: '' },
      { label: '小', value: 'small' },
    ],
    default: '',
  },
  {
    keyId: 'hideRequiredAsterisk',
    keyName: '隐藏必填 *',
    tips: '',
    setters: ['switch'],
    default: '',
  },
  {
    keyId: 'labelWidth',
    keyName: '标签宽度',
    tips: '',
    setters: ['input'],
    optionalValue: [
      { label: 'top', value: 'top', icon:'labelStructureP1' },
      { label: 'left', value: 'left' , icon:'labelStructureP2' },
      { label: 'right', value: 'right', icon:'labelStructureP3' },
    ],
    default: '',
  },
  {
    keyId: 'labelPosition',
    keyName: '标签对齐方式',
    tips: '',
    setters: ['icon-picker'],
    optionalValue: [
      { label: 'top', value: 'top', icon:'labelStructureP1' },
      { label: 'left', value: 'left' , icon:'labelStructureP2' },
      { label: 'right', value: 'right', icon:'labelStructureP3' },
    ],
    default: '',
  },
]
const rootConfMobile = []

const rootConfDesktop = []
export default configRoot