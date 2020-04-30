<!-- 上传时的附件相机弹窗 -->
<!-- callBackSelected 事件 -->
<template>
    <Modal
        width="800"
        v-model="showCameraModal"
        :mask-closable="false">
            <div slot="header">
                <div class="modal-header">
                    <h4 class="modal-title">附件相机<span class="fa fa-refresh" @click="refresh"></span>
                        <span class="tip">Tips:请打开APP，点击首页右上角‘+’下面的附件相机进行上传</span>
                    </h4>
                </div>
            </div>
            <Row>
                <Col span="20">
                    <div :id="'scroll-container'+_uid" class="scroll-container">
                        <div class="date-line" v-for="(data, index) in cameras" :key="index" :data-time="data.dateline.substring(0 , data.dateline.length-3)">
                            <label>{{data.dateline}}</label>
                            <div class="pull-right">
                                <Checkbox size="large" :value="data.checkAll" v-model="data.checkAll" @on-change="checkAllChange(index)">全选</Checkbox>
                            </div>
                            <CheckboxGroup v-model="checkedImg">
                                <viewer :images="data.img">
                                <Row>
                                    <Col span="4" v-for="(pic, kk) in data.img" :key="kk">
                                        <div class="container">
                                            <img class="photo-box" :src="pic.url" />
                                            <Checkbox class="check" size="large" :label="pic.id">&nbsp;</Checkbox>
                                        </div>
                                    </Col>
                                </Row>
                                </viewer>
                            </CheckboxGroup>
                        </div>
                    </div>
                </Col>
                <Col span="4">
                    <div class="timeline">
                        <ul class="year">
                            <li v-for="(year, index) in timeline" :class="{'active':timeline_active.year==year.year}" @click="setActiveTime('year' , year.year)">
                                <div class="year-button" :data-scroll="year.year"> {{year.year}} </div>
                                <ul class="month">
                                    <li v-for="month in year.months" :class="{'active':timeline_active.month==month}" @click.stop="setActiveTime('month' , month)">
                                        <a :data-scroll="year.year + '-' + month">{{parseInt(month)}}月</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="text" @click="showCameraModal=false">取消</Button>
                <Button type="primary" @click="confirming">确定</Button>
            </div>
    </Modal>
</template>

<script>
import $api from "@/api/plugin/plugin";
import $ from 'jquery';

export default {
    data() {
        return {
            allCameras: [],//所有的资源
            cameras: [],//展示的资源
            checkedImg: [],//选中图片id
            timeline: [], //时间轴
            timeline_active: {},//选中的
            showCameraModal: false,
            loading: false,
        }
    },
    watch: {
        showCameraModal(newVal){
            if(newVal == true){
                this.refresh();
            }
        }
    },
    methods: {
        //获取图片
        getCameraAttachment(){
            $api.cameraAttachment().then( data => {
                for (let i = 0; i < data.length; i++) {
                    data[i].checkAll = false;
                }
                this.allCameras = data;
                this.loadImg();
                this.fixTimeLine();
                this.$nextTick(()=>{
                    this.autoLoad();
                })
            });
        },
        //全选
        checkAllChange(index){
            let aboutImgs = this.cameras[index].img;
            let findex;
            if(this.cameras[index].checkAll === true){
                for (let i = 0; i < aboutImgs.length; i++) {
                    findex = this.checkedImg.indexOf(aboutImgs[i].id);
                    if(findex == -1){
                        this.checkedImg.push(aboutImgs[i].id);
                    }
                }
            }else{
                for (let i = 0; i < aboutImgs.length; i++) {
                    findex = this.checkedImg.indexOf(aboutImgs[i].id);
                    if(findex > -1){
                        this.$delete(this.checkedImg, findex);
                    }
                }
            }
        },
        //懒加载
        loadImg(){
            let count = 0;
            for (let i = 0; i < this.allCameras.length;) {
                count += 1;
                if(count > 2){
                    break;
                }
                let newObj = Object.assign({}, this.allCameras[i]);
                this.cameras.push(newObj);
                this.$delete(this.allCameras, i);
            }
        },
        //时间轴计算
        fixTimeLine() {
            let indexCache = {};
            let timeline = [];
            for (let i = 0; i < this.cameras.length; i++) {
                let dateArr = this.cameras[i].dateline.split('-');
                if(indexCache[dateArr[0]] === undefined){
                    timeline.push({
                        year: dateArr[0],
                        months: [dateArr[1]]
                    });
                    indexCache[dateArr[0]] = timeline.length - 1;
                }else{
                    if(timeline[indexCache[dateArr[0]]].months.indexOf(dateArr[1]) == -1){
                        timeline[indexCache[dateArr[0]]].months.push(dateArr[1]);
                    }
                }
            }
            this.timeline = timeline;
            if (this.timeline.length > 0 && !this.timeline_active.hasOwnProperty('year')) {
                this.timeline_active = {
                    year: timeline[0].year,
                    month: timeline[0].months[0]
                };
            }
        },
        //点击右侧时间线的事件
        setActiveTime: function(key, value) {
            this.timeline_active[key] = value;
            var scrollTo = 0;
            if (key == 'month') {
                scrollTo = this.timeline_active.year + '-' + value;
            } else {
                for (var i in this.timeline) {
                    if (this.timeline[i].year == value) {
                        this.timeline_active['month'] = this.timeline[i].months[0];
                        scrollTo = value + '-' + this.timeline[i].months[0];
                        break;
                    } else {
                        scrollTo = value;
                    }
                }
            }

            let h = 0;
            let ele = this.$el.querySelectorAll('.date-line');
            for(let i = 0; i < ele.length; i++){
                if(ele[i].getAttribute("data-time") == scrollTo){
                    break;
                }
                h += ele[i].offsetHeight;
            }

            $(".scroll-container").animate({
                scrollTop: h - 80
            }, 300);

        },
        //确定
        confirming(){
            this.$emit("callBackSelected", this.checkedImg);
            this.showModal(false);
        },
        //刷新
        refresh(){
            this.cameras = [];
            this.checkedImg = [];
            this.getCameraAttachment();
            this.fixTimeLine();
        },
        //显示与不显示
        showModal(show = false){
            this.showCameraModal = show;
        },
        /**
         * 自动决定要不要执行lazy-load
         */
        autoLoad(){
            this.$nextTick(()=>{
                const el = document.querySelector('#scroll-container'+this._uid);
                const offsetHeight = 300;
                const scrollTop = el.scrollTop;
                const scrollHeight = el.scrollHeight;
                if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                    this.loadImg();
                    this.fixTimeLine();
                    this.loading = true;
                }
            });


        }
    },
    mounted() {
        let _self = this;
        this.$nextTick(() => {
            const el = document.querySelector('#scroll-container'+_self._uid);
            // const offsetHeight = el.offsetHeight;
            const offsetHeight = 300;
            el.onscroll = function(data){
                const scrollTop = el.scrollTop;
                const scrollHeight = el.scrollHeight;
                if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                    _self.loadImg();
                    _self.fixTimeLine();
                    _self.loading = true;
                }
            };
        });
    }
};
</script>

<style scoped>
@import './file_camera.less';
</style>