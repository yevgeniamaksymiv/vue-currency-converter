import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from '@/components/HomePage/HomeComponent.vue';

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
  },
];

  const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(),
    routes,
  });

  export default router;

