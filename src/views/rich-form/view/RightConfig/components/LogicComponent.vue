<script>
import { ref, inject, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import _ from 'lodash-es'
import Icon from '@/assets'
import { get } from '@/utils/utils'
export default {
  name: 'ConfigLogicComponent'
}
</script>
<script setup>
const { t, } = useI18n()
const tabs = ref([
  {
    value: 'visible',
    label: t(`rf.logic.tabs.visible`),
    rules: [],
    ifRefs: [],
    thenRefs: []
  },
  {
    value: 'required',
    label: t(`rf.logic.tabs.required`),
    rules: [],
    ifRefs: [],
    thenRefs: []
  },
  {
    value: 'readOnly',
    label: t(`rf.logic.tabs.readOnly`),
    rules: [],
    ifRefs: [],
    thenRefs: []
  }
  // 暂时放弃，后期来做
  // {
  //   label: '校验',
  //   value: 'validation',
  //   rules: [],
  //   ifRefs: [],
  //   thenRefs: []
  // }
])
const activeTab = ref('visible')
const ER = inject('rich-form')
const scrollbarRef = ref()
const dialogVisible = ref(false)
const curIndex = computed(() => _.findIndex(tabs.value, { value: activeTab.value }))
const getTabData = (tab) => {
  // const tab = _.find(tabs.value, { value: type })
  return tab.ifRefs.map((rule, index) => {
    return {
      ifRules: rule.getData(),
      thenRules: tab.thenRefs[index].getData()
    }
  })
}
const checkTab = (tab) => {
  let result = false
  if (tab.rules.length) {
    result = [...tab.ifRefs, ...tab.thenRefs].every(e => !_.isEmpty(e.getData()))
  } else {
    result = true
  }
  return result
}
const getData = () => {
  let index = 0
  let isSuccess = true
  const result = {}
  while (index < tabs.value.length) {
    if (!checkTab(tabs.value[index])) {
      activeTab.value = tabs.value[index].value
      isSuccess = false
      break
    }
    index++
  }
  if (isSuccess) {
    tabs.value.forEach(tab => {
      if (tab.rules.length) {
        result[tab.value] = getTabData(tab)
      }
    })
  }
  return result
}

const closeDialog = () => {
  dialogVisible.value = false
}
const openDialog = () => {
  dialogVisible.value = true
  tabs.value.forEach((tab, index) => {
    const rules = get(ER.logic, `${tab.value}`, [])
    remoteCount += rules.length * 2
    rules.forEach((rule, index) => {
      tab.rules.push(index)
    })
  })
}
const handleAction = (type) => {
  switch (type) {
    case 0:
      closeDialog()
      break
    case 1: {
      const rules = tabs.value[curIndex.value].rules
      rules.push(rules.length)
      nextTick(() => {
        requestAnimationFrame(() => {
          scrollbarRef.value[curIndex.value].setScrollTop(scrollbarRef.value[curIndex.value].wrapRef.scrollHeight)
        })
      })
      break
    }
    case 2:
      if (tabs.value.every(tab => !tab.rules.length)) {
        ER.logic = {}
        closeDialog()
      } else {
        const data = getData()
        if (!_.isEmpty(data)) {
          ER.logic = getData(activeTab.value)
          closeDialog()
        }
      }
      break
  }
}

const handleClosed = () => {
  tabs.value.forEach(tab => {
    tab.rules = []
  })
}
</script>
<template>
  <el-drawer destroy-on-close size="60%" :modal="false" append-to-body :close-on-press-escape="false"
    :with-header="false" @closed="handleClosed" class="ConfigLogicComponent" v-model="dialogVisible">
    <el-tabs v-model="activeTab" class="demo-tabs">
      <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.value" :key="tab.value">
        <el-scrollbar ref="scrollbarRef" max-height="calc(100vh - 210px)">
          <el-empty v-if="!tab.rules.length">
            <el-button type="primary" icon="plus" @click="handleAction(1)">{{ t('rf.public.add') }}</el-button>
          </el-empty>
          <transition-group v-else name="el-fade-in">
            <div class="rule" v-for="(key, index) in tab.rules" :key="key">
              <Icon @click="tab.rules.splice(index, 1)" class="delRule" icon="delete" />
              <div class="filter-if">
                <h3>{{ t('rf.logic.filterLabel.if') }}</h3>
              </div>
              <div :class="['then', `${tab.value}then`]">
                <h3>{{ t('rf.logic.filterLabel.then') }}</h3>
              </div>
            </div>
          </transition-group>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <el-button v-show="tabs[curIndex].rules.length" class="button" @click="handleAction(1)">
      {{ t('rf.public.add') }}
    </el-button>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAction(0)">
          {{ t('rf.public.cancel') }}
        </el-button>
        <el-button type="primary" @click="handleAction(2)">
          {{ t('rf.public.confirm') }}
        </el-button>
      </span>
    </template>
  </el-drawer>
  <el-button style="width: 100%;" type="primary" @click="openDialog">
    {{ t('rf.logic.button') }}
  </el-button>
</template>
<style lang="scss" scoped>
.ConfigLogicComponent {
  .rule {
    margin: 10px;
    border-radius: 6px;
    padding: 10px 20px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    position: relative;

    &>div {
      &:first-child {
        margin-top: 0;
      }

      h3 {
        padding: 10px 0 0;
        margin: 0;
        color: #333333;
      }
    }
  }

  .delRule {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .requiredThen,
  .readOnlyThen {
    .Component {
      display: none;
    }
  }

  .FilterItem {
    background: none;
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 40px;
  }

  .Main {
    padding: 0;
  }

  @include e(button) {
    width: calc(100% - 20px);
    border: none;
    margin: 10px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1) !important;

    &:focus {
      background-color: transparent;
    }

    &:hover {
      background: var(--el-button-hover-bg-color);
    }
  }

  .OperatorComponent__width {
    width: 120px;
  }

  .TriggerComponent,
  .TextType__width,
  .SelectType__width,
  .RegionType__width {
    width: 200px !important;
  }

  .NumberType__width {
    width: 150px;
  }
}
</style>