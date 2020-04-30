<template>
  <Modal v-model="modal1" :title="title" :mask-closable="false" :scrollable=true @on-ok="ok" @on-cancel="cancel" width="685">
    <template>
      <Transfer :data="data" :target-keys="targetKeys" :list-style="listStyle" :titles="titles" :render-format="render3" :operations="['移除','添加']" filterable @on-change="handleChange3">
      </Transfer>
    </template>
  </Modal>
</template>
<script>
import $http from '@/resource'
export default {
  name: 'mutiple-choose',
  props: {
    openstatus: false,
    init: {}
  },
  data() {
    return {
      title: '',
      /*数据源 */
      modal1: false,
      data: [],
      /**已选key */
      targetKeys: [],
      listStyle: {
        width: '250px',
        height: '300px'
      },
      /** 设置左侧，右侧全选按钮旁的文案 */
      titles: ['来源', '已选']
    }
  },
  methods: {
    ok() {
      this.$emit('backData', this.init, this.data, this.targetKeys)
    },
    cancel() {},
    handleChange3(newTargetKeys) {
      this.targetKeys = newTargetKeys
    },
    render3(item) {
      return item.label
    }
  },
  mounted: function() {

  },
  watch: {
    openstatus() {
      this.modal1 = true
      this.title = this.init.title
      this.titles = [this.init.sourceTitle, this.init.targetTitle]
      /** dataFromType 指定数据来源于哪里 ，field 来源data字段，back为axios获取，注意获取的格式 */
      if (this.init.dataFromType == 'field') {
        this.data = this.init.data
        this.targetKeys = this.init.targetKeys
      } else {
        let _this = this
        if (this.init.method == 'get') {
          $http.get(this.init.sourceUrl).then(res => {
            if (res.code == 200) {
              _this.data = res.list
              _this.targetKeys = _this.init.targetKeys

            } else {
              this.$Notice.error({
                title: '网络异常',
                desc: '获取列表信息失败，请刷新重试！',
                duration: 5
              })
            }
          })
        } else {
          $http.post(this.init.sourceUrl).then(res => {
            if (res.code == 200) {
              _this.data = res.list
              _this.targetKeys = _this.init.targetKeys
            } else {
              this.$Notice.error({
                title: '网络异常',
                desc: '获取列表信息失败，请刷新重试！',
                duration: 5
              })
            }
          })
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>



</style>