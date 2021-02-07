import examples from './examples.js'


const page403 = {
    path: '/403',
    meta: {
      title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
      import('@/components/common/error_page/new_403.vue')
};

export const appRouter = {
    path: '/',
    name: 'home',
    redirect: {
    	name: 'examples'
    },
    component: () => import ('@/pages/layout/Layout'),
    children: [
        examples
    ],    
};
export const routers = [
    appRouter,
    page403,
];
