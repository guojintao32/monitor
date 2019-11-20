  
<template>
  <div>
    <Card style="width:100%">
      <p slot="title">
        <Icon type="ios-alert"></Icon>错误
      </p>
      <p>详情：{{reason}}</p>
    </Card>
    <Table :columns="columns1" :data="errorList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reason: unescape(location.href.split("_id=")[1].split("&")[0]),
      type: location.href.split("&type=")[1],
      columns1: [
        {
          title: "报错页面",
          key: "href"
        },
        {
          title: "报错时间",
          key: "time"
        },
        {
          title: "来自",
          key: "from"
        }
      ],
      errorList: []
    };
  },
  created() {
    if (this.type === "js") {
      this.columns1.push({
        title: "test",
        key: "no"
      });
    }
  },
  mounted() {
    this.$axios("/getDetail", {
      params: { reason: this.reason }
    }).then(res => {
      for (let item of res.data.body.list) {
        item.time = this.$moment(item.time).format("YYYY-MM-DD HH:mm:ss");
      }
      this.errorList = res.data.body.list;
    });
  }
};
</script>

<style>
</style>