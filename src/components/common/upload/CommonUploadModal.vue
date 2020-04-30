<template>
    <Modal v-model="modalStatus"
           title="附件上传"
           width="600"
           :transfer="false">
        <p style="display: inline-block;padding-bottom: 10px">文件上传（文件格式为OFFICE、PDF、RAR、ZIP、JPG、GIF、PNG、TXT、CHM、DWG、MP3、MP4、FLV）</p>
        <file-upload ref="uploadFile" :upload-url="uploadUrl" :extra-data="extraData"></file-upload>
        <div slot="footer">
            <Button type="text" @click="modalStatus = false">取消</Button>
            <Button type="primary" @click="saveFile" :loading="btnLoading">确定</Button>
        </div>
    </Modal>
</template>

<script>
    import fileUpload from "./Upload";
    import Config from '@/config.js';
    import utils from "@/utils";
    import $api from '@/api/clinch_a_deal/index.js';
    export default {
        name: "common-upload-modal",
        components:{
            fileUpload,
        },
        props : {
            //id
            id : {
                type : String,
                default : "",
            },
        },
        data (){
            return {
                //上传携带的额外参数
                extraData : {},
                //附件分类id
                typeId : "",
                //成交项目分类
                cate : "",
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
                this.$refs.uploadFile.fresh();
                this.modalStatus = true;
            },
            /**
             * 确定按钮保存附件
             */
            async saveFile(){
                let fileIds = this.$refs.uploadFile.getFileIds();
                if(!fileIds || fileIds.length <= 0){
                    utils.notice("请上传附件","warning");
                    return false;
                }

                let postData = {
                    pic_ids : fileIds,
                    id : this.id,
                    type_id : this.typeId,
                    cate : this.cate
                };

                let _self = this;
                this.btnLoading = true;
                let res = await $api.saveDetailFile(postData);
                this.btnLoading = false;
                if(res.code !== 200){
                    utils.notice(res.msg,"error");
                    return false
                }

                utils.notice("保存附件成功","success");

                _self.$emit("addFile",res.data);
                this.modalStatus = false;
            }
        }
    }
</script>

<style scoped>

</style>
