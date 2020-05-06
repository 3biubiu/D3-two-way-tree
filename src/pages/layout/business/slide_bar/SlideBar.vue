<template>
    <div class="menu-content">
        <div class="menu-content-left">
            <p class="menu-group-title">首页</p>
            <i-menu :theme="theme2" class="menu-group-list" width="auto" :open-names="['1']" accordion>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper sceond-icon" />
                        内容管理
                    </template>
                    <Menu-Item name="1-1" class="second-menu" style="padding-left:56px">
                        <Icon type="ios-paper sceond-icon" />
                        文章管理
                    </Menu-Item>
                    <Menu-Item name="1-2" class="second-menu" style="padding-left:56px">
                        <Icon type="ios-paper sceond-icon" />
                        评论管理
                    </Menu-Item>
                    <Menu-Item name="1-3" class="second-menu" style="padding-left:56px">
                        <Icon type="ios-paper sceond-icon" />
                        举报管理
                    </Menu-Item>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people  sceond-icon" />
                        用户管理
                    </template>
                    <Menu-Item name="2-1" class="second-menu" style="padding-left:56px">
                        <Icon type="ios-paper sceond-icon" />
                        新增用户
                    </Menu-Item>
                    <Menu-Item name="2-2" class="second-menu" style="padding-left:56px">
                         <Icon type="ios-paper sceond-icon" />
                        活跃用户
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
