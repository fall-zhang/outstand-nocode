export type FormItem = {
  id: string
  key:string
  label: string
  children?: FormItem
  options:Record<string, unknown>
}