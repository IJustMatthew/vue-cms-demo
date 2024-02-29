import InboxPage from '@/pages/InboxPage.vue'
import OutboundPage from '@/pages/OutboundPage.vue'
import { loadLayoutMiddleware } from '@/router/loadLayoutMiddleware'
import { RoutePaths } from '@/router/routes'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Routes array
const routes: Array<RouteRecordRaw> = [
  {
    path: RoutePaths.Inbox,
    name: 'Inbox',
    component: InboxPage,
    meta: {
      transitionName: 'fade',
      layout: 'AuthenticatedLayout',
    },
  },
  {
    path: RoutePaths.Outbound,
    name: 'Outbound',
    component: OutboundPage,
    meta: {
      transitionName: 'fade',
      layout: 'AuthenticatedLayout',
    },
  },
  {
    path: RoutePaths.PageNotFound,
    name: 'PageNotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      transitionName: 'fade',
      layout: 'BaseLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/page-not-found',
  },
]

// Router creation and configuration
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(loadLayoutMiddleware)

export default router
