/*  
    name:头部菜单展示的名字
    powerSatus:  头部菜单的权限控制对应的权限码
    url: 外链页面的地址
    isVue: 是本项目的单页面应用

*/
import config from "@/config.js";
const menuArray = [
    {
        name:"首页",
        powerSatus:"",
        url:config.mmsHost,
    },
    {
        name:"土地",
        powerSatus:"TUDI",
        url:config.mmsHost + '/item/tudiList.html',
    },
    {
        name:"厂房",
        powerSatus:"CHANGFANG",
        url:config.mmsHost + '/item/changfangList.html',
    },
    {
        name:"仓库",
        powerSatus:"DEPOT",
        url:config.mmsHost + '/item/depotList.html',
    },
    {
        name:"写字楼",
        powerSatus:"OFFICE",
        url:config.mmsHost + '/item/officeList.html',
    },
    {
        name:"注册",
        powerSatus:"REG",
        url:config.mmsHost + '/item/regList.html',
    },
    {
        name:"商业",
        powerSatus:"BRAND",
        url:config.mmsHost + '/Brand/mallList/company_left/all.html',
    },
    {
        name:"其他",
        powerSatus:"OTHER",
        url:config.mmsHost + '/item/otherList.html',
    },
    {
        name:"企服",
        powerSatus:"SERVICE",
        url:config.mmsHost + '/item/enterpriseServiceList.html',
    },
    {
        name:"情报",
        powerSatus:"INTELLIGENCE",
        url:config.mmsHost + '/Intelligence/intelligenceList.html',
    },

    {
        name:"名片库",
        powerSatus:"BUSINESSCARD",
        url:config.mmsHost + '/BusinessCard/businessCardList.html',
    },
    {
        name:"单位",
        powerSatus:"COMPANIES",
        url:config.mmsHost + '/Companies/index.html',
    },
    {
        name:"客户",
        powerSatus:"PARTNERS",
        url:config.mmsHost + '/Companies/companyList/company_left/ispartners.html',
    },
    {
        name:"用户",
        powerSatus:"USERS",
        url:config.mmsHost + '/Users/index.html',
    },

    {
        name:"办公",
        powerSatus:"OA",
        url:config.mmsHost + '/Office/index.html',
    },
    {
        name:"任务",
        powerSatus:"MISSION",
        url:config.mmsHost + '/Mission/missionList.html',
    },
    {
        name:"数据",
        powerSatus:"PERFORMANCE",
        url:config.biUrl,
    },
    {
        name:"财务",
        powerSatus:"ERP",
        url:config.financeUrl,
    },
    {
        name:"人才",
        powerSatus:"HR",
        url:config.mmsHost + '/HR/index',
    },
    {
        name:"物资",
        powerSatus:"AMS",
        url: config.materialUrl,
    },
    {
        name:"产业",
        powerSatus:"INDUSTRY",
        url:config.mmsHost + '/Spa/industry',
    },

    {
        name:"培训",
        powerSatus:"TMS",
        url:config.trainUrl,
    },
    {
        name:"客服",
        powerSatus:"CSMS",
        url:config.csmsUrl,
    },
    {
        name:"MOT",
        powerSatus:"DEAL",
        url:config.mmsHost + '/Spa/deal',
    },
    {
        name:"流程",
        powerSatus:"MMSPROCESS",
        url:config.progressUrl,
    },
    {
        name:"工作流",
        powerSatus:"PROCESS",
        url:config.workflowUrl,
    },
    {
        name:"阿米巴",
        powerSatus:"OMS",
        url:config.amoebaUrl,
    },
    {
        name:"示例页面",
        powerSatus:"demo",
        isVue : true,
        routerName:"demo",
        modular: [
            {
                title:'示例页面1',
                menuList:[
                    {
                        iconAwesome: "fa fa-table",
                        name: "first_demo",
                        title: "示例页面11",
                        powerSatus:"",
                        openName:'first_demo',
                        children: [
                            {
                                iconAwesome: "fa fa-globe",
                                name:'first_demo_one',
                                openName:'first_demo_one',
                                powerSatus:"",
                                title: "示例页面111",
                            },
                        ]
                    },
                    {
                        iconAwesome: "fa fa-table",
                        name: "second_demo",
                        title: "示例页面2",
                        powerSatus:"",
                        openName:'second_demo',
                    }
                ]
            }
        ]
    },
]

export default menuArray
