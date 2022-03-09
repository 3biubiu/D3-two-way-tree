const demo = {
    path:'test',
    name:'test',
    meta:{
        title:'示例'
    },
    redirect: {
        name: 'test_list'
    },
    component:()=> import('@/components/common/router_view/RouterView.vue'),
    children:[
        {
            path:'test_detail',
            name:'test_detail',
            meta:{
                title:'详情',
                openName:'test_detail',
            },
            component:()=> import('@/pages/examples/Detail.vue'),
        },
        {
            path:'test_list',
            name:'test_list',
            meta:{
                title:'审批接待'
            },
            redirect: {
                name: 'approve_my_add'
            },
            component:()=> import('@/pages/examples/Approve.vue'),
            children:[        
                {
                    path:'approve_add',
                    name:'approve_add',
                    meta:{
                        title:'申请接待',
                        openName:'test_list'
                    },
                    component:()=> import('@/pages/examples/Add.vue'),
                },
                {
                    path:'approve_my_add',
                    name:'approve_my_add',
                    meta:{
                        title:'我发起的',
                        openName:'test_list'
                    },
                    component:()=> import('@/pages/examples/list/MyAdd.vue'),
                }
            ]
        }
    ]
};

export default demo;