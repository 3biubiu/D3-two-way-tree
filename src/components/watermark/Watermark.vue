<template>
    <div class="watermark" :style="{'background':'url('+img+') left top repeat'}"></div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    // name:'water-mark',
    data(){
        return{
            name:Cookies.get('username')?Cookies.get('username'):'',
            img:localStorage.getItem('nameImg'+Cookies.get('uid'))
        }
    },
    mounted(){
        if(!this.img){
            this.againImg(this.name);
        }
    },
    methods:{
        /**
         * 没有存上图的情况
         * @param {string} name 生成的名字
         */
        againImg(name){
            if(!this.img && name){
                this.setWatermark(name)
                this.img = localStorage.getItem('nameImg'+Cookies.get('uid'));
            }
        },
        /**
         * 生成背景图
         * @param {string} str 生成的名字
         */
        setWatermark(str){
            //创建一个画布
            let can = document.createElement('canvas');
            //设置画布的长宽
            can.width = 600+str.length*16;
            can.height = str.length*16*20 * Math.PI / 180+400;

            let cans = can.getContext('2d');
            //旋转角度
            cans.rotate(-20 * Math.PI / 180);
            cans.font = '16px Vedana';
            //设置填充绘画的颜色、渐变或者模式
            cans.fillStyle = 'rgba(200, 200, 200, 0.40)';
            //设置文本内容的当前对齐方式
            cans.textAlign = 'left';
            //设置在绘制文本时使用的当前文本基线
            cans.textBaseline = 'Middle';
            //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
            cans.fillText(str, can.width / 16, can.height / 4);
            cans.fillText(str, can.width/2-can.width / 16, 7*can.height / 8);
            localStorage.setItem('nameImg'+Cookies.get('uid'),can.toDataURL('image/png'))
        }
    }

}
</script>
<style scoped lang='less'>
    .watermark{
        width: 100%;
        height: calc(~"100% - 36px");
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 99;
    }
</style>
