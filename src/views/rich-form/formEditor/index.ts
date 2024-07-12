import './theme/icon.scss'
import 'everright-filter/dist/style.css'
import './theme/formEditor/index.scss'
import erFormEditor from './FormEditor.vue'
import erFormPreview from './preview.vue'
import erFormConfig from './config.vue'
import erGeneratorData from './generatorData.ts'
import * as erComponentsConfig from './componentsConfig'
import utils from '@/utils'
/*
* er-form-editor
* er-form-preview
* er-form-configPanel
* */
export {
  erFormEditor,
  erFormPreview,
  erFormConfig,
  erGeneratorData,
  erComponentsConfig,
  utils
}
