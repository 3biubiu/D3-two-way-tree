<template>
    <div class="cropper-upload">
        <Upload
            class="upload-box"
            type="select"
            :before-upload="before"
            :on-format-error="handleFormatError"
            action=""
            :format="limitType"
            :accept="accept">
            <div class="camera-class">
                <Icon class="camera-icon-class" type="md-camera" />
            </div>
        </Upload>

        <Modal title="图片裁剪" width="600" v-model="cropModalStatus" @on-cancel="cancel">
            <div class="cropper-uploads">
                <Upload
                    :before-upload="before"
                    :on-format-error="handleFormatError"
                    type="select"
                    action=""
                    :format="limitType"
                    :accept="accept">
                    <Button type="default">选择图片</Button>
                </Upload>
            </div>
            <div class="cropper">
                <vue-cropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    mode="cover"
                    :canScale="true"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    @realTime="realTime"
                    @imgLoad="imgLoad">
                </vue-cropper>
            </div>
            <div class="cropper-btns">
                <Button type="default" title="放大" @click="changeScale(1)">+</Button>
                <Button type="default" title="缩小" @click="changeScale(-1)">-</Button>
                <Button type="default" title="左旋转" @click="rotateLeft">↺</Button>
                <Button type="default" title="右旋转" @click="rotateRight">↻</Button>
            </div>
            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { VueCropper }  from 'vue-cropper';
import $api from'@/api/item/item_detail/index.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import Config from '@/config.js';
import utils from "@/utils";
export default {
    name: 'cropper-upload',
    components: {
        VueCropper
    },
    props: {
        // 裁切宽度
        cropWidth: {
            type: Number,
            default: 0
        },
        // 裁切高度
        cropHeight: {
            type: Number,
            default: 0
        },
        // 后台裁切标识 1：商品图片、样式图片（180*180）
        imgType: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // cropper 参数设置
            option: {
                img: '',                         //裁剪图片的地址
                outputSize: 1, //剪切后的图片质量（0.1-1）
                full: true,//输出原图比例截图 props名full
                outputType: 'png',
                canMove: true,
                original: true,
                canMoveBox: true,
                autoCrop: true,                  // 是否默认生成截图框
                autoCropWidth: this.cropWidth,              // 默认生成截图框宽度
                autoCropHeight: this.cropHeight,             // 默认生成截图框高度
                fixedBox: true,
                info: true,                      //裁剪框的大小信息
            },
            // modal显示状态
            cropModalStatus: false,
            // 最后上传后的图片的服务器路径
            imgUrl: '',
            // 文件原始文件名
            fileName: '',
            previews: '',
            //文件类型
            limitType: ['jpg', 'png', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG', 'GIF'],
            // modeCover:'cover',//设置默认显示图片大小
            // add:0,
            // nowScale:1,
            // fileBefore:0,
            // fileCurrent:null,
        }
    },
    computed: {
        accept() {
            let arr = [];
            for(let type of this.limitType) {
                let str = `.${type}`;
                arr.push(str);
            }
            return arr.join(',');
        },
    },
    methods: {
        /**
         * 附件格式错误的提示信息
         */
        handleFormatError(file){
            utils.notice(`只能上传${this.limitType.join('，')}格式的文件`, 'error');
        },
        /**
         * iview upload组件上传，阻止上传，进行裁切
         */
        before(file) {
            console.log('file--->',file)
            if (file.size > 4 * 1024 * 1024){
                utils.notice('图片不能超过4M', 'error');
                return false;
            }
            this.fileName = file.name;
            let ext = file.name.split('.');
            if(this.limitType.indexOf(ext[ext.length - 1]) == -1) {
                utils.notice(`只能上传${this.limitType.join('，')}格式的文件`, 'error');
                return false;
            }
            const reader = new FileReader() //读取文件的字符流
            reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
            reader.onload = e => {
                // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                this.option.img = e.target.result;
            }
            // 显示裁切modal框
            this.cropModalStatus = true;
            // 阻止上传
            return false;
        },
        imgLoad (msg) {
            console.log('imgLoad')
            console.log(msg)
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
        },
        //放大/缩小
        changeScale(num) {

            num = num || 1;
            // if(num==1){
            //     this.add++;
            //     this.$refs.cropper.changeScale(num);
            // }else if(num==-1&&this.add>0){
            //     this.add--;
            //     this.$refs.cropper.changeScale(num);
            // }
            this.$refs.cropper.changeScale(num);

        },
        //坐旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        //右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        fileChange(e) {
            let _this = this;
            //上传图片
            var file = e.target.files[0]
            _this.fileName = file.name;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                utils.notice('图片类型必须是jpeg,jpg,png中的一种', 'error');
                return false
            }
            var reader = new FileReader();
            reader.onload =(e) => {
                let data;
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                }
                else {
                    data = e.target.result
                }
                _this.option.img = data
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file);
            this.cropModalStatus = true;
        },
        /**
         * 取消
         * @author liuhuanyu & 2019-11-18 20:01:01
         */
        cancel() {
            this.cropModalStatus = false;
        },
        /**
         * 确定
         * @author liuhuanyu & 2019-11-18 20:01:01
         */
        ok() {
            this.$refs.cropper.getCropBlob(data => {
                let formData = new FormData();
				formData.append('file', data, this.fileName);
                // formData.append('uid', Cookies.get('uid'));
                // 给后台传一个裁切类型
                if(this.imgType != '') {
                    formData.append('uploadType', this.imgType);
                }
                this.cropModalStatus = false
                //先将显示图片地址清空，防止重复显示
                this.option.img = ''
                // 调取接口，上传到服务器
                axios.post(`${Config.apiUrl}/Plugin/plugInUpload`,formData).then(response =>{
                    console.log(response);
                    if(response.data.code==200){
                        this.$emit('upload', response.data);
                    }else{
                        utils.notice("上传失败",'error');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            })
        },
        /**
         * 图裂情况
         * @author liuhuanyu & 2019-12-9 13:25:32
         */
        error() {
            // this.imgUrl = '';
            return "javascript:this.src=''";
        }
    }
}
</script>
<style lang="less" scoped>
    @import "./cropper_upload.less";
</style>

