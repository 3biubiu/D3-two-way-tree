<template>
    <div>
        <Modal :title="title" ref="groupUserModal" v-model="modalStatus" :width="643" class="select-group-users-modal">
            <div class="add_more_users_or_groups excute-box">
                <div class="push-header" style="width: 100%">
                    <div class="form-group form-inline" style="width:50%;">
                        <a href="javascript:void(0)" class="push-tag" v-for="(obj,index) in allData" :key="index" :class="{'active':tag == index}" @click="changetag(index)">{{obj.name}}</a>
                    </div>
                    <div class="push-box-name"><span>{{ allData[tag].rightTitle ? allData[tag].rightTitle : "已选"+allData[tag].name }}</span></div>
                </div>
                <div class="push-body">
                    <div class="push-box">
                        <!-- <div v-if="allData[tag].select.length">
                            <Select v-model="group_id" :placeholder="allData[tag].title">
                                <Option value="">{{allData[tag].title}}</Option>
                                <Option v-for="option in allData[tag].select" :key="option.id" :value="option.id">{{option.name}}</Option>
                            </Select>
                        </div> -->
                        <!-- <Input type="text" class="form-control" :placeholder="allData[tag].inputName?allData[tag].inputName:(allData[tag].name+'名称')" v-model="keyword" v-show="tag != 'custom'" /> -->
                        <!-- <div class="push-data-box add-excute-box pull-left js-p-box js-left-box" :class="hightClass" v-show="tag != 'custom' ">
                            <p v-for="(item,index) in tagData" :key="index"
                               v-if="keyword == '' || item.name.indexOf(keyword) != -1"
                               @mousedown="changeChoose(leftClickData,index)"
                               @mouseover="mouseoverChoose(leftClickData,index)"
                               @mouseup="mouseupMethod()"
                               @dblclick="addPerson(leftClickData, index)"
                               :class="{'active' : leftClickData.indexOf(index) > -1}">{{ item.name }}</p>
                        </div> -->
                        <textarea v-show="tag == 'custom'" class="push-data-box" @input="searchCustom()" v-model="custom" :placeholder="allData[tag].inputName"></textarea>
                    </div>
                    <!-- <div class="push-body-center-button pull-left">
                        <Button type="primary" class="btn-info push-box-btn-add js-btn-move" @click="addChooseData()">添加&nbsp;<i class="fa fa-arrow-right"></i></Button>
                        <Button type="primary" class="btn-info push-box-btn-add js-btn-move" @click="addAllChooseData()">全部添加&nbsp;<i class="fa fa-arrow-right"></i></Button>
                        <Button type="primary" class="btn-info push-box-btn-remove js-btn-move" @click="removeChooseData()">删除&nbsp;<i class="fa fa-arrow-left"></i></Button>
                        <Button type="primary" class="btn-info push-box-btn-remove js-btn-move" @click="removeAllChooseData()">全部删除&nbsp;<i class="fa fa-arrow-left"></i></Button>
                    </div> -->
                    <div class="push-box">
                        <div class="push-data-box add-excute-box pull-right js-p-box js-right-box">
                            <p v-for="(item,index) in chooseData" :key="index"
                               @mousedown="changeChoose(rightClickData,index)"
                               @mouseover="mouseoverChoose(rightClickData,index)"
                               @mouseup="mouseupMethod()"
                               @dblclick="removePerson(index)"
                               :class="{'active' : rightClickData.indexOf(index) > -1}">{{ item.allName?item.allName:item.name }}</p>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div style="margin-top: 20px" >
                        <user-transfer-basic  v-show="tag != 'custom'" ref="userTransferBasic" :default-right-list="defaultRightList" :transfer-list="transferList" :loading="transferLoading" @onchange="changeSelect"></user-transfer-basic>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="default" class="btn-default add-excute-btn-confirm" @click="hide()">取消</Button>
                <Button type="primary" class="btn-primary add-excute-btn-confirm" @click="clickCallBackFun()" :loading="buttonLoading">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import UserTransferBasic from "../user_transfer/UserTranfer";
    export default {
        name: 'select-group-users-modal',
        components:{
            UserTransferBasic
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            autoClose:{
                type:Boolean,
                default:true
            },
            buttonLoading:{
                type:Boolean,
                default:false
            },
            defaultRightList:{
                type:Array,
                default:()=>{return []}
            }
        },
        data() {
            return {
                leftClickData: [],
                rightClickData: [],
                leftCheckedIds: [],
                rightCheckedIds: [],
                mouseoverData:[],
                mouseoverStart:-1,
                tag:'',
                tagData: [],
                group_id: '',
                hightClass: '',
                keyword: '',
                oldCustom: '',
                custom: '',
                chooseData: [],
                allData: [],
                modalStatus: false,
                params: {
                    allData: {
                        groups : {
                            name:'部门',
                            arr: [],
                            select: [],
                            initData: [],
                            tagName:'groups',
                        },
                        user : {
                            name:'人员',
                            title: '',
                            arr: [],
                            select: [],
                            initData: [],
                            tag : true,
                            tagName:'user',
                        },
                        group_manager:{
                            name:'群组',
                            title:'',
                            arr:[],
                            select: [],
                            initData:[],
                            inputName:'',
                            rightTitle:'',
                        },
                        custom:{
                            name:'自定义输入',
                            arr: [],
                            inputName:'',
                            rightTitle:'',
                            select: []
                        }
                    },
                    usersCombineGroups: false
                },
                //存储部门-人关系
                groupUsersData : [],
                //部门备选项
                groupList : [
                    {"name" : "全部联系人" , "value" : "all"},
                ],
                //选中的部门选项
                groupSelect : "",
                //选中的单位选项
                companySelect : "",
                //搜索项的输入
                keyword : "",

                //穿梭框loading状态
                transferLoading : false,
                //穿梭框备选项
                transferList : [],
                //穿梭框选中项
                transferData : [],
            }
        },
        methods: {
             //穿梭框变化时
            changeSelect(data){
                // let res = [];
                // for(let i = 0 ; i < data.length ; i ++ ){
                //     res.push(data[i].uid);
                // }
                // res = [...new Set(res)];
                // this.transferData = res;
                this.transferData = data;
            },
            show(data) {
                if(data) {
                    this.params.allData.user.initData = data.users;
                    this.params.allData.groups.initData = data.groups;
                    this.initData(this.params);
                }
                this.keyword = '';
                this.modalStatus = true;
            },
            hide() {
                this.modalStatus = false;
            },
            addChooseData:function(){
                for (var i in this.leftClickData){
                    var data = this.tagData[this.leftClickData[i]];
                    if (this.tag == 'group_manager') {
                        data.tag = 'user';
                    } else {
                        data.tag = this.tag;
                    }
                    if(this.keyword == '' || data.name.indexOf(this.keyword) != -1){
                        var add = true;
                        for (var j in this.chooseData){
                            if(data.id == this.chooseData[j].id && data.tag == this.chooseData[j].tag){
                                add = false;
                                break;
                            }
                        }
                        if(add){
                            this.chooseData.push(data);
                        }
                    }
                }
                this.leftClickData = [];
            },
            removeChooseData:function(){
                var keys = this.rightClickData.sort().reverse();
                for (var i in this.rightClickData){
                    this.chooseData.splice(this.rightClickData[i], 1);
                }
                this.rightClickData = [];
            },
            addAllChooseData:function(){
                this.leftClickData = [];
                for (var i in this.tagData){
                    if(this.keyword == '' || this.tagData[i].name.indexOf(this.keyword) != -1){
                        this.leftClickData.push(i);
                    }
                }
                this.addChooseData();
            },
            removeAllChooseData:function(){
                this.chooseData = [];
                this.rightClickData = [];
            },
            clickCallBackFun(){
                this.clickCallBack();
                if(this.autoClose){
                    this.hide();
                }
            },
            changetag:function(tag){
                if(this.tag!=tag){
                    this.keyword = '';
                }
                this.tag = tag;
                this.tagData = this.allData[tag].arr;
                this.leftClickData = [];
                this.rightClickData = [];
                this.group_id='';
                switch (tag) {
                    case 'groups' :
                        this.hightClass = 'height300';
                        break;
                    case 'custom' :
                        this.hightClass = '';
                        break;
                    default:
                        this.hightClass = 'height266';
                }
            },
            changeChoose:function(data,key){
                this.mouseoverStart = key;
                var index = data.indexOf(key);
                if(index > -1){
                    this.removeChoose(data,key);
                }else{
                    this.addChoose(data,key);
                }
            },
            addChoose:function(data,key){
                var index = data.indexOf(key);
                if(index == -1){
                    data.push(key);
                }
            },
            mouseoverChoose:function(data,key){
                if(this.mouseoverStart != -1){
                    var nowData = []
                    var mouseoverData = this.mouseoverData;
                    if(this.mouseoverStart < key){
                        for(var i = this.mouseoverStart + 1;i <= key;i++){
                            nowData.push(i);
                        }
                    }else if(this.mouseoverStart > key){
                        for(var i = key;i <= this.mouseoverStart - 1;i++){
                            nowData.push(i);
                        }
                    }
                    if(nowData.length > mouseoverData.length){
                        var addData = nowData.filter(function(i){return mouseoverData.indexOf(i) < 0;});
                        for (var i in addData) {
                            this.addChoose(data,addData[i]);
                        }
                    }else if(nowData.length < mouseoverData.length){
                        var delData = mouseoverData.filter(function(i){return nowData.indexOf(i) < 0;});
                        for (var i in delData) {
                            this.removeChoose(data,delData[i]);
                        }
                    }
                    this.mouseoverData = [];
                    this.mouseoverData = nowData;
                }
            },
            mouseupMethod:function(){
                this.mouseoverStart = -1;
                this.mouseoverData = [];
            },
            addPerson: function(data , key){
                this.addChoose(data , key);
                this.addChooseData();
            },
            removePerson: function(key){
                this.chooseData.splice(key , 1);
            },
            removeChoose:function(data,key){
                var index = data.indexOf(key);
                if(index > -1){
                    data.splice(index, 1);
                }
            },
            searchCustom:function(){
                if(this.oldCustom != this.custom){
                    var arr = this.custom.split('\n');
                    var newCustom = [];
                    for (var k in arr) {
                        var add = true;
                        for (var i in this.allData.custom.arr) {
                            if(this.allData.custom.arr[i].name == arr[k]){
                                this.allData.custom.arr[i].tag = 'user';
                                this.removeAndAddData([this.allData.custom.arr[i]],[],false);
                                add = false;
                            }
                        }
                        if(add){
                            newCustom.push(arr[k]);
                        }
                    }
                    if(arr.length != newCustom.length){
                        this.custom = newCustom.join('\n');
                    }
                    this.oldCustom = newCustom.join('\n');
                }
            },

            removeAndAddData:function(add,remove,runCallBack){
                var runCallBack = runCallBack == false? runCallBack : true;
                for (var j in remove){
                    var data = remove[j];
                    for (var k in this.chooseData) {
                        if (this.chooseData[k].id == data.id) {
                            this.chooseData.$remove(this.chooseData[k]);
                        }

                    }
                }
                for (var i in add){
                    var data = add[i];
                    var add = true;
                    for (var j in this.chooseData){
                        if(data.id == this.chooseData[j].id){
                            add = false;
                            break;
                        }
                    }
                    if(add){
                        this.chooseData.push(data);
                    }
                }
                if(runCallBack){
                    this.clickCallBack();
                }
            },
            fuzhifunc:function(id){
                if(id){
                    var needsUsers = [];
                    needsUsers = this.getAllGropsMembersId(id,this.tag);
                    this.tagData = needsUsers;
                }else{
                    this.tagData = this.allData[this.tag].arr;
                }
            },
            getAllGropsMembersId : function(id, tag, select) {
                var needsUsers = [];
                var self = this;
                var select = select ? 'arr': 'select';
                var getChildUsers = function(fid){
                    for (var i in self.allData[tag][select]) {
                        if( self.allData[tag][select][i].fid == fid){
                            for( var x in self.allData[tag][select][i]['members']){
                                self.allData[tag][select][i]['members'][x]['tag'] = 'user';
                                needsUsers.push(self.allData[tag][select][i]['members'][x]);
                            }
                            getChildUsers(self.allData[tag][select][i].id);
                        }
                    }
                };
                for (var i in self.allData[tag][select]) {
                    if( self.allData[tag][select][i].id == id){
                        for( var x in self.allData[tag][select][i]['members']){
                            self.allData[tag][select][i]['members'][x]['tag'] = 'user';
                            needsUsers.push(self.allData[tag][select][i]['members'][x]);
                        }
                    }
                };
                getChildUsers(id);
                return needsUsers;
            },
            initData:function(data){
                if(data){
                    var returnData = [];
                    this.chooseData = [];
                    if(data.modal_title){
                        this.modal_title = data.modal_title;
                    }
                    if(data.hasOwnProperty('doCall')){
                        this.doCall = data.doCall;
                    }
                    if(data .hasOwnProperty('usersCombineGroups')){
                        this.usersCombineGroups = data.usersCombineGroups;
                    }
                    var users = [];
                    var groups = [];
                    this.allData = JSON.parse(JSON.stringify(data.allData));
                    for (var i in this.allData) {
                        if(this.tag == ''){
                            this.tag = i;
                        }
                        if(('tag' in this.allData[i])){
                            this.tag = i;
                        }
                        if(!this.allData[i].tagName){
                            this.allData[i].tagName = this.getTagName(i);
                        }
                        if(this.allData[i].tagName){
                            switch (this.allData[i].tagName) {
                                case 'user':
                                    if(this.allData[i].initData){
                                        for (const key in this.allData[i].initData) {
                                            users.push(this.allData[i].initData[key]);
                                        }
                                    }
                                    break;
                                case 'groups':
                                    if(this.allData[i].initData){
                                        for (const key in this.allData[i].initData) {

                                            if(this.usersCombineGroups){
                                                var groupsMembersId = this.getAllGropsMembersId(this.allData[i].initData[key],i,true);
                                                for (var g in groupsMembersId) {
                                                    if(users.indexOf(groupsMembersId[g]['id']) == -1){
                                                        users.push(groupsMembersId[g]['id']);
                                                    }
                                                }
                                            }else{
                                                groups.push(this.allData[i].initData[key]);
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    this.changetag(this.tag);
                    if(users || groups){
                        var select = data.allData.groups?data.allData.groups.arr:data.allData.user.select;

                        this.chooseData = this.dataProcessing(select, users,groups);
                    }
                    if(this.doCall === true){
                        this.clickCallBack();
                    }
                }
            },

            clickCallBack() {
                let returnData = [];
                let data = {users: [], groups: []};
                for(let value of this.chooseData) {
                    if(value.tag == 'user') {
                        data.users.push({id: value.id, name: value.name});
                    }
                    if(value.tag == 'groups') {
                        data.groups.push({id: value.id, name: value.allName});
                    }
                }
                returnData['data'] = data;
                var getAllChooseId = this.getAllChooseId(this.chooseData, true);
                returnData['ids'] = getAllChooseId['id'];
                returnData['peoples'] = getAllChooseId['people'];
                this.$emit('select-group-user', returnData)
            },
            getAllChooseId(chooseData, type) {
                this.allId = [];
                var allPeople = [];
                var allIds = [];
                for (var j in chooseData){
                    if (chooseData[j].tag == 'groups') {
                        let groupsMembersId = this.getAllGropsMembersId(parseInt(chooseData[j].id),chooseData[j].tag,type);
                        for (var g in groupsMembersId) {
                            this.allId.push(groupsMembersId[g]);
                        }
                    } else {
                        this.allId.push(chooseData[j]);
                    }
                }
                this.allId.sort();
                for(var i=0;i<this.allId.length;i++) {
                    var items = this.allId[i];
                    var add = true;
                    for (var x in allIds) {
                        if (allIds[x] == items['id']) {
                            add = false;
                        }
                    }
                    if (add) {
                        allIds.push(items['id']);
                        allPeople.push(items);
                    }
                }
                let returnData = [];
                returnData['id'] = allIds;
                returnData['people'] = allPeople;
                return returnData;
            },
            getTagName: function(tag){
                switch (tag) {
                    case 'user':
                    case 'group_manager':
                        return 'user';
                        break;
                    case 'groups':
                        return 'groups';
                        break;
                    default:
                        return null;
                        break;
                }
                return null;
            },
            dataProcessing : function (data, users,groups) {
                var userData = [];
                var groupData = [];

                if(groups.length){
                    for (var i in data) {
                        if(groups.indexOf(data[i].id) != -1 || groups.indexOf(Number(data[i].id)) != -1){
                            data[i]['choose'] = true;
                        }else {
                            data[i]['choose'] = false;
                        }
                    }
                }else {
                    for (var i in data) {
                        data[i]['choose'] = false;
                    }
                }

                for (var i in data) {
                    var hasUser = [];
                    for (var k in data[i]['members']) {

                        if (users.indexOf(data[i]['members'][k]['id']) != -1 || users.indexOf(Number(data[i]['members'][k]['id'])) != -1) {
                            hasUser.push({
                                'id' : data[i]['members'][k]['id'],
                                'name' : data[i]['members'][k]['name'],
                                'tag'  : 'user'
                            });
                        }
                    }

                    if(this.usersCombineGroups){
                        if(data[i]['members'] && data[i]['members'].length != 0 && hasUser.length == data[i]['members'].length){
                            data[i]['choose'] = true;
                            hasUser = [];
                        }else{
                            data[i]['choose'] = false;
                        }
                    }
                    if(hasUser.length){
                        userData = userData.concat( hasUser );
                    }
                }

                function checkChooseGroups(index){
                    var fid = data[index].id;
                    var isAll = [];
                    var choose = data[index].choose;

                    var length = 0;
                    if (data[index].members) {
                        length = data[index].members.length;
                    }

                    for (var i in data) {
                        if(data[i].fid == fid){
                            var childData = checkChooseGroups(i);
                            isAll.push(childData);
                        }
                    }

                    if(isAll.length){

                        var chooseMember = 0;

                        var allMember = 0;
                        for (var j in isAll) {

                            if(isAll[j].childChoose){
                                chooseMember += isAll[j].childLength;
                            }

                            allMember += isAll[j].childLength;
                        }

                        length += allMember;
                        if (choose && chooseMember == allMember) {
                            choose = true;
                        }else{
                            choose = false;
                        }

                        if(choose){

                            data[index].choose = true;
                            for (var i in data) {
                                if(data[i].fid == fid){
                                    data[i].choose = false;
                                }
                            }
                        }else{

                            if(data[index].choose){
                                data[index].choose = false;
                                for (var m in data[index].members) {
                                    userData.push({
                                        'id' : data[index].members[m]['id'],
                                        'name' : data[index].members[m]['name'],
                                        'tag'  : 'user'
                                    });
                                }
                            }
                        }
                    }
                    data[index].allMembersLength = length;
                    return {
                        childChoose : choose,
                        childLength : length,
                    };
                }
                if(this.usersCombineGroups){
                    for (var i in data) {
                        if(data[i].fid == '0'){
                            checkChooseGroups(i);
                        }
                    }
                }
                for (var i in data) {
                    if (data[i].choose && (data[i].allMembersLength>0 || this.usersCombineGroups === false)){
                        groupData.push({
                            'id' : data[i].id,
                            'name' : data[i].name,
                            'allName' : data[i].allName,
                            'tag'  : 'groups'
                        });
                    }
                }
                return groupData.concat(userData);
            },
            async getAllGroupUser() {
                let response = await $api.getAllGroupUser();
                this.params.allData.groups.arr = response.groups;
                this.params.allData.user.select = response.groups;
                this.params.allData.user.arr = response.users;
                this.params.allData.group_manager.select = response.managers;
                this.params.allData.custom.arr = response.users;
                this.initData(this.params);
            }
        },
        watch : {
            group_id:function(){
                this.fuzhifunc(this.group_id);
            },
            // params: {
            //     deep:true,
            //     handler(newVal) {
            //         this.params = newVal;
            //         this.initData(this.params);
            //     }
            // }
        },
        created() {
            // this.getAllGroupUser();
            this.initData(this.params);
        }
    }
</script>
<style lang="less" scoped>
    @import "./select_group_users.less";
</style>
<style lang="less">
.push-body {
    .ivu-modal{
        .ivu-modal-content {
            min-height: 410px !important;
        }
    } 
}
    .select-group-users-modal {
        .ivu-btn-primary {
            color: #fff;
            background-color: #1f6cdd;
            border-color: #1f6cdd;
        }
        .ivu-btn-primary:hover {
            background-color: #468eeb;
            border-color: #468eeb;
        }

        .ivu-btn-primary:active {
            background-color: #114eb8;
            border-color: #114eb8;
        }
        .ivu-btn-default {
            color: #666;
            border-color: #d9d9d9;
            background-color: #ffffff;
        }
        .ivu-btn-default:hover {
            border-color: #468eeb;
            color: #468eeb;
        }
        .ivu-btn-default:active {
            border-color: #114eb8;
            color: #114eb8;
        }
    }
</style>
