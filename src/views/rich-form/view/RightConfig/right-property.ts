
import type { BaseItemType, ContainerItemTypes } from '../../types/rich-form-item.js'
import type { FormOption } from './types/form-config.d.ts'
import configInput from './form-config/config-input.js'
import configRoot from './form-config/config-root.js'

const optionMap:Record<BaseItemType | ContainerItemTypes | 'root', FormOption[]> = {
  root: configRoot,
  number: [],
  input: configInput,
  select: [],
  textarea: [],
  radio: [],
  checkbox: [],
  time: [],
  date: [],
  rate: [],
  switch: [],
  slider: [],
  col: [],
  grid: [],
  tabs: [],
  collapse: [],
  divider: [],
  inline: [],
  cascader: []
}

export default optionMap
