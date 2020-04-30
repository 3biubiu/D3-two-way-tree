<template>
    <div :class="{'remark-container' : true , 'is-self' : remark.mySelf==='1'}" id="one-remark">
        <i v-if="(remark.isComment==='1' && remark.mySelf==='1')" class="reply-icon iconfont iconico_reply_right" title="由回复生成"></i>
        <div class="one-remark">
            <!--用来锚点定位的元素-->
            <div v-if="!isTop" :id="`item_detail_cloud_jump_${remark.id}`"></div>
            <div v-if="!isTop" :class="`item_detail_cloud_date_${remark.dateline}`"></div>
            <!--顶部-->
            <div class="top-part">
                <!--头像-->
                <div class="user-logo" @click="jumpUserInfo">
<!--                    <img v-if="remark.error" src="@/assets/mms_common/nologo.jpg"/>-->
<!--                    <img v-else :src="remark.logo" :onerror="remark.error=true"/>-->
                    <img :src="remark.logo" :onerror="`this.src='${require('@/assets/mms_common/nologo.jpg')}'`" />
                </div>
                <div class="user-info">
                    <!--右侧第一排-->
                    <div class="top-info">
                        <span class="user-name" @click="jumpUserInfo">{{remark.username}}</span>
                        <!--todo  把相关的方法补全 -->
                        <span v-if="remark.isLogin !== '1'" class="other-icon jinyong" title="禁止登录"><i class="iconfont iconjinyong"></i></span>
                        <span v-if="remark.isLeave ==='1'" class="other-icon iconlizhi" title="已离职"><i class="iconfont iconlizhi"></i></span>
                        <a v-if="remark.isCallPhone === '1'" @click="sendPhone" class="other-icon" title="打开APP直接拨打电话"><i class="iconfont iconicon_call"></i></a>
                        <a v-if="remark.isSendMsg === '1'" @click="sendSms" class="other-icon" title="发短信"><i class="iconfont iconicon_text"></i></a>
                        <a class="other-icon" title="@他" @click="fastAt(remark.username)"><i class="iconfont iconicon_"></i></a>
                        <a v-if="remark.isModify ==='1'" @click="editRemark" class="other-icon right" title="编辑"><i class="iconfont iconedit"></i></a>
                        <a v-if="remark.isDel === '1'" @click="deleteRemark" class="other-icon right" title="删除"><i class="iconfont iconshanchu"></i></a>
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  confirm
                            title="您确定要置顶此条备注吗？"
                            @on-ok="changeTop(true)"
                            v-if="remark.isTop ==='1'"
                            class="other-icon right custom-label">
                            <a title="置顶"><i class="iconfont icondingbu"></i></a>
                        </Poptip>
                        <Poptip :options="{modifiers: {computeStyle:{gpuAcceleration: false,},preventOverflow :{boundariesElement: 'window'}},eventsEnabled:false}"  confirm
                            title="您确定要取消置顶此条备注吗？"
                            @on-ok="changeTop(false)"
                            v-if="remark.isTop ==='2'"
                            class="other-icon right custom-label custom-cancle">
                            <a title="取消置顶"><i class="iconfont iconico_top1"></i></a>
                        </Poptip>
                        <span v-if="remark.isFrom ==='1'" class="other-icon right" title="PC端"><i class="iconfont iconico_pc"></i></span>
                        <span v-if="remark.isFrom ==='2'" class="other-icon right" title="Android客户端"><i class="iconfont iconico_Android"></i></span>
                        <span v-if="remark.isFrom ==='3'" class="other-icon right" title="ios客户端"><i class="iconfont iconico_apple"></i>&nbsp;</span>
                        <span class="other-icon time right">{{remark.dateline}}</span>
                        <Tooltip v-if="remark.effectiveFollow==='2'" content="有效跟进" placement="top" class="other-icon right success">
                            <i class="iconfont iconico_gj_yx"></i>
                        </Tooltip>
                    </div>
                    <!--右侧第二排-->
                    <div class="bottom-info">
                        <p class="group-name">{{remark.groupName}}</p>
                        <span v-if="remark.followIdentifyData && remark.followIdentifyData.length>0" class="info-identify">
                            跟进身份：<span class="identify-name" v-for="(item,index) in remark.followIdentifyData" :key="index" :title="item.name" @click="jumpIdentify(item)">{{item.name}}</span>
                        </span>
                    </div>
                </div>
                <!---->
                <div class="clear"></div>
            </div>
            <!--mot信息等-->
            <div class="mot-info" v-if="remark.itemMotName">
                <custom-label class="custom-label" v-if="remark.activeMotNodeName" :styles="labelStyle1" :label-content="remark.activeMotNodeName"></custom-label>
                <div class="mot-name">{{remark.itemMotName}}</div>
            </div>
            <!--备注部分内容-->
            <div class="remark-content" v-html="changeWarpToBr(remark.cloud)"></div>
            <!--回复部分内容-->
            <div class="comment-part" v-if="remark.commentList.length>0">
                <!--具体的回复-->
                <div class="one-comment" v-for="(comment,index) in remark.commentList" v-show="(showAllComment || index < 3)" :key="index">
                    <!--回复顶部-->
                    <div class="comment-info">
                        <span class="name">{{comment|fixCommentUser}}</span>
<!--                        回复-->
<!--                        <span class="name">刘美美</span>-->
                        <span class="time">{{comment.dateline}}</span>
                    </div>
                    <!--回复内容-->
                    <div class="comment-main">
                        <!--内容-->
                        <div class="content" v-html="changeWarpToBr(comment.comment)"></div>
                        <!--按钮-->
                        <div class="btn">
                            <a v-show="comment.newCloudId&&comment.newCloudId!='0'" @click="jumpComment(comment.newCloudId)">详情</a>
                            <a @click="changeReply(remark,index)">回复</a>
                        </div>
                    </div>
                </div>
                <!--展开更多回复-->
                <div class="more" v-if="(remark.commentList && remark.commentList.length > 3)">
                    <span v-if="!showAllComment">还有 {{remark.commentList ? remark.commentList.length - 3 : 0}} 条回复</span>
                    <a v-if="!showAllComment" class="toggle" @click="showAllComment = true">展开</a>
                    <a v-if="!!showAllComment" class="toggle" @click="showAllComment = false">收起</a>
                </div>
            </div>
            <!--备注底部-->
            <div class="bottom-info">
                <div class="remark-message">
                    <div class="base-info">
                        <span>{{remark.contactUsername}}<span v-if="remark.contactUsername">-</span>{{remark.contactTypeName}}</span> |
                        <span v-if="remark.nexttime">{{remark.nexttime}} 回访 |</span>
                        <span v-if="remark.statusName">{{remark.statusName}}</span>
                        <span v-if="remark.progressName"> | {{remark.progressName}}</span>
                    </div>
                    <div class="base-info" v-show="remark.isManualActive==='1'">
                        实际发生时间：{{remark.activeMotNodeTime}}
                    </div>
                    <div class="base-info" v-show="remark.reason">
                        回收原因：{{remark.reason}}
                    </div>
                    <!-- <div class="at-info">
                        <span class="one-at" v-for="(atUser,idx) in remark.atUserData" :key="idx">
                            <span>@{{atUser.sendAtUser}}</span> → <span class="at">@{{atUser.acceptAtUser}}</span>
                        </span>
                    </div> -->
                </div>
                <div class="reply-btn" @click="changeReply(remark)">
                    <Button size="small">回复</Button>
                </div>
            </div>
        </div>
        <i v-if="(remark.isComment==='1' && remark.mySelf!=='1')" class="reply-icon iconfont iconico_reply_left" title="由回复生成"></i>
    </div>
</template>

<script>
    import $api from "@/api/item/item_detail/index.js";
    import utils from "@/utils.js";
    import cookie from 'js-cookie';
    import config from "@/config.js";
    import CustomLabel from "@/components/common/custom_label/CustomLabel";
    //单条备注
    export default {
        name: "one-remark",
        components : {
            CustomLabel,
        },
        props : {
            //一条备注的内容
            remark : {
                type : Object,
                default : ()=>{return {}},
            },
            //是否是置顶区备注
            isTop : {
                type : Boolean,
                default : false
            },
            //项目|单位id
            id : {
                type : String,
                default : ""
            }
        },
        data (){
            return{
                labelStyle1 : {
                    textColor: '#1f6cdd',   //字体颜色
                    backgroundBg: '#E0ECFC',   //背景颜色,默认空为没有背景色
                    marginRight: '8', //右间距
                    marginBottom: '0',   //下间距
                    iconType: '', //图标在前(prev)还是在后(next),没有为空
                },
                //备注展开
                showAllComment : false,
            }
        },
        created() {
            this.showAllComment = false;
        },
        methods : {
            /**
             * 基于时间生成唯一key
             * @author zyz 2020-4-22 09:22:56
             * @param {String} str 字符串前缀
             * @return {String}
             */
            getUuid(str){
                let S4 = ()=>{
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return str + '-' + (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            },
            /**
             * 分发锚点调整回复对应备注事件
             * @author zyz 2020-4-22 09:22:56
             * @param {String} cloudId 对应备注id
             */
            jumpComment(cloudId){
                if(!cloudId){
                    return false;
                }
                this.$emit('jump-comment',cloudId);
            },
            /**
             * 分发快速点击@事件
             * @author zyz 2020-4-22 09:22:56
             */
            fastAt(username){
                this.$emit("fast-at",username);
            },
            /**
             * 点击回复备注部分做出相应改变
             * @param {String} remark 该条备注信息
             * @param {String} index 所点击回复备注的索引
             * @author zhouna & 2020-04-01 19:39:14
             */
            changeReply(remark,index){
                let reply = {
                    id:remark.id,
                    uid:[remark.uid],
                    username:remark.username
                }
                if(index!=undefined && remark.commentList[index].addUser != cookie.get('uid')){
                    //点击的是回复备注的回复按钮
                    reply.uid.push(remark.commentList[index].addUser);
                }else if(index!=undefined){
                    reply.username = remark.commentList[index].addUsername;
                }
                this.$emit("change-reply",reply);
            },
            /**
             * 改变备注的置顶状态
             * @author zyz 2020-4-22 09:22:56
             * @param {Boolean} status 制定状态true置顶操作false取消置顶
             */
            changeTop(status){
                this.$emit("change-top",this.remark.id,status);
            },
            /**
             * 删除备注操作
             * @author zyz 2020-4-22 09:22:56
             */
            deleteRemark(){
                this.$emit("delete-one",this.remark.id);
            },
            /**
             * 修改备注
             * @author zyz 2020-4-22 09:22:56
             */
            editRemark(){
                this.$emit("edit-one",this.remark.id,this.remark.cloud,this.remark.attArr);
            },
            /**
             * 快速打电话
             * @author zyz 2020-4-22 09:22:56
             */
            async sendPhone(){
                if(!this.remark.phone){
                    return false;
                }
                let res = await $api.sendPhone({"phone":this.remark.phone});
                if(res.code == 200){
                    utils.notice(res.msg,'success')
                }else {
                    utils.notice(res.msg,'error')
                }
            },
            /**
             * 发短信
             * @author zyz 2020-4-22 09:22:56
             */
            sendSms(){
                if(!this.remark.phone){
                    return false;
                }
                this.$emit("send-sms",this.remark.phone);
            },
            /**
            * 点击载体跳转
            * @param {string} item 所点击载体数据
            * @author zhouna & 2020-04-15 17:05:30
            */
            jumpIdentify(item){
                let href = '';
                switch(parseInt(item.type)){
                    case 2:
                        //载体
                        href = config.mmsHost +'/Carrier/carrierView/index_id/'+item.id+".html";
                        break;
                    case 3:
                        //单位
                        href = config.mmsHost +'/Companies/companyView/id/'+item.id+".html";
                        break;
                }
                window.open(href, '_blank');
            },
            /**
             * 跳转对应的用户详细信息页面
             * @author zyz 2020-4-22 09:22:56
             */
            jumpUserInfo(){
                let uid = this.remark.uid;
                if(!uid){
                    return false;
                }
                let url = config.mmsHost + '/HR/index/manage/'+uid+'.html';
                window.open(url);
            },
            /**
             * 处理备注和回复换行操作
             * @author zhouna & 2020-04-26 14:44:04
             * @param {String} text 此条回复、备注的内容
             */
            changeWarpToBr(text){
                return utils.changeWarpToBr(text,"2")
            },
        },
        filters : {
            /**
             * 处理回复中的用户名格式
             * @author zyz 2020-4-22 09:22:56
             * @param {Object} comment 此条回复的内容
             */
            fixCommentUser(comment){
                let uid = cookie.get("uid");
                return (comment.uid === uid) ? "我" : comment.addUsername;
            }
        }
    }
</script>

<style lang="less" scoped>
@import "one_remark.less";
</style>
