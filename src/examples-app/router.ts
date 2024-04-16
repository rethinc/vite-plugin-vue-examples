import { createRouter, createWebHashHistory } from 'vue-router'
import { routeRecords } from 'virtual:vue-examples-route-records'
import ExampleNotFound from './ExampleNotFound.vue'
import { firstExamplePath } from './first-example-path'

export const examplesAppRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '',
      redirect: firstExamplePath(routeRecords),
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
