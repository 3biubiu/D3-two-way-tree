<template>
    <Modal v-model="modalStatus"
           :title="title"
           width="600"
           :transfer="false">
        <p style="display: inline-block;padding-bottom: 10px">文件上传（文件格式为WORD、PPT、XLS、PDF、RAR、ZIP、JPG、GIF、PNG、TXT、CHM）</p>
        <file-upload ref="uploadFile" :upload-url="uploadUrl" :limit-type="['DOC','DOCX','XLS','XLSX','PPT','PPTX','PDF','RAR','ZIP','JPG','GIF','PNG','TXT','CHM']"></file-upload>
        <div slot="footer">
            <Button type="text" @click="modalStatus = false">取消</Button>
            <Button type="primary" @click="saveFile" :loading="btnLoading">确定</Button>
        </div>
    </Modal>

</template>

<script>
    import fileUpload from "./Upload";
    import Config from '@/config.js';
    import $api from "@/api/item/item_detail/item_tab.js";
    import utils from "@/utils";
    export default {
        components : {
            fileUpload,
        },
        props : {
            //上传附件类型1-项目2-载体
            type : {
                type : String,
                default : "",
            },
            //上传分类id
            typeId : {
                type : String,
                default: "",
            },
            //项目|载体id
            id : {
                type : String,
                default : "",
            },
            title : {
                type : String,
                default : "附件上传",
            },
        },
        data (){
            return {
                //上传url
                uploadUrl : Config.uploadUrl,
                //上传成功的图片id
                picIds : [],
                //确定按钮loading状态
                btnLoading : false,
                //模态框显示状态
                modalStatus : false,
            }
        },
        created(){

        },
        methods : {
            /**
             * modal显示
             */
            show(){
                this.modalStatus = true;
                this.$refs.uploadFile.fresh();
            },
            /**
             * 确定按钮保存附件
             * 这里把他改成事件分发进行复用
             */
            saveFile(){
                let fileIds = this.$refs.uploadFile.getFileIds();
                if(!fileIds || fileIds.length <= 0){
                    utils.notice("请上传附件","warning");
                    return false;
                }
                this.btnLoading = true;
                this.$emit("add-file",fileIds);


                //
                // let postData = {
                //     pic_ids : fileIds,
                //     type : this.type,
                //     file_type_id : this.typeId
                // };
                // let _self = this;
                //
                // //axios
                // $api.addFile(this.id,postData).then(res=>{
                //     _self.btnLoading = false;
                //     if(res.code === "200"){
                //         utils.notice("添加成功","success");
                //         _self.modalStatus = false;
                //         //修改父组件内容
                //         _self.$emit("addFile",{"typeId" : this.typeId,"list":res.data});
                //     }else{
                //         utils.notice(res.msg,"error");
                //     }
                // });
            },
        }
    };
</script>

<style scoped>

</style>
