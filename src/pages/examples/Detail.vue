<template>
    <div class="detail">
        <div class="header">
            <p class="detail-title">压力测试</p>
        <div>
            <p class="add-user">用户编号：3250406</p>
            <p class="add-user">录入人：李文杰献6</p>
            <p class="add-user">录入时间：2020-12-09 17:00</p>
        </div>
      <!-- <tags>
        <tags-item>
          <template slot="tags-item">
            <span>编辑</span>
          </template>
        </tags-item>
        <tags-item>
          <template slot="tags-item">
            <span>二维码</span>
          </template>
        </tags-item>
        <tags-item>
          <template slot="tags-item">
            <span>编辑</span>
          </template>
        </tags-item>
        <tags-item>
          <template slot="tags-item">
            <span>编辑</span>
          </template>
        </tags-item>
      </tags> -->
        </div>
        <div class="basic-info">
        <line-title class="line-title" title="载体基本信息"></line-title>
        <tables class="basic-table">
            <template slot="tbody">
                <tr>
                    <td class="table-title">等级载体</td>
                    <td class="table-content">★</td>
                    <td class="table-title">签约载体</td>
                    <td class="table-content">否</td>
                </tr>
            </template>
            <template slot="tbody">
                <tr>
                    <td class="table-title">地区</td>
                    <td class="table-content">天津</td>
                    <td class="table-title">地址</td>
                    <td class="table-content">天津市西青区</td>
                </tr>
            </template>
            <template slot="tbody">
                <tr>
                    <td class="table-title">载体状态</td>
                    <td class="table-content">待租</td>
                    <td class="table-title">意向</td>
                    <td class="table-content">出租</td>
                </tr>
            </template>
            <template slot="tbody">
                <tr>
                    <td class="table-title">载体状态</td>
                    <td class="table-content">待租</td>
                    <td class="table-title">意向</td>
                    <td class="table-content">出租</td>
                </tr>
            </template>
      </tables>
        </div>
        <div class="session">
        <Tabs value="name1">
            <TabPane label="关联通话" name="name1">
                <tables class="table-session">
                    <template slot="thead">
                        <tr>
                            <th>编号</th>
                            <th>编号</th>
                            <th>主叫号码</th>
                            <th>编号</th>
                            <th>编号</th>
                            <th>编号</th>
                            <th>通话时间</th>
                            <th>通话时间</th>
                        </tr>
                    </template>
                    <template slot="tbody">
                        <tr>
                            <td>2000225</td>
                            <td>2020-10-10 15:30</td>
                            <td>123456789</td>
                            <td>123456789编号编号编号</td>
                            <td>1111111111111111111111111</td>
                            <td>编号</td>
                            <td>555</td>
                            <td>通话时间通话时间</td>
                        </tr>
                    </template>
                    <template slot="tbody">
                        <tr>
                            <td>2000225</td>
                            <td>2020-10-10 15:30</td>
                            <td>123456789</td>
                            <td>123456789编号编号编号</td>
                            <td>1111111111111111111111111</td>
                            <td>编号</td>
                            <td>555</td>
                            <td>通话时间通话时间</td>
                        </tr>
                    </template>
                    <template slot="tbody">
                        <tr>
                            <td>2000225</td>
                            <td>2020-10-10 15:30</td>
                            <td>123456789</td>
                            <td>123456789编号编号编号</td>
                            <td>1111111111111111111111111</td>
                            <td>编号</td>
                            <td>555</td>
                            <td>通话时间通话时间</td>
                        </tr>
                    </template>
                    <template slot="tbody">
                        <tr>
                            <td>2000225</td>
                            <td>2020-10-10 15:30</td>
                            <td>123456789</td>
                            <td>123456789编号编号编号</td>
                            <td>1111111111111111111111111</td>
                            <td>编号</td>
                            <td>555</td>
                            <td>通话时间通话时间</td>
                        </tr>
                    </template>
                </tables>
        </TabPane>
        <TabPane label="关联会话" name="name2">标签二的内容</TabPane>
      </Tabs>
        </div>
        <div class="carrier-pic">
        <line-title class="line-title" title="载体图片"></line-title>
        <div class="pic-img">
            <img src="../../assets/mms_common/head_message.jpg" alt="">
            <img src="../../assets/mms_common/head_message.jpg" alt="">
            <img src="../../assets/mms_common/head_message.jpg" alt="">
            <img src="../../assets/mms_common/head_message.jpg" alt="">
            <img src="../../assets/mms_common/head_message.jpg" alt="">
        </div>
        </div>
        <div class="prove">
            <line-title class="line-title" title="产权证明"></line-title>
            <img src="../../assets/mms_common/empty.png" alt="">
            <p>暂无产权证明</p>
        </div>
        <div class="project">
            <line-title class="line-title" title="系统自动匹配项目"></line-title> 
            <!-- <tables class="table-project">
                        <template slot="thead">
                            <tr>
                                <th>编号</th>
                                <th>标题</th>
                                <th>录入人</th>
                                <th>录入时间</th>
                                <th>地区</th>
                                <th>面积需求</th>
                                <th>占地面积</th>
                            </tr>
                        </template>
                        <template slot="tbody">
                            <tr>
                                <td>2000225</td>
                                <td>2020-10-10 15:30</td>
                                <td>123456789</td>
                                <td>123456789编号编号编号</td>
                                <td>1111111111111111111111111</td>
                                <td>编号</td>
                                <td>555</td>
                            </tr>
                        </template>
                        <template slot="tbody">
                            <tr>
                                <td>2000225</td>
                                <td>2020-10-10 15:30</td>
                                <td>123456789</td>
                                <td>123456789编号编号编号</td>
                                <td>1111111111111111111111111</td>
                                <td>编号</td>
                                <td>555</td>
                            </tr>
                        </template>
                        <template slot="tbody">
                            <tr>
                                <td>2000225</td>
                                <td>2020-10-10 15:30</td>
                                <td>123456789</td>
                                <td>123456789编号编号编号</td>
                                <td>1111111111111111111111111</td>
                                <td>编号</td>
                                <td>555</td>
                            </tr>
                        </template>
                        <template slot="tbody">
                            <tr>
                                <td>2000225</td>
                                <td>2020-10-10 15:30</td>
                                <td>123456789</td>
                                <td>123456789编号编号编号</td>
                                <td>1111111111111111111111111</td>
                                <td>编号</td>
                                <td>555</td>
                            </tr>
                        </template>
            </tables> -->
            <Page :total="100" show-total show-sizer show-elevator class="pages"/>
        </div>
        <div class="select">
            <line-title class="line-title" title="标签"></line-title>
            <options title="千人计划" textColor="#1ebea0" borColor="#68d9be" bgColor="#f0fffa"></options>
            <options title="千人计划" textColor="#1f6cdd" borColor="#72b0f7" bgColor="#f0f8ff"></options>
            <options title="千人计划" textColor="#f25041" borColor="#ffa696" bgColor="#fff4f0"></options>
            <options title="千人计划" textColor="#f25041" borColor="#ffa696" bgColor="#fff4f0"></options>
            <options title="孵化器" textColor="#ff9900" borColor="#ffc552" bgColor="#fff9e6"></options>
        </div>
        <div class="remarks">
            <line-title class="line-title" title="载体备注"></line-title>
            <h1 class="remarks-title">项目状态</h1>
            <RadioGroup class="radio-list">
                <Radio label="重点"></Radio>
                <Radio label="接洽中"></Radio>
                <Radio label="暂缓"></Radio>
                <Radio label="成功"></Radio>
                <Radio label="回收"></Radio>
            </RadioGroup>
            <h1 class="remarks-title">联系对象</h1>
            <Select v-model="model1" style="width:280px;" class="select-box">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <h1 class="remarks-title">联系对象</h1>
            <Select v-model="model1" style="width:280px;" class="select-box">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <h1 class="remarks-title">回访时间</h1>
            <RadioGroup class="radio-list">
                <Radio label="半月"></Radio>
                <Radio label="一个月"></Radio>
                <Radio label="三个月"></Radio>
                <Radio label="半年"></Radio>
            </RadioGroup>
            <div>
                <Select v-model="model1" style="width:280px;" class="select-box">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </div>
            <h1 class="remarks-title">项目进度</h1>
            <RadioGroup class="radio-list">
                <Radio label="●"></Radio>
                <Radio label="●●"></Radio>
                <Radio label="●●●"></Radio>
                <Radio label="●●●●"></Radio>
                <Radio label="●●●●●"></Radio>
            </RadioGroup>
            <div>
                <Checkbox label="显示由回复生成的备注">显示由回复生成的备注</Checkbox>
                <Checkbox>显示手动激活MOT的备注</Checkbox>
                <label class="active filter" @click="toggleStatus=!toggleStatus">高级筛选
                    <i v-if="toggleStatus" class="iconfont iconshang"></i>
                    <i v-else class="iconfont iconxia"></i>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
// import Tags from "../../components/tags/Tags.vue";
// import TagsItem from "../../components/tags/TagsItem.vue";
import LineTitle from "../../components/common/line_title/LineTitle.vue";
import Options from "../../components/options/Options"
export default {
    name: "detail",
    components: {
        // Tags,
        // TagsItem,
        LineTitle,
        Options,
    },
    data() {
        return {
            model1:'',
            cityList:[],
            toggleStatus:false,
        };
    },
    computed: {},
    watch: {},
    filters: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less">
.header {
    background: #fff;
    padding: 17px 0 20px 24px;
}
// .detail{
//     font-size:0;
// }
.detail-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #333;
    line-height: 26px;
    font-weight: 700;
}
.add-user{
    display: inline-block;
    font-size: 14px;
    color: #999;
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    line-height: 20px;
    margin-top:18px;
}
.basic-info {
    margin: 16px 0px;
    background: #fff;
}
.basic-table {
    color: #666;
    font-size: 14px;
    padding: 0 24px 16px 24px;

}
.basic-table tbody tr {
    display: table-row !important;
}
.basic-table tbody tr td {
    display: table-cell !important;
    vertical-align: middle;
    font-size: 14px;
    line-height: 20px;
    padding: 8px 10px;
    height: 20px !important;
    white-space: nowrap !important;
}
.basic-table tbody tr td.table-title {
    color: #999;
    width: 100px;
    text-align: right !important;
}
.basic-table tbody tr td.table-content {
    text-align: left !important;
}
.table-session{
    margin-top: -17px;
}
.table-session th{
    line-height: 48px;
    text-align: left !important;
    font-weight:bold;
    color:#333;
    padding-left:16px;
}
.table-session td{
    line-height: 48px;
    text-align: left !important;
    padding-left:16px;
    background: #fff;
}
.carrier-pic{
    width: 1112px;
    background: #fff;
    display: inline-block;
    padding-bottom:30px;
    vertical-align: middle;
    margin-right:16px;
}
.pic-img{
    font-size: 0;
    padding-left:24px;
}
.pic-img img{
    width: 90px;
    height: 90px;
    margin-right:10px;
}
.prove{
    width: 519px;
    display: inline-block;
    background:#fff;
    height: 176px;
    vertical-align: middle;
}
.prove img{
    display: block;
    width: 50px;
    height: 50px;
    margin:0 auto;
    
}
.prove p{
    color:#ccc;
    font-size:14px;
    text-align: center;
}
.project{
    background:#fff;
    margin: 16px 0;
    padding-bottom:20px;
}
.table-project{
    padding: 0 24px 16px 24px;
}
.table-project th{
    line-height: 48px;
    text-align: left !important;
    padding-left: 16px;
    font-weight:bold;
    color:#333;
}
.table-project td{
    line-height: 48px;
    text-align: left !important;
    padding-left: 16px;
    vertical-align: middle;
    word-break: break-all;
    background:#fff;
    word-break: break-word;
}
.pages{
    text-align: right;
    padding-right:24px;
}
.select{
    font-size:0;
    background:#fff;
    padding-bottom: 20px;
}
.select-box{
    margin-left:24px;
    margin-bottom:20px;
}
.remarks{
    background:#fff;

}
.radio-list{
    padding-left:24px;
    padding-bottom: 20px;
}
.remarks-title{
    color:#333;
    font-size:14px;
    font-weight:bold;
    padding-left:24px;
    line-height: 20px;
    margin-bottom:5px;
}

</style>