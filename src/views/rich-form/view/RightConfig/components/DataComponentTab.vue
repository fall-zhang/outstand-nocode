<!-- collapse tabs -->
<script setup lang="ts">
import { addContext } from '@/utils'
import { useI18n } from 'vue-i18n'
import { unref } from 'vue'
import { DraggableWrap } from '@Form/components/FormContainer/DraggableWrap'
import Icon from '@/assets'
import { renderFieldData } from '@/utils/field'
import { useFormProvider } from '@/views/rich-form/hooks/use-form-provider'
defineOptions({
  name: 'ConfigData3'
})
const { selected } = useFormProvider()
const { t } = useI18n()
const addTab = () => {
  const data = renderFieldData(`${selected.value.type}Col`)
  data.label = `Tab ${unref(selected).columns.length + 1}`
  // console.log(unref(selected))
  unref(selected).columns.push(data)
  addContext(data, selected.value)
}
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
      <DraggableWrap :list="selected.columns" item-key="id" tag="ul" handle=".handle" class="d-content">
        <template #item="{ element, index }">
          <li>
            <el-input size="default" clearable v-model="element.label" />
            <div class="d-operate">
              <Icon class="d-icon" @click="selected.columns.splice(index, 1)" icon="delete"></Icon>
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