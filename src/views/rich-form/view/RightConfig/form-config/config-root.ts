import { FormOption } from './form-config'
const configInput:FormOption[] = [{
  keyId: 'id',
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
  keyId: 'name',
  keyName: '标签对齐方式',
  tips: '',
  setters: ['icon-picker'],
  default: '',
}]

export default configInput