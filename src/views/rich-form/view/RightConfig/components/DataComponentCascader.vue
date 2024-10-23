<template>
  <ElScrollbar ref="scrollbar">
    <div :class="$style.configData2" v-for="(elements, index) in data" :key="index">
      <div :class="$style.item">
        <div :class="$style.title">
          {{ lang === 'zh' ?
            `${nzhcn.encodeS(index + 1)}${t('rf.config.dataComponent2.level')}`
            : `${t('rf.config.dataComponent2.level')}
          ${index + 1}` }}
        </div>
        <ElScrollbar :ref="(el) => scrollbars.push(el)" tag="ul" max-height="320px">
          <li v-for="(ele, index2) in elements" :key="index2">
            <div :class="[$style.input, selected.includes(ele.value) && $style.Selected]">
              <ElInput clearable size="default" :disabled="ele.disabled" @change="() => handleAction(2, index, ele)"
                :model-value="ele.label"></ElInput>
              <ElIcon @click="() => elements.splice(index2, 1)" :class="$style.del">
                <Minus style="color:#fff" size="10" />
              </ElIcon>
              <ElIcon @click="() => handleAction(3, index, ele)" :size="20"
                :class="[$style.hide, ele.disabled && $style.show]">
                <PreviewCloseOne v-if="ele.disabled" />
                <PreviewOpen v-else />
              </ElIcon>
            </div>
          </li>
        </ElScrollbar>
        <div v-if="shows[index]" :class="$style.control">
          <ElButton icon="CirclePlus" @click="() => handleAction(1, index, elements)" text>
            {{ t('rf.config.dataComponent2.add') }}
          </ElButton>
        </div>
      </div>
    </div>
  </ElScrollbar>
</template>

<script lang="tsx" setup>
import { deepClone } from '@/utils'
import { useI18n } from 'vue-i18n'
import { useTarget } from '@Form/hooks/use-target'
import nzhcn from 'nzh/cn'
import { ElButton, ElIcon, ElInput, ElScrollbar } from 'element-plus'
import $style from './DataComponents.module.scss'
import { Minus, PreviewCloseOne, PreviewOpen } from '@icon-park/vue-next'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
import { generateOptions } from '@/utils/generateOptions'
defineOptions({
  name: 'ConfigData2',
  inheritAttrs: false,
})
const defaultLength = 8

const { t } = useI18n()
const { lang } = useFormProvider()

const data = ref(new Array(defaultLength).fill([]))
const shows = ref(new Array(defaultLength).fill(false))
const selected = ref(new Array(defaultLength))
const scrollbars = ref<(Element | ComponentPublicInstance | null)[]>([])

const { state, target } = useTarget()
if (state.mode === 'config') {
  data.value[0] = target.value.options.data = target.value.options.data || generateOptions(3)
} else {
  data.value[0] = deepClone(state.data[target.value.options.dataKey].list)
}
shows.value[0] = true

const handleAction = (type: number, x: number, recData: any) => {
  switch (type) {
    case 1:
      // recData.push(...generateOptions(1))
      // if (scrollbars.value[x]) {
      //   scrollbars.value[x].setScrollTop(scrollbars.value[x].wrapRef.scrollHeight)
      // }
      break
    case 2:
      if (x >= defaultLength) return false
      selected.value[x] = recData.value
      shows.value.forEach((e, i) => {
        if (i > x + 1) {
          shows.value[i] = false
          data.value[i] = []
        }
        if (i > x) {
          selected.value[i] = ''
        }
      })
      shows.value[x + 1] = true
      if (!recData.children) {
        recData.children = []
      }
      data.value[x + 1] = recData.children
      break
    case 3:
      recData.disabled = !recData.disabled
      shows.value.forEach((e, i) => {
        if (i > x) {
          shows.value[i] = false
          data.value[i] = []
          selected.value[i] = ''
        }
      })
      break
  }
}
function getData() {
  return new Promise((resolve, reject) => {
    resolve({
      data: deepClone(data.value[0])
    })
  })
}

defineExpose({
  getData
})

</script>

<style lang="scss" src="./DataComponents.module.scss" module scoped></style>
