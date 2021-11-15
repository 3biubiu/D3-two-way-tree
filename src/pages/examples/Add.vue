<template>
    <div class="add-index">
        <Form class="add-form" ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
            <FormItem label="接待地点" prop="local" class="local-item item-box">
                <tis-select isModal v-model="formValidate.local" placeholder="请选择接待地点">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                    <!-- <option value=""></option> -->
                </tis-select>
            </FormItem>
            <FormItem label="接待时间" prop="startTime" class="start-item item-box">
                <tis-date-picker  
                    type="daterange" 
                    placeholder="开始时间-结束时间">
                </tis-date-picker>
            </FormItem>
            <FormItem label="接待单位" prop="unit" class="unit-item item-box">
                <tis-select isModal v-model="formValidate.unit" placeholder="请选择接待单位">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </tis-select>
            </FormItem>
            <FormItem label="参与人" prop="unit" class="unit-item item-box">
                <Input class="textarea-input" v-model="value5" type="textarea" placeholder="Enter something..." />
            </FormItem>
            <div class="level-item">
                <p class="level-title">接待等级与来宾情况</p>
                <div class="level-item-content">
                    <FormItem label="接待等级" prop="receptionLevel">
                        <RadioGroup v-model="formValidate.gender">
                            <Radio label="levelOne">一级：省部级领导/500强企业，我方董事长、总裁需出席</Radio>
                            <Radio label="levelTwo">二级：局、处级领导/知名企业或大型企业，我方总经办成员需出席</Radio>
                            <Radio label="levelThree">处级以下/一般企业，我方部门经理需出席</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="客方人数" prop="receptionLevel" class="litle-item">
                        <tis-splicing-input
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入客方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="我方人数" prop="receptionLevel" class="litle-item">
                        <tis-splicing-input
                            type="company"
                            unitName="人"
                            input1-placeholder="请输入我方人数">
                        </tis-splicing-input>
                    </FormItem>
                    <FormItem label="姓名及职务" prop="unit" class="unit-item no-bottom">
                        <Input class="textarea-input" v-model="value5" type="textarea" placeholder="请输入客方的姓名和职务" />
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
                        <CheckboxGroup v-model="social">
                            <Checkbox label="twitter">午餐</Checkbox>
                            <Checkbox label="facebook">晚餐</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="stay-row">
                        <p>预定酒店需求</p>
                        <CheckboxGroup v-model="social">
                            <Checkbox label="twitter">对方付费</Checkbox>
                            <Checkbox label="facebook">我方付费</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <div class="remark-item">
                <p>备注</p>
                <Input class="textarea-input" v-model="value5" type="textarea" placeholder="客户需求内容，如：草拟新闻通稿、安排摄影摄像、安排参观写字楼等" />
            </div>
            <FormItem label="附件上传" prop="file" class="">
                <tis-upload 
                    ref="feedbackUpload"
                    >
                </tis-upload>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import VueTabs from '../examples/Tabs'
    export default {
        name:'',
        components: {
            VueTabs
        },
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    local: [
                        { required: true, message: '多个地方大幅度', trigger: 'blur' }
                    ],
                    unit: [
                        { required: true, message: '多个地方大幅度', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    receptionLevel:[
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    file:[
                        { required: true, type: 'file', message: 'Please select time', trigger: 'change' }
                    ]
                },
                value5:'',
                social:[],
                single:''
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