<template>
    <div class="tis-compontent-wrapper">
        <h1>如何使用公共组件库示例111</h1>
        <Icon type="md-home"  class="demo-home" size="24"/>
        <icon-check-one theme="filled" size="32" fill="#1f6cdd" ref="checkOne" @mousemove="enterCheck" @mouseout="outCheck" @mousedown="downClick" @mouseup="upClick"/>
        <icon-check-one theme="filled" size="32" fill="#1f6cdd" class="demo-check"/>
        <icon-align-left-one theme="outline" size="24" fill="#f00" class="four-path-icon" strokeLinejoin="bevel"/>
        <icon-expand-left-and-right theme="outline" size="24" fill="#f00" strokeLinejoin="bevel"/>
        <icon-envelope-one class="envelope" theme="outline" size="24" fill="#f00" strokeLinejoin="bevel"/>
        <icon-movie class="movie" theme="filled" size="24" fill="#333" strokeLinejoin="bevel"/>
        <!-- <tis-demo-one></tis-demo-one>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/> -->
        <tis-del-auth 
            :auth-list="authList" 
            :type="type" 
            :title="title" 
            :placement="placement" 
            :width="width" 
            @define-del="defineDel"
            @cancel="cancel" 
        ></tis-del-auth>
        <tis-bubble 
            trigger="click" 
            title="这是标题" 
            content='哈哈哈哈哈哈哈哈哈哈' 
            placement="top"
            width="180">
            <span class="auth-del">标题+内容</span>
        </tis-bubble>
        <tis-cut-upload 
            ref="cutUpload"
            title="上传封面" 
            width="600" 
            :limit-type="limitType"
            :upload-tips="uploadTips"
            :file-size="fileSize"
            :height="height"
            :scale="scale"
            :view-scale="2"
            @on-ok="ok" 
        ></tis-cut-upload>
        <tis-upload 
            ref="feedbackUpload"
            :upload-url="uploadUrl"
            :selected-mode="false"
            :upload-text="uploadText"
            :extra-data="extraData"
        ></tis-upload>
    </div>
    
</template>
<script>
    export default {
        name:'tis-components',
        components: {
        },
        data () {
            return {
                authList:[
                    {
                        uid:'1', //用户uid
                        username:'aaa', //用户名
                        candel:true //是否可以删除
                    },{
                        uid:'2',
                        username:'bbb',
                        candel:false
                    }
                ],
                type:1,//1---气泡二次确认 2---二次确认弹窗
                title:'确认要移除其查看权限吗？',
                content:'该项目被删除后会进入回收站',
                placement:'top',
                width:'224',
                height:100,//上传upload的高度，同触发上传的盒子高度
                limitType:['jpg','jpeg','png'],
                uploadTips:'点击上传封面'+'\n'+'支持jpg, jpeg, png文件',
                fileSize:2,//文件最大限制(M)
                scale:0.6,//upload图片显示缩放比,
                // 下拉搜索组件
                defaultData:{
                    url:'http://mms.app_php.com/spa.php/DealPlugin/contacts',
                    methods:'get',
                    token:'538f0f1cb4dcf8b108f1bfdc6c9d515e9be6d94b',
                    keyword:'1',
                    idShow:true,   //id是否展示在下拉列表中
                    show:['id','name','money']   //除id外其他是需要展示的字段对应的字段名
                },
                id:598,
                placeholder:'支持搜索的下拉选择',
                uploadUrl: '',//文件上传地址
                uploadText:'点击上传文件'+'\n'+'支持多种格式的文件',
                fileAmount:'2',// 限制上传文件个数
                maxSize:2*1024,
                extraData:{//上传接口额外参数
                    uid:''
                }    
            }
        },
        watch: {
            
        },
        mounted() {     
                 
        },
        methods: {
            /**
             * 点击剪裁弹窗确定
             * @param {Object} imgData 剪裁完毕的图片信息
             */
            async ok(imgData){
                // 请求接口
                imgData.formData.append('uploadType', '1');
                let that = this;
                axios.post(Config.uploadUrl,imgData.formData).then(response =>{
                    if(response.data.code==200){
                        that.$refs.cutUpload.getPath(response.data.data);
                    }else{
                        utils.notice("上传失败",'error');
                    }
                })
                // 不请求接口
                // this.$refs.cutUpload.getPath(imgData);

            },
            /**
            * 点击确认--删除权限
            * @param {Object} item 删除项的数据内容
            */
            defineDel(item){
                console.log('点击确认',item)
            },
            /**
            * 点击取消--删除权限
            * @param {Object} item 点击取消的删除项的数据内容
            */
            cancel(item){
                console.log('点击取消',item)
            },
            userClick() {
                this.counter++
            },
            // 悬浮
            enterCheck(){
                this.$refs.checkOne.fill = "#468eeb"
            },
            //鼠标离开 
            outCheck(){
                this.$refs.checkOne.fill = "#1f6cdd"
            },
            // 鼠标点击
            downClick(){
                this.$refs.checkOne.fill = "#114eb8"
            },
            // 鼠标松开
            upClick() {
                this.$refs.checkOne.fill = "#468eeb"
            }
        }
    }
</script>

<style lang="less">
    .tis-compontent-wrapper{
        height: 2000px;
        .demo-home:hover{
            color:#f00;
        }
        .demo-home:active{
            color:#00f;
        }
        .demo-check{
            &:hover {
                path:first-child{
                    fill: #468eeb;
                    stroke: #468eeb;
                }
            }
            &:active{
                path:first-child{
                    fill: #114eb8;
                    stroke: #114eb8;
                }
            }
        }
        .four-path-icon:hover{
            path{
                stroke: rgb(96, 139, 66);
            }
        }
        .envelope:hover{
            path{
                stroke: #00f;
            }
        }
        .movie:hover{
            path:first-child{
                fill: #f00;
                stroke: #f00;
            }
            path:last-child{
                fill: #f00;
                stroke: #f00;
            }
        }

    }
</style>