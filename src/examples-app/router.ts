import { createRouter, createWebHashHistory } from 'vue-router'
import { routeRecords } from 'virtual:vue-examples-route-records'
import ExampleNotFound from './ExampleNotFound.vue'

export const examplesAppRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: routeRecords.length > 0 ? routeRecords[0].path : '',
      children: [
        ...routeRecords,
        {
          path: '/:pathMatch(.*)*',
          component: ExampleNotFound,
        },
      ],
    },
  ],
})
