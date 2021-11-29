<template>
    <div class="add-index">
        <Form class="add-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
            <FormItem label="接待地点" prop="local" class="local-item item-box">
                <tis-select v-model="formValidate.local" clearable placeholder="请选择接待地点">
                    <tis-option v-for="item in localList" :value="item.id" :key="item.id">{{item.value}}</tis-option>
                </tis-select>
            </FormItem>
            <FormItem label="接待时间" prop="time" class="start-item item-box">
                <tis-date-picker  
                    ref="receptionTime"
                    type="daterange" 
                    @on-change="timeChange"
                    placeholder="开始时间-结束时间">
                </tis-date-picker>
            </FormItem>
            <FormItem label="接待单位" prop="unit" class="unit-item item-box">
                <tis-select v-model="formValidate.unit" clearable placeholder="请选择接待单位">
                    <tis-option v-for="item in unitList" :value="item.value" :key="item.id">{{item.value}}</tis-option>
                </tis-select>
            </FormItem>
            <FormItem label="参与人" prop="person" class="unit-item item-box">
                <Input class="textarea-input" v-model="formValidate.person" type="textarea" placeholder="请输入参与人" />
            </FormItem>
            <div class="level-item">
                <p class="level-title">接待等级与来宾情况</p>
                <div class="level-item-content">
                    <FormItem label="接待等级" prop="receptionLevel">
                        <RadioGroup v-model="formValidate.receptionLevel" @on-change="changeLevel">
                            <Radio label="1">一级：省部级领导/500强企业，我方董事长、总裁需出席</Radio>
                            <br/>
                            <Radio label="2">二级：局、处级领导/知名企业或大型企业，我方总经办成员需出席</Radio>
                            <br/>
                            <Radio label="3">处级以下/一般企业，我方部门经理需出席</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="客方人数" prop="guestNumber" class="litle-item">
                        <tis-splicing-input
                            @change-input="changeGuestNumber"
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入客方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="我方人数" prop="ourNumber" class="litle-item">
                        <tis-splicing-input
                            @change-input="changeOurNumber"
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入我方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="姓名及职务(请按照职位等级由高到低输入)" prop="nameJob" class="unit-item no-bottom">
                        <Input class="textarea-input" v-model="formValidate.nameJob" type="textarea" placeholder="请输入客方的姓名和职务" />
                    </FormItem>
                </div>
            </div>
            <div class="level-item about-item">
                <p class="level-title">其它信息（此部分与页面内容无关，仅做参考）</p>
                <div class="about-item-content">
                    <template v-for="(item,index) in formValidate.urlList">
                        <FormItem label="参考网址" class="url-item" :prop="'url'+index">
                            <Input v-model="item.urlLink" placeholder="请输入客方的姓名和职务" />
                            <span v-show="index==0" @click="addUrl">添加+</span>
                            <span v-show="index!=0" @click="delUrl(index)">删除X</span>
                        </FormItem>
                    </template>
                </div>
            </div>
            <div class="level-item stay-item">
                <p class="level-title">住宿、用餐情况</p>
                <div class="stay-item-content">
                    <div class="stay-row">
                        <p>用餐需求</p>
                        <CheckboxGroup v-model="formValidate.dining" @on-change="changeDining">
                            <Checkbox label="1">午餐</Checkbox>
                            <Checkbox label="2">晚餐</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="stay-row">
                        <p>预定酒店需求</p>
                        <CheckboxGroup v-model="formValidate.hotel">
                            <Checkbox label="1">对方付费</Checkbox>
                            <Checkbox label="2">我方付费</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <div class="remark-item">
                <p>备注</p>
                <tis-input class="textarea-input" v-model="formValidate.remark" type="textarea" placeholder="客户需求内容，如：草拟新闻通稿、安排摄影摄像、安排参观写字楼等" />
            </div>
            <FormItem label="附件上传" prop="file" class="">
                <tis-upload 
                    ref="feedbackUpload"
                    :upload-url="uploadUrl"
                    :extra-data="extraData"
                    @finish-upload="finishUpload"
                    @handle-remove="handleRemove"
                    @refresh="refresh"
                    @call-back-selected="cameraConfirm"
                    >
                </tis-upload>
            </FormItem>
            <tis-button type="primary" class="tis-button-padding" @click="handleSubmit('formValidate')">
                提&nbsp;交
            </tis-button>
        </Form>
    </div>
</template>
<script>
    import config from "@/config.js";
    import $api from "@/api/mms_common/plugin.js";
    export default {
        name:'',
        components: {
        },
        data () {
            return {
                formValidate: {//验证内容
                    local: '',//接待地点
                    time: [],//接待时间
                    starTime:'',//开始时间
                    endTime:'',//结束时间
                    unit: '',//接待单位
                    person: '',//参与人
                    receptionLevel: '',//接待等级
                    guestNumber:'',//客方人数
                    ourNumber:'',//我方人数
                    nameJob:'',//姓名及职务
                    dining:[],//用餐需求
                    hotel:[],//酒店需求
                    remark:'',//备注
                    file:[],//文件
                    urlList:[
                        {
                            urlLink:''//网址
                        },
                        {
                            urlLink:'www.baidu.com'
                        }
                    ],//参考网址数组
                    // interest: [],
                    // date: '',
                    // desc: '',
                },
                localList:[//接待地点
                    {
                        id:'1',
                        value:'北京'
                    },
                    {
                        id:'2',
                        value:'上海'
                    },
                    {
                        id:'3',
                        value:'广州'
                    },
                    {
                        id:'4',
                        value:'深圳'
                    }
                ],
                unitList:[//接待单位
                    {
                        id:'1',
                        value:'北京公司'
                    },
                    {
                        id:'2',
                        value:'天津公司'
                    }
                ],
                single:'',
                ruleValidate: {//验证规则
                    local: [
                        { required: true, message: '请选择接待地点', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'array', message: '请选择接待时间', trigger: 'change' }
                    ],
                    unit: [
                        { required: true, message: '请选择接待单位', trigger: 'change' }
                    ],
                    person:[
                        { required: true, type: 'string', message: '请输入参与人', trigger: 'blur' }
                    ],
                    receptionLevel:[
                        { required: true, type: 'string', message: '请选择接待等级', trigger: 'change' }
                    ],
                    guestNumber:[
                        { required: true, type: 'string', message: '请输入客方人数', trigger: 'blur' }
                    ],
                    ourNumber:[
                        { required: true, type: 'string', message: '请输入我方人数', trigger: 'blur' }
                    ],
                    nameJob:[
                        { 
                            required: true,
                            type: 'string',
                            message: '请输入姓名及职务',
                            trigger: 'blur',
                        }
                    ],
                    file:[
                        { required: true, type: 'array', message: '请选择需要上传的文件', trigger: 'change' }
                    ]
                },
                uploadUrl: config.devUploadUrl,//文件上传地址
                // uploadHeader:{  //请求头，一般是token
                //     token:config.token
                // }, 
                extraData:{//上传接口额外参数
                    uid:'734962'
                },
                defaultFiles:[
                    {
                        id: "1",
                        name: "15900481541743641996.jpg",
                        path: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3622952802,116584605&fm=26&gp=0.jpg"
                    }
                ]
            }
        },
        watch: {
            'formValidate.urlList':{
                handler(newVal,oldVal){
                    this.initRule();
                }
            }
        },
        created(){
            this.initRule();
        },
        mounted() {     
            /**
             *   赋默认值（必须传数组切包含id、name、path）
             */
            this.$refs.feedbackUpload.addFilesToFileList(this.defaultFiles);
        },
        methods:{
            initRule(){
                for(let i in this.formValidate.urlList){
                    // console.log(this.formValidate.urlList[i].urlLink);
                    this.ruleValidate['url'+i] = {
                        validator:(rule, value, callback) => {
                            if(this.formValidate.urlList[i].urlLink == '' || this.formValidate.urlList[i].urlLink == undefined || this.formValidate.urlList[i].urlLink == null) {
                                return callback(new Error('请输入网址'));
                            }
                            callback();
                        },
                        trigger: 'blur',
                        required:true
                    }
                }
                // console.log(this.ruleValidate);
            },
            /**
             * 删除参考网址
             * @param index 当前输入框下标
             */
            delUrl(index){
                this.formValidate.urlList.splice(index,1);
            },
            /**
             * 添加参考网址
             */
            addUrl(){
                this.formValidate.urlList.push({url:''});
            },
            /**
             *日期发生变化时 
             * @param {Array} value1 日期数组
             * @param {String} value2 日期类型
             */
            timeChange(value1,value2){
                // console.log(value1,value2);
                this.formValidate.time = value1;
                this.formValidate.starTime = value1[0];
                this.formValidate.endTime = value1[1];
            },
            /**
             * 输入客方人数时
             * @param {Number} index 当前组件的下标
             * @param {String} text1 输入框失焦时返回的数据
             */
            changeGuestNumber(index,text1){
                this.formValidate.guestNumber = text1;
            },
            /**
             * 输入我方人数时
             * @param {Number} index 当前组件的下标
             * @param {String} text1 输入框失焦时返回的数据
             */
            changeOurNumber(index,text1){
                this.formValidate.ourNumber = text1;
            },
            /**
             * 提交
             * @param {Object} formValidate 需要验证的表单数据
             */
            handleSubmit (formValidate) {
                console.log(this.formValidate);
                this.$refs[formValidate].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            },
            handleReset (formValidate) {
                // this.$refs[formValidate].resetFields();
            },
            /**
             *接待等级选中改变时
             */
            changeLevel(data){
                this.formValidate.receptionLevel = data;
            },
            /**
             * 用餐需求
             * @param {String} data 选中复选框返回的数据
             */
            changeDining(data){
                this.formValidate.dining = data;
            },
            /**
             * 预定酒店需求
             * @param {String} data 选中复选框返回的数据
             */
            changeHotel(data){
                this.formValidate.hotel = data;
            },
            /**
            * （上传完成）更新上传文件数据
            * @param {Array} list 上传文件列表
            */
            finishUpload(list){
                console.log(list);
                this.defaultFiles = list;
            },
            /**
            * 附件相机刷新
            */
            async refresh(){
                let res = await $api.cameraAttachment();
                if(!res){
                    this.$TisMessage.error(res.msg);
                    return false;
                }
                this.$refs.feedbackUpload.getCameraList(res);
            },
            /**
            * 点击附件确定
            * @param {Array} idsArr 所选文件的id
            */
            async cameraConfirm(idsArr){
                let data = {
                    id: idsArr
                };
                let res = await $api.getPicInfuByIds(data);
                if(res){
                    this.$refs.feedbackUpload.addFilesToFileList(res.list);
                }else{
                    this.$TisMessage.error(res.msg);
                }
            },
            /**
            * 删除
            * @param {object} file 文件
            */
            async handleRemove(file){
                //  请求接口
                let data = {
                    pic_id: file.id
                }; 
                let res = await $api.deletePic(data);
                if(res.code==200){
                    this.$refs.feedbackUpload.deleteFile(file);
                    this.$TisMessage.success('删除成功')
                } else {
                    this.$TisMessage.error(res.msg)
                }
                // 不请求接口
                // this.$refs.feedbackUpload.deleteFile(file);
                // this.$TisMessage.success('删除成功')
                this.defaultFiles.splice(this.defaultFiles.findIndex(item => item.id === file.id), 1);
            }
        }
    }
</script>

<style lang="less">
@import './add.less';
</style>