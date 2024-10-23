import { ref, computed } from 'vue'

type StoreType = Record<string, unknown> | Record<string, unknown>[]

export const useHistory = (source:StoreType) => {
  const onOff = ref(true)

  const last = ref()
  const undoStack = ref([])
  const redoStack = ref([])
  const canUndo = computed(() => undoStack.value.length > 0)
  const canRedo = computed(() => redoStack.value.length > 0)
  const setSource = (state:Record<string, unknown>) => {
    last.value = state
    redoStack.value = []
  }
  const undo = () => {
    const state = undoStack.value.shift()
    if (state) {
      redoStack.value.unshift(state)
      setSource(state)
    }
  }
  const redo = () => {
    const state = redoStack.value.shift()
    if (state) {
      setSource(state)
    }
  }


  const stop = () => { onOff.value = false }
  return {
    undo,
    redo,
    undoStack,
    redoStack,
    last,
    stop,
  }
}
