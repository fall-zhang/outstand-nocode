<!-- collapse tabs -->
<script setup lang="ts">
// import { addContext } from '@/utils'
import { useI18n } from 'vue-i18n'
import { unref } from 'vue'
import { DraggableWrap } from '@Form/components/DraggableWrap'
import Icon from '@/assets'
import { renderFieldData } from '@Form/utils/field'
import { useFormProvider } from '@Form/hooks/use-form-provider'
import { FieldItemContainer } from '@/views/rich-form/types/rich-form-item'
defineOptions({
  name: 'ConfigData3'
})
const { selected, containerFiledList } = useFormProvider()
const { t } = useI18n()
const addTab = () => {
  const tar = unref(selected) as unknown as FieldItemContainer
  const data = renderFieldData()
  data.label = `Tab ${tar.columns.length + 1}`
  unref(tar).columns.push(data)
  // addContext(data, tar)
}
const curSelect = computed(() => {
  if (!containerFiledList.value.includes(selected.value.type)) {
    console.warn('当前容器不在容器配置内', selected)
  }
  return unref(selected) as unknown as FieldItemContainer
})
</script>
<template>
  <el-form-item>
    <template #label>
      <div class="d-title">
        <span class="el-form-item__label">{{ t('rf.config.dataComponent3.panel') }}</span>
        <el-button text @click="addTab">{{ t('rf.config.dataComponent3.add') }}</el-button>
      </div>
    </template>
    <div style="width: 100%;">
      <DraggableWrap :list="curSelect.columns" item-key="id" tag="ul" handle=".handle" class="d-content">
        <template #item="{ element, index }">
          <li>
            <el-input size="default" clearable v-model="element.label" />
            <div class="d-operate">
              <Icon class="d-icon" @click="curSelect.columns.splice(index, 1)" icon="delete"></Icon>
              <Icon class="d-icon handle" icon="Rank"></Icon>
            </div>
          </li>
        </template>
      </DraggableWrap>
    </div>
  </el-form-item>
</template>
<style lang="scss" scoped>
.d-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button {
    background: none !important;
    padding: 0;
  }
}

.d-content {
  li {
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-input {
      width: 86%;
    }
  }
}

.d-icon {
  &:hover {
    color: $primary-color;
  }
}

.d-operate {
  width: 16%;
  display: flex;
  justify-content: space-around;
}
</style>