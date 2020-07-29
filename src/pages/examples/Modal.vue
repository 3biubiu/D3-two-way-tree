<template>
    <div>
        <h1>tis设计规范的modal组件底层属性调用示例</h1>
        <Modal
            v-model="modal"
            title="Common Modal dialog box title"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
        <Button @click="confirm">Normal</Button>
    </div>
</template>
<script>
    export default {
        name:'ivu-modal',
        components: {
            
        },
        data () {
            return {
                modal:true
            }
        },
        watch: {
            
        },
        mounted() {   
                 
        },
        methods: {confirm () {
                this.$Modal.confirm({
                    title: 'tis设计规范的modal组件底层属性调用示例',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }  
        }
    }
</script>

<style lang="less" scoped>

</style>