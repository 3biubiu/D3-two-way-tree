<template>
    <div class="menu-content">
        <div class="menu-content-left">
            <p class="menu-group-title"><span></span>人才中心</p>
            <i-menu :theme="theme2" class="menu-group-list" width="auto" :open-names="['1']" accordion>
                <Submenu name="1">
                    <template slot="title">
                        <i class="fa fa-user icon-fa"></i>
                        <span>个人中心</span>
                        <i class="fa fa-chevron-circle-right drop-icon"></i>
                    </template>
                    <Menu-Item name="1-1" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-id-card"></i>
                            <span>个人信息</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-2" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-th-list"></i>
                            <span>员工名录</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-3" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>党员墙</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-4" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>董事会</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-5" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>总经办</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-6" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>问题会</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-7" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>四大门派</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-8" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>精英堂</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-9" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>月度之星</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="1-10" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-flag"></i>
                            <span>认证讲师</span>
                        </a>
                    </Menu-Item>

                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <i class="fa fa-user icon-fa"></i>
                        <span>人事审批</span>
                        <i class="fa fa-chevron-circle-right drop-icon"></i>
                    </template>
                    <Menu-Item name="2-1" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-id-card"></i>
                            <span>转正</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="2-2" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-id-card"></i>
                            <span>入职</span>
                        </a>
                    </Menu-Item>
                    <Menu-Item name="2-3" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-id-card"></i>
                            <span>调级</span>
                        </a>
                    </Menu-Item>
                     <Menu-Item name="2-4" class="second-menu" style="padding-left:56px">
                        <a href="#">
                            <i  class="fa fa fa-id-card"></i>
                            <span>离职</span>
                        </a>
                    </Menu-Item>
                </Submenu>
                
            </i-menu>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            theme2: 'primary'

        }
    }
}
</script>
<style lang='less' scoped>
@import './slide_bar.less';
</style>
