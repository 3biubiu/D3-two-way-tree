import examples from './examples.js'
import config from "@/config"

const page403 = {
    path: config.routerPrefix+'/403',
    meta: {
      title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
      import('@/pages/error_page/new_403.vue')
};
const page404 = {
    path: config.routerPrefix+'/404',
    meta: {
      title: '404-找不到该页面'
    },
    name: 'error-404',
    component: () =>
      import('@/pages/error_page/new_404.vue')
};
const page500 = {
    path: config.routerPrefix+'/500',
    meta: {
      title: '500-服务器错误'
    },
    name: 'error-500',
    component: () =>
      import('@/pages/error_page/new_500.vue')
};

export const appRouter = {
    path: config.routerPrefix+'/',
    name: 'test',
    redirect: {
    	name: 'test'
    },
    component: () => import ('@/pages/layout/Layout'),
    children: [
        examples
    ],    
};
export const routers = [
    appRouter,
    page403,
    page404,
    page500
];
