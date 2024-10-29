/**
 * 历史步骤操作方法，该方法可以保证历史记录不会占据太大空间
 * @author 张博飞
 * @date 2023/3/27
 */

class OperateHistory {
  private historyArr: Array<any> = []
  private maxStep = 10
  private current = {}
  private currentIndex = -1
  constructor() {
    this.historyArr = []
    this.maxStep = 10
    this.current = {}
    this.currentIndex = -1
  }

  setMaxStep(stepCount: number) {
    this.maxStep = stepCount
    if (this.historyArr.length > stepCount) {
      this.currentIndex = stepCount - 1
      this.historyArr = this.historyArr.slice(this.historyArr.length - stepCount)
    }
  }

  getHistory() {
    return this.historyArr
  }

  /**
   * 用于更新当前数据的列表
   * @param {function} updater 传入更新方法
   * @returns
   */
  saveStep(receive: any) {
    this.current = receive
    this.historyArr = this.historyArr.slice(0, this.currentIndex + 1)
    this.historyArr.push(this.current)
    if (this.historyArr.length > this.maxStep) {
      this.historyArr.shift()
    } else {
      this.currentIndex += 1
    }
    return this.current
  }

  currentStep() {
    return this.current
  }

  preStep() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1
      this.current = this.historyArr[this.currentIndex]
    }
    return this.current
  }

  nextStep() {
    if (this.currentIndex < this.historyArr.length - 1) {
      this.currentIndex += 1
      this.current = this.historyArr[this.currentIndex]
    }
    return this.current
  }
}
export default new OperateHistory()