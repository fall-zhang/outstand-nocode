<script>
export default {
  name: 'FeSliderMobile',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
const props = defineProps({
  data: {
    require: true,
    type: Object,
    default: () => ({})
  },
  params: {
    require: true,
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <van-field readonly class="FormTypesSlider_mobile" v-bind="params">
    <template #input>
      <van-slider v-model="data.options.defaultValue" v-bind="params">
        <template #button>
          <div :class="ns.e('customButton')">{{ data.options.defaultValue }}</div>
        </template>
      </van-slider>
    </template>
  </van-field>
</template>

<style scoped>
.FormTypesSlider_mobile {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 100px;
}
</style>
