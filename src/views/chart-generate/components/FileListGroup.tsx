import { ref } from 'vue'
import { Star as IconStar } from '@icon-park/vue-next'
import s from './FileListGroup.module.scss'
import Img from '@A/images/charts-example/line-chart.png'
import FileList from './FileList'
export default function FileListGroup() {
  // console.log(this.udfu)
  const allFiles = ref([
    {
      chartName: '折线图',
      chartType: 'line',
      imgPath: Img
    },
    {
      chartName: '折线图',
      chartType: 'line-stack',
      imgPath: Img
    }
  ])
  const outContainer = ref()
  function onFileSelect() {
    console.log(64646)

  }
  return (<>
    <div class={s.chartFileGroup} ref={outContainer} >
      {
        allFiles.value.map((item) => {
          return <div class={s.chartItem}>
            <div class={s.headText}>
              {item.chartType}（{item.chartName}）
            </div>
            <img class={s.itemImg} src={item.imgPath} />
          </div>
        })
      }
    </div>
  </>)
}
