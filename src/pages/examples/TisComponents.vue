<template>
    <div class="tis-components">
        <h1>如何使用公共组件库示例111</h1>
        <!-- <tis-demo-one></tis-demo-one>
        <br/>
        <br/>
        <tis-demo-two></tis-demo-two>
        <br/>
        <br/>
        <tis-demo-three></tis-demo-three>
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
        <tis-select-search
            :default-data="defaultData" 
            :id="id" 
            :placeholder="placeholder" 
            @back-select-search="backSelectSearch">
        </tis-select-search>
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
            backSelectSearch(data){
                console.log(data)  //返回的数据
            },
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
            }

        }
    }
</script>

<style lang="less" scoped>
    .tis-components{
        height: 2000px;
    }
</style>