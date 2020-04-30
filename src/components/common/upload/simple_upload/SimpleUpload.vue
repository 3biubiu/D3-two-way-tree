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
        <viewer :images="uploadList" @inited="inited" ref="viewer">
    		<div class="dropzone dz-clickable" :style="cMyDropzone" @click="selectFile">
    			<div class="dz-default dz-message">
                    <i class="fa fa-cloud-upload"></i>
                    <p class="upload-file">点击上传文件</p>
                </div>
    			<div v-for="(item, index) in uploadList" class="dz-preview dz-processing dz-image-preview dz-success" :class="{checked: item.checked}" @click.stop="checkedPic(item,index)">
    				<div class="dz-details" :style="{width: cMyImg.width, height:cMyImg.height}">   
    					<div class="dz-size" data-dz-size="" :title="item.name">{{item.name}}</div>    
    					<img v-if="item.filetype=='.jpg' || item.filetype=='.png' || item.filetype=='.jpeg'" class="custom_img" :style="cMyImg" :src="item.url"> 
                        <i v-else-if="item.filetype=='.xls' || item.filetype=='.xlsx'" class="fa fa-lg tkfile-fa fa-file-excel-o"></i>
                        <i v-else-if="item.filetype=='.pdf'" class="fa fa-lg tkfile-fa fa-file-pdf-o "></i>
                        <i v-else-if="item.filetype=='.doc' || item.filetype=='.docx'" class="fa fa-lg tkfile-fa fa-file-word-o"></i>
                        <i v-else-if="item.filetype=='.txt'" class="fa fa-lg tkfile-fa fa-file-text"></i>
    					<i v-else-if="item.filetype=='.ppt' || item.filetype=='.pptx'" class="fa fa-lg tkfile-fa fa-file-powerpoint-o"></i>
                        <i v-else class="fa fa-lg tkfile-fa fa-file-o"></i>
    				</div>  
    				<div class="dz-progress">
    					<span v-if="item.showProgress" class="dz-upload" data-dz-uploadprogress="" :style="{width: item.percentage+'%'}"></span>
    				</div>  
    				<div class="dz-success-mark"><span>✔</span></div>  
    				<div class="dz-error-mark"><span>✘</span></div>
    				<div class="dz-error-message"><span></span></div>
    				<a @click.stop="handleRemove(item, index)" class="dz-remove" :style="cMyDelete" href="javascript:undefined;">删除</a>
    			</div>
    		</div>
        </viewer>
		<Upload
			ref="simpleUpload"
			:action="uploadUrl"
	        :show-upload-list="false"
	        :on-success="handleSuccess"
	        :format="limitType"
	        :on-format-error="handleFormatError"
	        :before-upload="handleBeforeUpload"
	        :type="selectType"
	        :headers="uploadHeader"
	        :on-error="handleError"
			:multiple="multiple"
            :data="extraData"
            :max-size="maxSize"
            :on-exceeded-size="exceededSize"
            name="file[]"
            style="opacity: 0; position: absolute;">
	    </Upload>
	</div>
</template>

<script>
import Config from "@/config.js";
import Cookies from 'js-cookie';
import $api from "@/api/index.js";

export default {
    components:{
        
    },
    props: {
    	//样式 主要考虑到不同大小的显示
        //外层
    	cMyDropzone:{
    		type: Object,
    		default: function(){
    			return {
	    			padding: '23px',

                    minHeight:'200px'
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
                return ['doc','docx','xls','xlsx','ppt','pptx','pdf','rar','zip','jpg','gif','png','txt','chm','dwg'];
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
            default: 30 * 1024
        }
    },
    watch:{
    },
    computed: {
        //获取所有图片地址
        images: ()=>{
            let arr = [];
            for(let k in this.uploadList){
                arr.push(this.uploadList[k].url);
            }
            return arr;
        }
    },
    data() {
        return {
            //上传列表
            uploadList: [],
            //请求头
	        uploadHeader: {
	        	Token: Cookies.get('token'),
	        	// theOne: Cookies.get('theOne'),
	        	// source: 'web',
	        }
        } 
    },
    methods: {
        //弹出选文件的弹窗
    	selectFile(){
    		this.$el.querySelector('[type=file]').click();
    	},
        /**
         * 上传成功
         * @param {object} response 返回值
         * @param {object} file 上传的文件
         * @param {array} fileList 文件里列表
         */
    	handleSuccess(response, file, fileList){
    		if(response.code == 200){
    			file.id = response.list[0].id;
                file.filetype = this.getFileType(response.list[0].name);
                // file.url = response.list[0].domain + response.list[0].logo;
                file.url = response.list[0].path;
                this.$set(file, 'checked', false)
    		}else{
                this.handleRemove(file);
                this.$Message.error(response.msg);
            }
            this.$emit('finishUpload')
    	},
        /**
         * 获取文件类型
         * @param {string} filename 文件名
         */
        getFileType(filename){
            let type
            if(filename){

               type = filename.substr(filename.lastIndexOf(".")).toLowerCase();
            }
            return type;
        },
        //格式错误
    	handleFormatError(){
            let _self = this;
    		_self.$Message.warning('文件格式错误，仅支持' + _self.limitType.join('、') + '格式');
    	},
        //上传前
    	handleBeforeUpload(){
    		
    	},
        /**
         * 删除
         * @param {object} file 文件
         * @param {int} index 索引
         */
    	handleRemove (file, index) {
            let _self = this;
            let data = {
                pic_id: file.id
            };
            $api.deletePic(data).then(()=>{
                _self.$delete(_self.uploadList, index);
                _self.$emit('finishUpload')
            });
        },
        //获取已上传列表文件ids  --id数组
        getFileIds(){
        	let list = this.$refs.simpleUpload.fileList;
        	let arr = [];
        	for(let k in list){
        		arr.push(list[k].id);
        	}
        	return arr;
        },
        //获取完整文件列表的拷贝
        getFileList(){
            return JSON.parse(JSON.stringify(this.uploadList));
        },
        /**
         * 上传失败
         * @param {object} error 错误内容
         * @param {object} file 文件对象
         * @param {array} fileList 文件列表
         */
        handleError(error, file, fileList){
        	this.$Message.error('上传失败');
        },
        /**
         * 提供添加文件的接口
         * @param {int} id 资源id
         * @param {string} name 资源name
         * @param {string} url 资源url
         * @param {Boolean} checked 是否被选中了
         */
        addFilesToFileList(id, name, url, checked=false){
            let filetype = this.getFileType(name);
            this.uploadList.push({
                id: id,
                name: name,
                url: url,
                filetype: filetype,
                checked: checked,
            });
            this.$emit('finishUpload')
        },
        //添加checked属性
        addCheckedPro(){
            for(let k in this.uploadList){
                this.$set(this.uploadList[k], 'checked', false)
            }
        },
        /**
         * 点击图片
         * @param {object} file 文件对象
         */
        checkedPic(file,index){
            if(this.selectedMode) {
                for (let k in this.uploadList) {
                    this.uploadList[k].checked = false;
                }
                file.checked = true;
                return;
            }
            if(['.jpg', '.png', '.jpeg', '.gif'].indexOf(file.filetype)>-1){
                // this.$viewer.show();
                this.$viewer.view(index);
            }
        },
        /**
         * 初始化
         * @param {object} viewer viewer对象
         */
        inited (viewer) {
            this.$viewer = viewer;
        },
        //过大
        exceededSize(){
            let _self = this;
            _self.$Message.warning('文件过大，最大能上传' + _self.maxSize/1024 + 'M');
        },
        //清空
        fresh(){
            this.$refs.simpleUpload.fileList = [];
            this.uploadList = this.$refs.simpleUpload.fileList;
        }
    },
    mounted() {
    	this.uploadList = this.$refs.simpleUpload.fileList;
        this.addCheckedPro();
    }
};
</script>


<style scoped lang="less">
    @import './dropzone.less';
    @import './simple_upload.less';
</style>
