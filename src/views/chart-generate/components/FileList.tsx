import { ref, defineProps } from 'vue'
import s from './FileList.module.scss'
import Img from '@A/images/charts-example/line-chart.png'

export default {
  props: {
    label: {}
  },
  emits: ['submit'],
  render(prop:any, context:any) {
    console.log(this)

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
    const rowCount = ref()
    const onClickMenu = () => {
      console.log(prop)
      console.log(this)
      // console.log(attrs)
    }
    return (<>
      <div class={s.chartFileGroup} ref={outContainer} style={
        { gridTemplateColumns: 'repeat(' + rowCount.value + '1fr)' }
      }>
        {
          allFiles.value.map((item) => {
            return <div class={s.chartItem} onClick={onClickMenu} >
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
  // setup(props: any, { emit, attrs }) {
  //   const allFiles = ref([
  //     {
  //       chartName: '折线图',
  //       chartType: 'line',
  //       imgPath: Img
  //     },
  //     {
  //       chartName: '折线图',
  //       chartType: 'line-stack',
  //       imgPath: Img
  //     }
  //   ])
  //   const outContainer = ref()
  //   const rowCount = ref()
  //   // function resizeContainer() {
  //   //   const out = outContainer.value.getBoundingClientRect()
  //   //   rowCount.value = Math.ceil(Number(out.width) / 360)
  //   // }
  //   // onMounted(() => {
  //   //   window.addEventListener('resize', resizeContainer)
  //   //   resizeContainer()
  //   // })
  //   // onUnmounted(() => {
  //   //   window.removeEventListener('resize', resizeContainer)
  //   // })

  //   // const emit = defineEmits(['submit'])
  //   function onClickMenu() {
  //     // console.log(props)
  //     // console.log(emit)
  //     // console.log(attrs)
  //     emit('submit', 45454)
  //   }
  //   return () => (<>
  //     <div class={s.chartFileGroup} ref={outContainer} style={
  //       { gridTemplateColumns: 'repeat(' + rowCount.value + '1fr)' }
  //     }>
  //       {props.label}
  //       {
  //         allFiles.value.map((item) => {
  //           return <div class={s.chartItem} onClick={onClickMenu} >
  //             <div class={s.headText}>
  //               {item.chartType}（{item.chartName}）
  //             </div>
  //             <img class={s.itemImg} src={item.imgPath} />
  //           </div>
  //         })
  //       }
  //     </div>
  //   </>)
  // }
}
