import { FieldItemContainer } from '@Form/types/rich-form-item'
type CollapseProps = {
  data: FieldItemContainer,
  parent: Array<unknown>
}
interface CollapseData extends FieldItemContainer {
  options:{
    span: number
    offset: number
    contentPosition?: 'center'|'left'|'right'
  }
}