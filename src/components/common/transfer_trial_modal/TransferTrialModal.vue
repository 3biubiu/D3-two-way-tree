
<template>
    <Modal :title="title" id="gali" class="select-2level-model" v-model="modal9" :loading="loadinga" class-name="vertical-center-modal" @on-ok="click_confirm_btn">
        <Row>
            <Col span="20">
                <AutoComplete
                    v-model="private.keyword"
                    @on-search="search_like"
                    :placeholder="'请输入'+search_name"
                    style="width:200px">
                    <Option v-for="(item,index) in private.search_result_list" :value="item.name" :key="index">{{ item.name }}</Option>
                </AutoComplete>
            </Col>
            <Col span="4">
                <Button type="success" @click="header_search_btn()">搜索</Button >
            </Col>
        </Row>
        <div id="content-all" style="max-height:400px; overflow:auto">
            <Row v-for="one_group in type_list" :key="one_group.id" style="margin-top:10px">
                <Checkbox v-model="one_group.checked_all" @on-change="click_check_all(one_group)" :disabled="!one_group.second_level.length || private.only_one_checked">{{one_group.name}}</Checkbox>
                <div style="clear:both"></div>
                <ul class="second-level-list">
                    <li v-for="one_user in one_group.second_level" class="check-able">
                        <span class="" v-on:click="click_type(one_user, one_group)" v-bind:class="{'active': one_user.checked, 'tip-class': one_user.tip}" :id="one_user.uid">{{one_user.username}}</span>
                    </li>
                </ul>
            </Row>
        </div>
    </Modal>
</template>
<script type="text/javascript">
export default {
    name : 'selectUserModel',
    props : ['loadData','loading'],
    data () {
        return {
            title: '默认标题' ,
            confirm_btn: '确定' ,
            search_name: '产业分类' ,
            confirm_callback : function(){},
            callback_data: {},
            private : {
                keyword: '' ,
                is_dropdonw_show: false ,
                slimScrollObj : {},
                add_string: '' ,
                dom_id_prefix: 'select-model' ,
                search_result_list: [],
                id_rand: '' , 
                only_one_checked: false 
            },
            type_list: [] ,
            type_name: '',
            modal9: false,
            loadinga:true
        };
    },
    methods: {
        /*
        * 初始化数据
        */
        init(data, typeName){
            //初始化标题
            this.title = data.title;
            let currentData = data.type_list;
            for(let i=0,oneGroup; oneGroup = currentData[i++];){
                let checkedCount = 0 ;
                for(let j=0,oneUser; oneUser = oneGroup.second_level[j++];){
                    if(oneUser.checked){
                        this.$set(oneUser, 'checked', true);
                        checkedCount ++ ;
                    }else{
                        this.$set(oneUser, 'checked', false);
                    }
                }
                if(checkedCount >= oneGroup.second_level.length){
                    this.$set(oneGroup, 'checked_all', true);
                }else{
                    this.$set(oneGroup, 'checked_all', false);
                }
            }
            this.type_list = currentData;
            //初始化检索内容的名称
            this.search_name = data.search_name;
            //初始化一个名字
            this.type_name = typeName;
            //判断是否设定了需要只选择一个选项
            if(data.hasOwnProperty('only_one_checked')){
                this.private.only_one_checked = data.only_one_checked ;
            }else{
                this.private.only_one_checked = false ;
            }
        },
        show(checked){
            if(checked && $.isArray(checked)){
                this._update_checked_data(checked);
            }
            this.modal9 = true;
        } ,
        _update_checked_data(checked){
            if(checked){
                let type_list = this.type_list ;
                for(let i=0,oneGroup ; oneGroup=type_list[i++];){
                    let isAllChecked = true ;
                    for(let j=0,oneUser ; oneUser=oneGroup.second_level[j++];){
                        if($.inArray(oneUser.uid, checked) == -1){
                            oneUser.checked = false;
                            isAllChecked = false ;
                        }else{
                            oneUser.checked = true ;
                        }
                    }
                    oneGroup.checked_all = isAllChecked ;
                }
            }
        } ,
        /*
        * 选中转审人
        * 
        *@param {}
        */
        click_type(oneData, oneGroup){
            if(this.private.only_one_checked){
                let ischecked = oneData.checked ;
                for(let i=0, t; t=this.type_list[i++];){
                    for(let j=0, t2; t2=t.second_level[j++];){
                        t2.checked = false ;
                    }
                    t.checked_all = false ;
                }
                oneData.checked = (!ischecked) ;
            }else{
                //先修改自己被点击的状态
                oneData.checked = (!oneData.checked) ;
                //然后检查自己的兄弟知否都被选中了
                let isAllchecked = true ;
                for(let i=0,t ; t=oneGroup.second_level[i++];){
                    if(t.checked == false){
                        isAllchecked = false ;
                        break;
                    }
                }
                oneGroup.checked_all = isAllchecked ;
            }
        },
        _foreach(typeList, callBack){
            typeList = typeList.filter(function(item){
                item['second_level'] = JSON.parse(JSON.stringify(item['second_level'].filter(callBack)));
                return item;
            });
            return typeList ;
        } ,
        search_like(value){
            this.type_list = this._foreach(this.type_list, function(data){
                data['tip'] = false;
                return data;
            });
            let keyword = this.private.keyword;
            this.private.search_result_list = [] ;
            const resultList = this.private.search_result_list ;
            if(keyword){
                this.type_list = this._foreach(this.type_list, function(data){
                    if(data.username.match(keyword)){
                        data['tip'] = true;
                        resultList.push({
                            name : data.username,
                            target: data ,
                            uid: data.uid
                        });
                    }
                    return data;
                });
            }
        },
        click_search_list(data_id){
            //1. 把滚动条滚过去
            let span = document.getElementById(data_id);
            let height = span.offsetTop + span.parentNode.parentNode.parentNode.offsetTop;
            this.$nextTick(function(){
                let p = document.getElementById('content-all');
                p.scrollTop = height - 120;
            });
            this.private.is_dropdonw_show = false;
        } ,
        add_type(){
            let typeName = this.private.add_string;
            let url = this.add_type_url ;
            let vueThis = this;
            if(typeName){
                $.ajax({
                    url: url ,
                    type: 'POST' ,
                    data: {
                        'name' : typeName
                    } ,
                    success: function(data){
                        if(data.status){
                            vueThis._addData2typeList(typeName, data.id);
                            vueThis.private.add_string = '' ;
                        }
                    },
                    error: function(xhr){
                        
                    }
                });
            }
        },
        _addData2typeList(name, id){
            let addData = {
                id: id ,
                name: name ,
                checked: false,
                tip: false
            };
            this.type_list.unshift(addData);
        } ,
        click_confirm_btn(){
            //点击确定后的处理操作交给父组件完成
            let checkeds = [];
            for (let i = 0, oneGroup; oneGroup = this.type_list[i++];) {
                for (let j = 0, oneUser; oneUser = oneGroup.second_level[j++];) {
                    if (oneUser['checked']) {
                        checkeds.push({
                            uid : oneUser.uid,
                            username : oneUser.username
                        });
                    }
                }
            }
            this.$parent.confirm(checkeds);
            if(!checkeds.length>0){
                this.loadinga = false
                this.$nextTick(()=>{
                    this.loadinga = true;
                })
            }else{
                this.loadinga = true;                
            }
        },
        //点击搜索按钮
        header_search_btn(){
            //1. 找到第一个被检索到的数据  
            let isForeachEnd = false ; 
            let first_id = 0 ;
            for(let i=0,t ; (t = this.type_list[i++]) && ! isForeachEnd ;){
                for(let j=0,t2; t2 = t.second_level[j++];){
                    if(t2.tip){
                        isForeachEnd = true ;
                        first_id = t2.uid ;
                        break;
                    }
                }
            }
            if(first_id && first_id > 0){
                this.click_search_list(first_id);
            }
        },
        click_check_all(allGroup){
            for(let i=0,t; t = allGroup.second_level[i++];){
                t.checked = allGroup.checked_all ;
            }
        } 
    }

};
</script>
<style lang="less" scoped>
    @import "./transfer_trial_modal.less";
</style>
