const demo = {
    path:'examples',
    name:'examples',
    meta:{
        title:'示例'
    },
    redirect: {
        name: 'tis-components'
    },
    component:()=> import('@/components/common/router_view/RouterView.vue'),
    children:[        
        {
            path:'tis-components',
            name:'tis-components',
            meta:{
                title:'组件调用'
            },
            component:()=> import('@/pages/examples/TisComponents.vue'),
        },
        {
            path:'detail',
            name:'detail',
            meta:{
                title:'详情'
            },
            component:()=> import('@/pages/examples/Detail.vue'),
        },
        {
            path:'button',
            name:'button',
            meta:{
                title:'按钮'
            },
            component:()=> import('@/pages/examples/Button.vue'),
        },
        {
            path:'link',
            name:'link',
            meta:{
                title:'超链接'
            },
            component:()=> import('@/pages/examples/Link.vue'),
        },
        {
            path:'message',
            name:'message',
            meta:{
                title:'消息提示'
            },
            component:()=> import('@/pages/examples/Message.vue'),
        },
        {
            path:'tabs',
            name:'tabs',
            meta:{
                title:'标签页'
            },
            component:()=> import('@/pages/examples/Tabs.vue'),
        },
        {
            path:'radio',
            name:'radio',
            meta:{
                title:'单选按钮'
            },
            component:()=> import('@/pages/examples/Radio.vue'),
        },
        {
            path:'breadcrumb',
            name:'breadcrumb',
            meta:{
                title:'面包屑'
            },
            component:()=> import('@/pages/examples/Breadcrumb.vue'),
        },
        {
            path:'page',
            name:'page',
            meta:{
                title:'分页'
            },
            component:()=> import('@/pages/examples/Page.vue'),
        },
        {
            path:'input',
            name:'input',
            meta:{
                title:'输入框'
            },
            component:()=> import('@/pages/examples/Input.vue'),
        },
        {
            path:'checkbox',
            name:'checkbox',
            meta:{
                title:'复选框'
            },
            component:()=> import('@/pages/examples/Checkbox.vue'),
        },
        {
            path:'select',
            name:'select',
            meta:{
                title:'下拉框'
            },
            component:()=> import('@/pages/examples/Select.vue'),
        },
        {
            path:'upload',
            name:'upload',
            meta:{
                title:'下拉框'
            },
            component:()=> import('@/pages/examples/Upload.vue'),
        },
        {
            path:'badge',
            name:'badge',
            meta:{
                title:'徽标数'
            },
            component:()=> import('@/pages/examples/Badge.vue'),
        },
        {
            path:'progress',
            name:'progress',
            meta:{
                title:'进度条'
            },
            component:()=> import('@/pages/examples/Progress.vue'),
        },
        {
            path:'modal',
            name:'modal',
            meta:{
                title:'对话框'
            },
            component:()=> import('@/pages/examples/Modal.vue'),
        },
        {
            path:'form',
            name:'form',
            meta:{
                title:'表单'
            },
            component:()=> import('@/pages/examples/Form.vue'),
        },
        {
            path:'table',
            name:'table',
            meta:{
                title:'表格'
            },
            component:()=> import('@/pages/examples/Table.vue'),
        },
        {
            path:'approve',
            name:'approve',
            meta:{
                title:'审批接待'
            },
            component:()=> import('@/pages/examples/Approve.vue'),
            children:[        
                {
                    path:'approve_add',
                    name:'approve_add',
                    meta:{
                        title:'申请接待'
                    },
                    component:()=> import('@/pages/examples/Add.vue'),
                },
            ]
        }
    ]
};

export default demo;