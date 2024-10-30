import { inject } from 'vue'

export const useFlowInject = () => {
  const flowProvider = inject('flow-page', {

  })
  return flowProvider
}