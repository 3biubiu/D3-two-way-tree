//这个混入是为了解决联系人列表页的复用问题[正常情况应该是组件复用而不是写混入]
import $api from "@/api/index.js"
import Cookie from "js-cookie";

export default {
    data(){
        return{
            listData:[],//列表数据
            listCount:0,//列表总数
            buttonLoading:false,//搜索按钮的loading状态
            //顶部搜索条件
            searchData: {
                // uid:Cookie.get('uid'),
                uid:'702144',//这里为了避免权限控制显示列表数据暂时先使用固定的uid
                page: 1, //页码
                pageSize: 10,//单页条数
                dateSettlingCreate: [],
                dateSettlingPush: [],
                nameId: "",//联系人姓名或id
                job: "", //职务
                business: "", //所属企业/单位
                linkType: "1",  //联系方式类型 1=手机 2=座机 3=微信 4=邮箱
                linkContent: "",//联系方式nr
                itemLevel: "",  //项目等级
                itemQuality: "", //项目质量
                ourId: "", //我方关系建立人
                ourType: "",//	我方关系程度
                insideId: "", //内部关系人
                insideType: "", //内部关系程度
                roleType: "", //联系人角色类型
                roleId: "",  //联系人角色
                createTimeStart: "",//录入开始时间
                createTimeEnd: "",//录入结束时间
                updateTimeStart: "",//更新开始时间
                updateTimeEnd: "",//更新结束时间
                inputDepart: "",   //	录入部门
                inputUserId: null,   //录入人
                isRelationItem: "",   //是否关联项目
                itemCate: "", //	关联项目类型
                isRelationCompany: "",//是否关联单位
                companyCate: "",   //关联单位类型
                tagType: "", //联系人标签类型
                tagId: "",  //联系人标签
                motType: "",    //项目MOT类型
                motId: "",//项目mot
                order:"",
                motSortId:["","",""],
            },
            SpinStatus:true,//列表加载状态
            // 名片数量上线
            limitNumber: 0,
            // 拥有的项目总数 不受搜索项影响
            ownNumber: 0,
            // 成交项目
            dealNumber: 0,
        }
    },
    created() {
    },
    mounted(){
    },
    computed:{
        approve(){
            return Number(this.limitNumber)-Number(this.listCount)
        }
    },
    methods : {
        /**
         * 请求列表数据
         */
         async getList(data){
            this.SpinStatus = true;
            let res = await $api.getCardListData(data,this.pageType);
            if(res.code=='200'){
                // if(res.data.length!=0){
                //     this.listData = JSON.parse(JSON.stringify(res.data.list));
                // }
                this.listData = res.data.list;
                this.listCount = Number(res.data.count);
            }
            this.isShowDefaultTips = this.listCount==0?true:false;
            this.buttonLoading = false;
            this.SpinStatus = false;
        },
        /**
         * 点击搜索按钮
         * @param {*} data 
         */
        selectSearch(data){
            this.searchData = Object.assign(this.searchData,data);
            this.searchData.page = 1;
            //排序改为默认排序
            this.searchData.order = '';
            this.$refs.tableDeal.searchData.order = '';
            this.jumpRoute();
            this.buttonLoading = true;
        },
        /**
         * 将搜索项拼到路由上
         * @param data 搜索的数据
         */
        jumpRoute(){
            let searchOpt = this.searchData;
            this.$router.push({
                query : searchOpt,
            });
            //等待路由的push完成后再初始化搜索项
            setTimeout(()=>{this.init();})
        },
        /**
         * 初始化搜索项并根据路由拉取数据
         */
        init(){
            let query = this.$route.query;
            let search = Object.keys(query).length === 0 ? {page:this.searchData.page,pageSize:this.searchData.pageSize} : query;
            this.searchData = Object.assign(this.searchData,search);
            //根据搜索项请求列表数据
            this.getList(this.searchData);
            this.$nextTick(()=>{
                this.$refs.searchDeal.setSearchOptions(this.searchData);
                this.$refs.tableDeal.selectIds = [];
                this.$refs.tableDeal.allChecked = false;
                this.$refs.tableDeal.setPageOptions(this.searchData.page, this.searchData.pageSize);
            })
            // 拉取最新数量数据
            this.getStatisticsNumber()
        },
        /**
         * 获取还可申请人数、已成交的联系人数
         */
        async getStatisticsNumber(){
            let res = await $api.getStatisticsNumber();
            if(res.code == 200){
                this.ownNumber = res.data.ownNumber;
                this.dealNumber = res.data.dealContactsNumber;
                this.limitNumber = res.data.itemCardLimit;
            }
        },
        /**
         * 分页器触发事件
         * @param {Object} pageData 分页器回调参数
         */
        handlePage(pageData){
            this.searchData.page = pageData.page;
            this.searchData.pageSize = pageData.pageSize;
            this.jumpRoute();
        },
        /**
         * 排序
         * @param {string} order 和接口对应的值
         */
        handleOrder(order){
            this.searchData.order = order;
            this.jumpRoute();
        },
        //通过是否显示重置按钮来控制列表文案显示
        isShowReset(isShow){
            this.isShowDefaultTips = isShow;
        },
        /**
         * 手动设置页码数
         * @param {Object} 当前页码和最大显示条数
         */
            setPageOptions(pageData){
            this.searchData.page = pageData.page;
            this.searchData.pageSize = pageData.pageSize;
        }

    }

}
