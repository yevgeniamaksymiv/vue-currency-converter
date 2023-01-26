import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomePage/HomeComponent.vue';
import store from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/diagram',
    name: 'diagram',
    component: () => import('@/components/DiagramPage/DiagramComponent.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/LoginForm.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/PageNotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

  const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !store.state.isLogin) {
      next('/login');
    } else {
      next();
    }
  })

  export default router;

