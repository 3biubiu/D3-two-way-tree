<template>
    <div class="add-index">
        <Form class="add-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
            <FormItem label="接待地点" prop="local" class="local-item item-box">
                <tis-select v-model="formValidate.local" placeholder="请选择接待地点">
                    <tis-option v-for="item in localList" :value="item.id" :key="item.id">{{item.value}}</tis-option>
                </tis-select>
            </FormItem>
            <FormItem label="接待时间" prop="time" class="start-item item-box">
                <tis-date-picker  
                    type="daterange" 
                    placeholder="开始时间-结束时间">
                </tis-date-picker>
            </FormItem>
            <FormItem label="接待单位" prop="unit" class="unit-item item-box">
                <tis-select v-model="formValidate.unit" placeholder="请选择接待单位">
                    <Option v-for="item in unitList" :value="item.value" :key="item.id">{{ item.value }}</Option>
                </tis-select>
            </FormItem>
            <FormItem label="参与人" prop="person" class="unit-item item-box">
                <Input class="textarea-input" v-model="formValidate.person" type="textarea" placeholder="请输入参与人" />
            </FormItem>
            <div class="level-item">
                <p class="level-title">接待等级与来宾情况</p>
                <div class="level-item-content">
                    <FormItem label="接待等级" prop="receptionLevel">
                        <RadioGroup v-model="formValidate.receptionLevel">
                            <Radio label="levelOne">一级：省部级领导/500强企业，我方董事长、总裁需出席</Radio>
                            <Radio label="levelTwo">二级：局、处级领导/知名企业或大型企业，我方总经办成员需出席</Radio>
                            <Radio label="levelThree">处级以下/一般企业，我方部门经理需出席</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="客方人数" prop="guestNumber" class="litle-item">
                        <tis-splicing-input
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入客方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="我方人数" prop="ourNumber" class="litle-item">
                        <tis-splicing-input
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入我方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="姓名及职务" prop="nameJob" class="unit-item no-bottom">
                        <Input class="textarea-input" v-model="formValidate.nameJob" type="textarea" placeholder="请输入客方的姓名和职务" />
                        <p class="textarea-text">请按照职位等级由高到低输入</p>
                    </FormItem>
                </div>
            </div>
            <div class="level-item about-item">
                <p class="level-title">相关内容布置</p>
                <div class="about-item-content">
                    <div class="about-row">
                        <Button icon="md-add" class="about-button">申请会议室</Button>
                        <Checkbox v-model="single">需要布置会场</Checkbox>
                    </div>
                    <div class="about-row">
                        <Button icon="md-add" class="about-button">申请用车</Button>
                        <Checkbox v-model="single">需要协助租车</Checkbox>
                    </div>
                </div>
            </div>
            <div class="level-item stay-item">
                <p class="level-title">住宿、用餐情况</p>
                <div class="stay-item-content">
                    <div class="stay-row">
                        <p>用餐需求</p>
                        <CheckboxGroup v-model="formValidate.dining">
                            <Checkbox label="twitter">午餐</Checkbox>
                            <Checkbox label="facebook">晚餐</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="stay-row">
                        <p>预定酒店需求</p>
                        <CheckboxGroup v-model="formValidate.hotel">
                            <Checkbox label="twitter">对方付费</Checkbox>
                            <Checkbox label="facebook">我方付费</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <div class="remark-item">
                <p>备注</p>
                <Input class="textarea-input" v-model="formValidate.remark" type="textarea" placeholder="客户需求内容，如：草拟新闻通稿、安排摄影摄像、安排参观写字楼等" />
            </div>
            <FormItem label="附件上传" prop="file" class="">
                <tis-upload 
                    ref="feedbackUpload"
                    >
                </tis-upload>
            </FormItem>
            <tis-button type="primary" class="tis-button-padding">提&nbsp;交</tis-button>
        </Form>
    </div>
</template>
<script>
    export default {
        name:'',
        components: {
        },
        data () {
            return {
                formValidate: {//验证内容
                    local: '',//接待地点
                    time: '',//接待时间
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
                        company:'北京联行'
                    },
                    {
                        id:'2',
                        company:'天津公司'
                    }
                ],
                single:'',
                ruleValidate: {//验证规则
                    local: [
                        { required: true, message: '请选择接待地点', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: '请选择接待时间', trigger: 'change' }
                    ],
                    unit: [
                        { required: true, message: '请选择接待单位', trigger: 'change' }
                    ],
                    person:[
                        { required: true, type: 'string', message: '请选择参与人', trigger: 'change' }
                    ],
                    receptionLevel:[
                        { required: true, type: 'string', message: '请选择接待等级', trigger: 'change' }
                    ],
                    guestNumber:[
                        { required: true, type: 'string', message: '请选择客方人数', trigger: 'change' }
                    ],
                    ourNumber:[
                        { required: true, type: 'string', message: '请选择我方人数', trigger: 'change' }
                    ],
                    nameJob:[
                        { required: true, type: 'string', message: '请选择我方人数', trigger: 'change' }
                    ],
                    file:[
                        { required: true, type: 'file', message: '请选择需要上传的文件', trigger: 'change' }
                    ]
                },
            }
        },
        watch: {
            
        },
        mounted() {     
                 
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style lang="less">
@import './add.less';
</style>