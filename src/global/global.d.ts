declare module 'mitt'

type MutablePartial<T> = {
  -readonly [K in keyof T]?: T[K]
}