import { FieldItemBase } from '@Form/types/rich-form-item'
interface FiledItemCascader extends FieldItemBase {
  type: 'cascader',
  icon:string
}
const defaultConfig:FiledItemCascader = {
  type: 'cascader',
  label: '级联框',
  icon: 'cascader',
  key: '',
  id: '',
  options: {
    filterable: true,
    multiple: false,
    checkStrictly: false,
    defaultValue: '',
    placeholder: '',
    labelWidth: 100,
    isShowLabel: true,
    required: false,
    disabled: false,
    clearable: true
  }
}

export default  defaultConfig