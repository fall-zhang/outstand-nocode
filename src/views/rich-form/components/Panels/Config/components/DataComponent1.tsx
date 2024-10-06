import {
  defineComponent,
  unref,
  nextTick,
} from 'vue'
import utils from '@/utils'
import { useTarget } from '@Form/hooks/use-target'
import { useI18n } from 'vue-i18n'
import Icon from '@/assets'
import { dragGableWrap as DraggableWrap } from '@Form/components/FormContainer/DragGable'
import _ from 'lodash-es'
import { ElCheckbox, ElCheckboxGroup, ElForm, ElFormItem, ElScrollbar, ElInput, ElButton } from 'element-plus'
import $style from './DataComponents.module.scss'
export default defineComponent({
  name: 'ConfigData1',
  inheritAttrs: false,
  customOptions: {},
  data () {
    return {
      checkList: [],
      data: []
    }
  },
  computed: {
    isMultiple () {
      let result = false
      const {
        target,
        type
      } = useTarget()
      switch (type.value) {
        case 'checkbox':
          result = true
          break
        case 'select':
        case 'cascader':
          result = target.value.options.multiple
          break
        case 'tabs':
        case 'radio':
          result = false
          break
      }
      return result
    }
  },
  created () {
    const {
      state,
      target
    } = useTarget()
    if (state.mode === 'config') {
      this.data = target.value.options.data = target.value.options.data || [...utils.generateOptions(3)]
    } else {
      this.data = _.cloneDeep(state.data[target.value.options.dataKey].list)
    }
    if (this.isMultiple) {
      this.checkList = _.cloneDeep(target.value.options.defaultValue)
    } else {
      this.checkList = [target.value.options.defaultValue]
    }
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            const result = {
              data: _.cloneDeep(this.data),
              defaultValue: ''
            }
            if (this.isMultiple) {
              result.defaultValue = _.intersection(result.data.map(e => e.value), unref(this.checkList))
            } else if (_.find(result.data, { value: unref(this.checkList)[0] }) !== -1) {
              result.defaultValue = unref(this.checkList)[0]
            }
            resolve(result)
          } else {
            reject()
          }
        })
      })
    }
  },
  render (props) {
    const { t } = useI18n()
    const validator = ({ field }, value, callback) => {
      const newValue = value.trim()
      if (newValue === '' || newValue === null || newValue === undefined) {
        callback(new Error(t('rf.validateMsg.required')))
        return false
      }
      if (field.includes('value')) {
        if (this.data.filter((e) => e.value === newValue).length > 1) {
          callback(new Error(t('rf.validateMsg.idUnique')))
          return false
        }
        callback()
      } else {
        callback()
      }
    }
    const slots = {
      item: ({ element, index }) => {
        return (
          <tr>
            <td>
              <ElCheckbox onChange={(e) => handleChange(e, element)} label={element.value}/>
            </td>
            <td>
              <ElFormItem prop={`${index}.value`} rules={{ validator }}>
                <ElInput clearable vModel={element.value}></ElInput>
              </ElFormItem>
            </td>
            <td>
              <ElFormItem prop={`${index}.label`} rules={{ validator }}>
                <ElInput clearable vModel={element.label}></ElInput>
              </ElFormItem>
            </td>
            <td>
              <div class={$style.operate}>
                <Icon class={$style.icon} onClick={() => this.data.splice(index, 1)} icon="delete"></Icon>
                <Icon class={[$style.icon, $style.handle]} icon="move1"></Icon>
              </div>
            </td>
          </tr>
        )
      }
    }
    // 添加选项
    const onAddSelect = () => {
      this.data.push(...utils.generateOptions(1))
      nextTick(() => {
        this.$refs.scrollbar.setScrollTop(this.$refs.scrollbar.wrapRef.scrollHeight)
      })
    }
    const handleChange = (value, item) => {
      if (!this.isMultiple) {
        if (!value) {
          return false
        }
        unref(this.checkList).filter(e => e !== item.value).forEach((e) => {
          unref(this.checkList).splice(unref(this.checkList).indexOf(e), 1)
        })
      }
    }
    return (
      <div>
        {'DataComponent1'}
        <table class={$style.tableThead}>
          <thead>
            <tr>
              <th>{t('rf.config.dataComponent1.defaultLabel')}</th>
              <th>{t('rf.config.dataComponent1.unique')}</th>
              <th>{t('rf.config.dataComponent1.name')}</th>
              <th >{t('rf.config.dataComponent1.operate')}</th>
            </tr>
          </thead>
        </table>
        <ElScrollbar ref="scrollbar" height="400px">
          <ElForm ref="form" model={this.data}>
            <ElCheckboxGroup
              modelValue={this.checkList}
            >
              <table class={$style.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th ></th>
                  </tr>
                </thead>
                <DraggableWrap
                  tag="tbody"
                  list={this.data}
                  handle=".handle"
                  item-key="null"
                  v-slots={slots}
                >
                </DraggableWrap>
              </table>
            </ElCheckboxGroup>
          </ElForm>
        </ElScrollbar>
        <div class={$style.button}>
          <ElButton onClick={onAddSelect}>{t('rf.config.dataComponent1.add')}</ElButton>
        </div>
      </div>
    )
  }
})
