import type { RouteRecordRaw } from 'vue-router'
import { BlankLayout } from '../layout'
const constRouters: RouteRecordRaw[] = [
  {
    path: '/home-page',
    component: () =>/* 首页 */ import('@V/home-page/HomePage.vue')
  },
  {
    path: '/flow-page',
    component: () => /* 流程设计 */import('@V/flow-page/FlowPage.vue')
  },
  {
    path: '/chart-generate',
    component: () => /* 图表生成 */import('@V/chart-generate/ChartGenerate.vue')
  },
  {
    path: '/rich-form',
    component: () => /* 图表生成 */import('@V/rich-form/RichForm.vue')
  },
  {
    path: '/rich-table',
    component: () => /* 图表生成 */import('@V/rich-table/RichTable.vue')
  },
  {
    path: '/filling-chart',
    name: 'filling-chart',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>/* 图表编辑 */ import('@V/filling-chart/MainView.vue')
  },
  // {
  //   path: '/chart/:id',
  //   name: 'chart',
  //   component: () => import('@/views/MainView.vue'),
  //   // component: BlankRouter,
  //   // children: [
  //   //   {
  //   //     path: '/echarts/echarts-gen-tool',
  //   //     name: 'echarts-gen-tool',
  //   //     component: () => import('@/views/echarts-gen-tool/MainView.vue'),
  //   //     meta: { menuName: "生成echarts" },
  //   //   }
  //   // ]
  // },
  {
    name: 'not-found',
    path: '/:unHandlePath(.*)*',
    redirect: '/home-page',
    //  component: NotFound
  },
]
export default constRouters
