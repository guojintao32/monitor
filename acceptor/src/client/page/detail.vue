  
<template>
  <div>
    <Card style="width:100%">
      <p slot="title">
        <Icon type="ios-alert"></Icon>错误
      </p>
      <p>详情：{{reason}}</p>
    </Card>
    <Table :columns="columns1" :data="errorList">
      <template slot-scope="{ row}" slot="action">
          <Button type="primary" size="small" @click="detail(row)">查看详情</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reason: decodeURIComponent(location.href.split("_id=")[1].split("&")[0]),
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
          title: "来自捕获",
          key: "from"
        }
      ],
      errorList: []
    };
  },
  created() {
    console.log(this.type)
    if (this.type === "js") {
      this.columns1 = this.columns1.concat([
        {title: "报错文件",key: 'fileName'},
        {title:'行',key:'row'},
        {title:'列',key:'col'},
        {title:'操作',slot: 'action',width: 150,align: 'center'},]);
    }
    else if(this.type === 'resource'){
      this.columns1 = this.columns1.concat([
        {title: "报错标签",key: 'node'}]);
    }
    else{
      this.columns1 = this.columns1.concat([
        {title: "报错接口",key: 'url'},
        {title:'状态码',key:'status'}]);
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
  },
  methods:{
    detail(item){
      this.$axios("/getDetailFromSourceMap", {
      params: { fileName: item.fileName,row:item.row,col:item.col }
    }).then(res => {
      console.log(res)
    });
    }
  }
};
</script>

<style>
</style>