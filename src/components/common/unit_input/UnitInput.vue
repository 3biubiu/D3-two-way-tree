<template>
    <div class="unit-input" :style="{'width':width}">
        <Input  :placeholder="placeholder" v-model="newValue" clearable :number="true">
            <span slot="append">{{unit}}</span>
        </Input>
    </div>
</template>

<script>
export default {
    name:'unit-input',
    props:{
        value:{
            type:Number,
            default:null
        },
        placeholder:{
            type:String
        },
        unit:{
            type:String,
            default:''
        },
        width:{
            type:String,
            default:''
        }
    },
    data(){
        return{
           newValue:null 
        }
    },
    created() {
        this.newValue = this.value;        
    },
    watch: {
        value(newVal){
            let format = typeof newVal == 'number' ? Number(newVal) : null;
            
            this.newValue = format;
        },
        newValue(newVal){
            let format = typeof newVal == 'number' ? Number(newVal) : null;
            
            this.$emit('select-model',format)            
        }
    }
};
</script>

<style lang="less">
.unit-input{
    .ivu-input-group-append{
        width: 20%;
        background-color: #FFF;
        padding: 4px 7px;
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
    .ivu-input-icon {
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        text-align: center;
        color: #808695;
        position: absolute;
        right:20%;
        z-index: 3;
    }
}
</style>

