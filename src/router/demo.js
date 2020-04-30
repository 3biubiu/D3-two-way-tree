const demo = {
    path:'demo',
    name:'demo',
    meta:{
        title:'示例'
    },
    redirect: {
        name: 'first_demo'
    },
    component:()=> import('@/components/common/router_view/RouterView.vue'),
    children:[
        {
            path:'first_demo',
            name:'first_demo',
            meta:{
                title:'第一个示例页面'
            },
            component:()=> import('@/pages/demo/DemoFirst.vue'),
        }
    ]
};

export default demo;