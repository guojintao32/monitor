  
<template>
  <div>
    <Card style="width:100%">
      <p slot="title">
        <Icon type="ios-alert"></Icon>错误详情
      </p>
      <a href="#" slot="extra">
        <Icon type="ios-loop-strong"></Icon>Change
      </a>
      <p>时间：{{detail.time}}</p>
      <p>报错页面地址：{{detail.href}}</p>
      <p>错误类型：{{detail.type}}</p>
      <p>报错原因：{{detail.reason}}</p>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        time: "",
        href: "",
        type: "",
        reason: ""
      }
    };
  },
  mounted() {
    this.$axios("/getDetail", {
      params: { _id: location.href.split("_id=")[1] }
    }).then(res => {
      this.detail = res.data.body;
    });
  }
};
</script>

<style>
</style>