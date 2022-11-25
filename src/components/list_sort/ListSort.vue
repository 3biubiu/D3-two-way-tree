<template>
    <div class="sort-out-class" @click="sortClick">
        <span>{{ title }}</span>
        <div class="sort-class" >
            <i class="fa fa-caret-up sort-title" :style="upColor"></i>
            <i class="fa fa-caret-down sort-sort" :style="downColor"></i>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {//排序图标前的标题
            type: String,
            default: ''
        },
        name: {//一般为后端要求的排序字段的前缀
            type: String,
            default: ''
        },
    },
    data() {
        return {
            sort:'',//当前排序
        }
    },
    computed: {
        upColor() {
            return {color: this.sort == 'asc' ? "#1F6CDD" : "#bbbec4"}
        },
        downColor() {
            return {color: this.sort == 'desc' ? "#1F6CDD" : "#bbbec4"}
        },
    },
    methods: {
        //排序
        sortClick() {
            switch(this.sort){
                case '':
                    this.sort = 'asc';
                    break;
                case 'asc':
                    this.sort = 'desc';
                    break;
                case 'desc':
                    this.sort = '';
                    break;
            }
            let sortName = '';//排序
            sortName = this.sort != ''?this.name + this.sort:'';
            this.$emit('order-search', sortName)
        },
        /**
         * 重置排序
         */
        resetSort() {
            this.sort = '';
        }
    }
}
</script>


<style lang='less' scoped>
    .sort-out-class{
        display: inline-flex;
        flex-direction: row;
        cursor: pointer;
        align-items: center;
        span{
            font-weight: bold;
        }
    }
    .sort-class{
        display: flex;
        flex-direction: column;
        margin-left: 2px;
        justify-content: center;
        position: relative;
        top: 1px;
        margin-left: 5px;
    }
    .sort-title{
        height: 7px;
        width: 5px;
        margin-top: -10px;
    }
    .sort-sort{
        height: 7px;
        width: 5px
    }
</style>
