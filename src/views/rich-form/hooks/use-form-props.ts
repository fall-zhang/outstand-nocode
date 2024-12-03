import { FeatureProvider } from './use-form-provider'
import { FormItemProps, FormProps } from 'element-plus'
import { FormProps  as VanFormProps ,FieldProps as VanFieldProps } from 'vant'
type FormBindArg = {
  state: FeatureProvider // FE
  isDesktop?: boolean
}

type MutablePartial<T> = {
  -readonly [K in keyof T]?: T[K]
}
/**
 * 通过一系列信息，获取 el-form 的 props
 */
export const useFormProps = ({
  state, // fieldItem 也叫 element
  isDesktop = true,
}:FormBindArg) => {
  return computed(() => {
    const optData = reactive(state)

    let result:MutablePartial<FormProps |VanFormProps>
    if (isDesktop) {
      const deskTopConf:MutablePartial<FormProps> = {}
      const platformConf = optData.desktop.formOption
      deskTopConf.size = platformConf.size
      deskTopConf.labelWidth = platformConf.labelWidth + 'px'
      deskTopConf.labelPosition = platformConf.labelPosition
      deskTopConf.hideRequiredAsterisk = platformConf.hideRequiredAsterisk
      result = deskTopConf
    } else {
      const platformConf = optData.mobile.formOption
      const deskTopConf:MutablePartial<VanFormProps> = {}
      deskTopConf.labelAlign = platformConf.labelPosition
      result = deskTopConf
    }
    return result
  })
}
