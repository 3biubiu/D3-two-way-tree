<!--
列表格式
[
    {
        'id': 1,
        'name': '入耳额外因为人员.jpg',
        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
    },
    {
        'id': 2,
        'name': '的统计.jpg',
        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
    }
]
-->
<template>
	<div>
		<Row id="dropzone" class="dropzone-box clearfix">
			<Col span="4" class="dropzone-camera" @click.native="showCamera" :style="comonCss">
                <div class="dz-default dz-message">
                    <i class="iconfont iconicon_camera_fill"></i>
                    <p class="upload-file">附件相机</p>
                </div>
			</Col>
			<Col span="20" style="margin-left: 16.6666666667%;">
				<simple-upload
                ref="simpleUpload"
                :upload-url="uploadUrl"
                :limit-type="limitType"
                :select-type="selectType"
                :multiple="multiple"
                :extra-data="extraData"
                :selected-mode="selectedMode"
                :max-size="maxSize"
                :c-my-dropzone="cMyDropzone"
                :c-my-img="cMyImg"
                :c-my-delete="cMyDelete"
				@finishUpload="finishUpload"
                ></simple-upload>
			</Col>
		</Row>
		<file-camera ref="fileCamera" @callBackSelected="cameraConfirm"></file-camera>
	</div>
</template>

<script>
import SimpleUpload from "./simple_upload/SimpleUpload";
import FileCamera from "./file_camera/FileCamera";
import $api from "@/api/plugin/plugin.js";
import Config from "@/config.js";

export default {
    components:{
    	SimpleUpload,
    	FileCamera
    },
    props: {
        //样式 主要考虑到不同大小的显示
        //公共
        comonCss: {
            type:Object,
            default: function(){
                return {
                    height:'100%'
                };
            }
        },
        //外层
        cMyDropzone:{
            type: Object,
            default: function(){
                return {
                    padding: '23px',
                    minHeight: this.comonCss.minHeight
                };
            }
        },
        //图片
        cMyImg: {
            type: Object,
            default: function(){
                return {
                    width: '100px',
                    height: '100px'
                }
            }
        },
        //删除按钮的样式
        cMyDelete: {
            type: Object,
            default: function(){
                return {
                    lineHeight: '21px',
                }
            }
        },
        //上传地址
        uploadUrl: {
            type: String,
            default: Config.uploadUrl,
        },
        //文件类型
        limitType: {
            type: Array,
            default: ()=>{
                return ['doc','docx','xls','xlsx','ppt','pptx','pdf','rar','zip','jpg','gif','png','txt','chm','dwg','mp3','mp4','flv'];
            }
        },
        //模式 拖动\点选
        selectType: {
            type: String,
            default: 'drag'
        },
        //是否支持多选
        multiple: {
            type: Boolean,
            default: true,
        },
        //额外参数
        extraData:{
            type:Object,
            default: ()=>{
                return {};
            }
        },
        //是否开启选中模式 选中模式下无法预览
        selectedMode: {
            type: Boolean,
            default: false
        },
        //文件大小限制，单位 kb
        maxSize: {
            type: Number,
            default: 35 * 1024
        }
    },
    data() {
        return {
        }
    },
    methods: {
        //上传结束
        finishUpload(){
          	let list = this.getFileIds();
          	this.$emit("finishUpload",list);
		},
    	//显示附件相机
    	showCamera(){
    		this.$refs.fileCamera.showModal(true);
    	},
    	//选择附件确定
    	cameraConfirm(idsArr){
    		let _self = this;
    		let data = {
    			id: idsArr
    		};
    		$api.getPicInfuByIds(data).then((result)=>{
    			for(let k in result){
    				_self.$refs.simpleUpload.addFilesToFileList(result[k].id, result[k].name, result[k].path);
    			}
    		});
    	},
        //获取已上传列表文件ids
        getFileIds(){
            return this.$refs.simpleUpload.getFileIds();
        },
        //获取完整文件列表
        getFileList(){
            return this.$refs.simpleUpload.getFileList();
        },
        /**
         * 提供添加文件的接口
         * @param {int} id 资源id
         * @param {string} name 资源name
         * @param {string} url 资源url
         * @param {Boolean} checked 是否被选中了
         */
        addFilesToFileList(id, name, url, checked=false){
            this.$refs.simpleUpload.addFilesToFileList(id, name, url, checked);
        },
        //清空
        fresh(){
            this.$refs.simpleUpload.fresh();
        }
    }
};
</script>


<style scoped lang="less">
    @import './simple_upload/dropzone.less';
    @import './upload.less';
</style>
