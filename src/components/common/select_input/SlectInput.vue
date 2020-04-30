<template>
    <div class="select-input">
        <Input ref="moneyinput" clearable :placeholder="placeholder" v-model="newValue" :number="true" :disabled="disableValue" @on-blur="handleBlur" @on-change="inputChange">
            <Select slot="append" v-model="selectData" @on-change="handleChange">
                <Option v-for="(item,index) in optionList" :value="item.key" :key="index">{{item.name}}</Option>
            </Select>
        </Input>
    </div>
</template>

<script>
export default {
    name:'select-input',
    props: {
        disableValue:{
            type:Boolean,
            default:false
        },
        value:{
            type:Number,
            default:null
        },
        placeholder:{
            type:String
        },
        selectValue:{
            type:Number,
            default:1
        },
        optionList:{
            type:Array,
            default:()=>{
                return [
                    {
                        key:1,
                        name:'万元'
                    },
                    {
                        key:2,
                        name:'万美元'
                    },
                    {
                        key:3,
                        name:'万欧元'
                    },
                    {
                        key:4,
                        name:'万日元'
                    },
                ]
            }
        }
    },
    data(){
        return{
            selectData:null,
            newValue:null
        }
    },
    watch: {
        selectValue(newVal){
            this.selectData = Number(newVal);
        },
        value(newVal){
            let format = typeof newVal == 'number' ? Number(newVal) : null;
            this.newValue = format;
        },
        newValue(newVal){
            let format = typeof newVal == 'number' ? Number(newVal) : null;
            this.$emit('select-model', format)

        }
    },
    created() {
        this.selectData = this.selectValue;
        this.newValue = this.value;

    },
    methods: {
        handleChange(e){
            this.$emit('select-option',this.selectData,Number(this.newValue));
        },
        /**
         * 手动聚焦
         */
        focus(){
            this.$refs.moneyinput.focus();
        },
        /**
         * 失去焦点
         */
        handleBlur(){
            this.$emit('on-blur');
        },
        /**
         * change事件分发
         */
        inputChange(){
            this.$emit("on-change");
        }
    },
};
</script>

<style lang="less">
.select-input{
    .ivu-select .ivu-select-dropdown{
        z-index: 10;
    }
    .ivu-input-group-append{
        width: 90px;
        background-color: #FFF;
        padding: 4px 0;
    }
    .between-line-left{
        .ivu-input-group-append{
            padding: 8px 10px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    .start{
        display: inline-block;
        margin-left: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #333;
    }
    .between-line-right {
        .ivu-input{
            margin-left: -1px;
            width:calc(100% + 1px);
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
    .ivu-form-item-error-tip{
        padding-top: 3px;
    }
}
</style>

