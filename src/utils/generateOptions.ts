import { nanoid } from './nanoid'
export const generateOptions = (len:number) => {
  const result = new Array(len).fill({}).map(item => ({
    label: 'Option',
    value: nanoid()
  }))
  return result
}
