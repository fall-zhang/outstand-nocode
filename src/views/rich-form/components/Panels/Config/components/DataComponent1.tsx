import {
  defineComponent,
  unref,
  nextTick,
} from 'vue'
import utils from '@/utils'
import { useTarget, useI18n, useNamespace } from '@/hooks'
import Icon from '@/assets'
import { dragGableWrap } from '@/views/rich-form/components/Layout/DragGable'
import _ from 'lodash-es'
import { ElCheckbox, ElCheckboxGroup, ElForm, ElFormItem, ElScrollbar, ElInput, ElButton } from 'element-plus'
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
    const ns = useNamespace('ConfigData1')
    const validator = ({ field }, value, callback) => {
      const newValue = value.trim()
      if (newValue === '' || newValue === null || newValue === undefined) {
        callback(new Error(t('er.validateMsg.required')))
        return false
      }
      if (field.includes('value')) {
        if (this.data.filter((e) => e.value === newValue).length > 1) {
          callback(new Error(t('er.validateMsg.idUnique')))
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
              <div class={ns.e('operate')}>
                <Icon class={[ns.e('icon')]} onClick={() => this.data.splice(index, 1)} icon="delete"></Icon>
                <Icon class={[ns.e('icon'), 'handle']} icon="move1"></Icon>
              </div>
            </td>
          </tr>
        )
      }
    }
    const handleAction = (type) => {
      switch (type) {
        case 1:
          this.data.push(...utils.generateOptions(1))
          nextTick(() => {
            this.$refs.scrollbar.setScrollTop(this.$refs.scrollbar.wrapRef.scrollHeight)
          })
          break
        case 2:
        // target.value.options.defaultValue = isMultiple.value ? [] : ''
          break
      }
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
        <table class={[ns.e('tableThead')]}>
          <thead>
            <tr>
              <th >{t('er.config.dataComponent1.defaultLabel')}</th>
              <th>{t('er.config.dataComponent1.unique')}</th>
              <th>{t('er.config.dataComponent1.name')}</th>
              <th >{t('er.config.dataComponent1.operate')}</th>
            </tr>
          </thead>
        </table>
        <ElScrollbar ref="scrollbar" height="400px">
          <ElForm ref="form" model={this.data}>
            <ElCheckboxGroup
              vModel={this.checkList}
            >
              <table className={[ns.e('table')]}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th ></th>
                  </tr>
                </thead>
                <dragGableWrap
                  tag="tbody"
                  list={this.data}
                  handle=".handle"
                  item-key="null"
                  v-slots={slots}
                >
                </dragGableWrap>
              </table>
            </ElCheckboxGroup>
          </ElForm>
        </ElScrollbar>
        <div class={ns.e('button')}>
          <ElButton onClick={() => handleAction(1)}>{t('er.config.dataComponent1.add')}</ElButton>
        </div>
      </div>
    )
  }
})
