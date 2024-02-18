import { ref } from 'vue'
import { Star as IconStar, MoreOne as IconMoreOne } from '@icon-park/vue-next'
import s from './FileList.module.scss'
import { usePost } from '@/utils/Request'
import barImage from '@/assets/images/charts-example/bar-chart.png'
import GridColumn from '@/layout/GridColumn.vue'

export default {
  components: {
    IconStar, GridColumn
  },
  setup() {
    // console.log(this.udfu)
    const currentSelect = ref<string>('全部')
    const onFilterSelect = function (type: string) {
      currentSelect.value = type
    }
    function onEnterChart(type: string) {
      currentSelect.value = type
    }
    const allFiles = ref<any[]>([])
    usePost('/api/home/files').then(res => {
      allFiles.value = res
    })
    return () => (<>
      <div class={s.header}>
        <div class={s.selectGroup}>
          <a onClick={() => onFilterSelect('全部')} class={currentSelect.value === '全部' && s.select}>全部</a>
          {/* <a onClick={() => onFilterSelect('导图')} class={currentSelect.value === '导图' && s.select}>导图</a> */}
          <a onClick={() => onFilterSelect('图表')} class={currentSelect.value === '图表' && s.select}>图表</a>
          <a onClick={() => onFilterSelect('收藏')} class={currentSelect.value === '收藏' && s.select}>收藏</a>
        </div>
        <div class={s.selectGroup}>
          {/* 回头制作视图切换的效果 */}
        </div>
      </div>
      <GridColumn width={280} class={s.chartFileGroup} >
        {
          allFiles.value.map((item) => {
            return <div class={s.chartItem} onClick={() => onEnterChart(item)} >
              <div class={s.itemImg} >
                {/* <img src='@/assets/images/charts-example/bar-chart.png'></img> */}
                <img src={barImage} style={{ height: '100%', width: '100%' }}></img>
                图片位置</div>
              <div class={s.itemText}>
                <span>图片名称</span>
                <span class={s.option}>
                  <IconStar theme={item === '12' ? undefined : 'filled'} class={s.star} />
                  <IconMoreOne class={s.more}></IconMoreOne>
                </span>
              </div>
            </div>
          })
        }
      </GridColumn>
    </>)
  },
}