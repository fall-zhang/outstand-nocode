import type { Ref } from 'vue'
import { ref } from 'vue'

export type KeyModifier = 'Alt' | 'AltGraph' | 'CapsLock' | 'Control' | 'Fn' | 'FnLock' | 'Meta' | 'NumLock' | 'ScrollLock' | 'Shift' | 'Symbol' | 'SymbolLock'


export type UseKeyModifierReturn<Initial> = Ref<Initial extends boolean ? boolean : boolean | null>

export function useKeyModifier<Initial extends boolean | null>(modifier: KeyModifier): UseKeyModifierReturn<Initial> {
  const {
    events = defaultEvents,
    document,
    initial = null,
  } = options

  const state = ref(initial) as Ref<boolean>

  if (document) {
    events.forEach((listenerEvent) => {
      useEventListener(document, listenerEvent, (evt: KeyboardEvent | MouseEvent) => {
        if (typeof evt.getModifierState === 'function') { state.value = evt.getModifierState(modifier) }
      })
    })
  }

  return state
}