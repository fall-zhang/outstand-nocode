import { RichFormProvider } from '../types/rich-form'
import { FieldItemBase } from '../types/rich-form-item'

type FormItemArg = {
  state: RichFormProvider // FE
  data: FieldItemBase // fieldItem 也叫 element
  isDesktop?: boolean
  isRoot?: boolean
}

/**
 * 通过一系列信息，获取 el-form-item 的 props
 */
export const useFormItemProps = ({
  state, // FE
  // element,
  data, // fieldItem 也叫 element
  isDesktop = true,
  isRoot = false
}:FormItemArg) => {

}