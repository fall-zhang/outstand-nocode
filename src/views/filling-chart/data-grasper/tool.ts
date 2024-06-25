type Setting = Record<'color', string[]>

interface GenRequireButton {
  (chartOption: any, setting: Setting): any[]
}

export const genRequireButton: GenRequireButton = (chartOption, setting) => {
  let colorIndex = 0
  const lefu = colorIndex % setting.color.length
  const currentColor = setting.color[lefu]
  colorIndex++
  const result: any[] = []
  if (chartOption.xAxis) {
    result.push()
    Array.isArray(chartOption.xAxis)

  }
  return result
}