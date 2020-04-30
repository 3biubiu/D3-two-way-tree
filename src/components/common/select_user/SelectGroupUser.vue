<template>
    <div>
        <Row :gutter="8">
            <Col :span="12">
                <Select placeholder="所属部门" v-model="formData.group" @on-change="changeGroup" clearable>
                    <Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </Col>
            <Col :span="12">
                <select-user
                    data-source-url="/search-users"
                    :default-select="defaultSelect"
                    :list-data="users"
                    :select-id="formData.user"
                    @selected="getUser"
                    ref="select"
                ></select-user>
            </Col>
        </Row>
    </div>
</template>
<script>
import SelectUser from "./SelectUser"
import $api from '@/api'
export default {
    name: 'select-group-user',
    components: {
        SelectUser
    },
    props: {
        defaultSelect: {
            type: Object,
            default: () => {
                return {id: '', name: '选择用户'}
            }
        },
        userData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        groupUsers:{
            type: Object,
            default: () => {
                return {group: '', user: ''}
            }
        }
    },
    data() {
        return {
            formData: {
                group: '',
                user: ''
            },
            groupList: [],
            users: [],
            userList: {},
            listData: {},
            temp: [],
        }
    },
    methods: {
        /**
         * 选择用户回调
         * @author liuhuanyu & 2019-11-9 15:10:25
         */
        getUser(data) {
            this.$set(this.formData, 'user', data.id);
            this.$set(this.formData, 'group', data.group_id);
            this.$emit('selected', this.formData)
        },
        /**
         * 改变部门，重置用户列表
         * @author liuhuanyu & 2019-11-9 15:10:25
         */
        changeGroup() {
            this.$set(this.formData, 'user', '');
            this.users = JSON.parse(JSON.stringify(this.temp));
            this.$refs.select.setSelect(this.defaultSelect);
            this.$emit('selected', this.formData)
        },
        /**
         * 初始化部门数据（部门下拉选数据）
         * @author liuhuanyu & 2019-11-9 15:10:25
         */
        async getGroupUserData() {
            let response = await $api.getSearchGroup();
            this.groupList = response.group;
            // this.listData = response.data;
        },
        /**
         * 初始化用户数据（用户下拉选数据）
         * @author liuhuanyu & 2019-11-9 15:10:25
         */
        async initUserData() {
            let response = await $api.getSearchUser();
            this.temp = response.data;
            this.users = response.data;
        },
        defaultGroup(){
            this.formData.group = '';
            this.formData.user = '';
        }
    },
    mounted() {
        this.groupList = this.listData.group;
        this.userList = this.listData.user;
        this.getGroupUserData();
        this.initUserData();
        if(this.groupUsers){
            this.formData = this.groupUsers;
        }
    }
}
</script>
