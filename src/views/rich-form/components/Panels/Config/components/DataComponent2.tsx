import { defineComponent, nextTick } from 'vue'
import utils from '@/utils'
import { useI18n } from 'vue-i18n'
import { useTarget } from '@/hooks'
import _ from 'lodash-es'
import nzhcn from 'nzh/cn'
import { ElButton, ElIcon, ElInput, ElScrollbar } from 'element-plus'
import $style from './DataComponents.module.scss'
import { Minus, PreviewCloseOne, PreviewOpen } from '@icon-park/vue-next'
export default defineComponent({
  name: 'ConfigData2',
  inheritAttrs: false,
  customOptions: {},
  data () {
    const len = 8
    return {
      len,
      data: new Array(len).fill([]),
      shows: new Array(len).fill(false),
      selected: new Array(len),
      scrollbars: []
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
      this.data[0] = target.value.options.data = target.value.options.data || [...utils.generateOptions(3)]
    } else {
      this.data[0] = _.cloneDeep(state.data[target.value.options.dataKey].list)
    }
    this.shows[0] = true
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        resolve({
          data: _.cloneDeep(this.data[0])
        })
      })
    }
  },
  render (props) {
    const { t, lang } = useI18n()
    const handleAction = (type, x, data) => {
      switch (type) {
        case 1:
          data.push(...utils.generateOptions(1))
          nextTick(() => {
            this.scrollbars[x].setScrollTop(this.scrollbars[x].wrapRef.scrollHeight)
          })
          break
        case 2:
          if (x >= this.len) return false
          this.selected[x] = data.value
          this.shows.forEach((e, i) => {
            if (i > x + 1) {
              this.shows[i] = false
              this.data[i] = []
            }
            if (i > x) {
              this.selected[i] = ''
            }
          })
          this.shows[x + 1] = true
          if (!data.children) {
            data.children = []
          }
          this.data[x + 1] = data.children
          break
        case 3:
          data.disabled = !data.disabled
          this.shows.forEach((e, i) => {
            if (i > x) {
              this.shows[i] = false
              this.data[i] = []
              this.selected[i] = ''
            }
          })
          break
      }
    }
    const ListComponent = ({ items, index }) => (
      <div class={$style.item}>
        {'data component2'}
        <div class={$style.title}>{lang.value === 'zh-cn' ? `${nzhcn.encodeS(index + 1)}${t('rf.config.dataComponent2.level')}` : `${t('rf.config.dataComponent2.level')} ${index + 1}`}</div>
        <ElScrollbar ref={(el) => this.scrollbars.push(el)} tag="ul" max-height="320px">
          { items.map((e, i) => (
            <li>
              <div class={[$style.input, this.selected.includes(e.value) && $style.Selected]}>
                <ElInput
                  clearable
                  size="default"
                  disabled={e.disabled}
                  onChange={() => handleAction(2, index, e)}
                  model-value={e.label}></ElInput>
                <ElIcon onClick={() => items.splice(i, 1)} class={$style.del}>
                  <Minus style={{ color: '#fff' }} size={10} />
                </ElIcon>
                <ElIcon onClick={() => handleAction(3, index, e)} size={20} class={[$style.hide, e.disabled && $style.show]}>
                  {
                    e.disabled ? <PreviewCloseOne/> : <PreviewOpen/>
                  }
                </ElIcon>
              </div>
            </li>
          ))
          }
        </ElScrollbar>
        {this.shows[index] && (
          <div class={$style.control}>
            <ElButton
              icon={'CirclePlus'}
              onClick={() => handleAction(1, index, items)}
              text>
              {t('rf.config.dataComponent2.add')}
            </ElButton>
          </div>
        )}
      </div>
    )
    return (
      <ElScrollbar ref="scrollbar">
        <div class={$style.configData2}>
          {this.data.map((e, index) => {
            return (
              <ListComponent ref="listComponent" items={e} index={index}/>
            )
          })}
        </div>
      </ElScrollbar>
    )
  }
})
