<template>
    <div>
        <h1>tis设计规范的Table组件底层属性调用示例</h1>
        <div>第三方士大夫
            <Icon type="md-checkmark" />但是范德萨
            <Icon type="md-camera" />的发送到发大水
        </div>
        <br/>
        <br/>
        <Table :columns="columns1" :data="data1"></Table>
        <br/>
        <br/>
        <Table stripe :columns="columns1" :data="data1"></Table>        
        <br/>
        <br/>
        <Modal
            v-model="modal"
            title="Common Modal dialog box title">
            <Table stripe :columns="columns1" :data="data1"></Table>    
        </Modal>
    </div>
</template>
<script>
    export default {
        name:'ivu-table',
        components: {
            
        },
        data () {
            return {                
                modal:false,
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },
        watch: {
            
        },
        mounted() {     
                 
        },
        methods:{
            
        }
    }
</script>

<style lang="less" scoped>

</style>