import { GlobalConfig } from '../types/rich-form-config'

// 用户自定义配置
const config:GlobalConfig = {
  inlineMax: 4,
  isSync: false,
  colorList: [
    'rgba(255, 255, 255, 1)',
    'rgba(249, 249, 249, 1)',
    'rgba(233, 233, 233, 1)',
    'rgba(254, 249, 210, 1)',
    'rgba(253, 246, 236, 1)',
    'rgba(254, 241, 241, 1)',
    'rgba(236, 246, 255, 1)',
    'rgba(235, 242, 244, 1)',
    'rgba(240, 249, 236, 1)'
  ],
  mobile: {
    completeButton: {
      text: ''
    }
  },
  desktop: {
    formOption: {
      size: 'default',
      labelPosition: 'left',
      hideRequiredAsterisk: false,
      labelWidth: ''
    },
    completeButton: {
      text: ''
    }
  }
}
export default config