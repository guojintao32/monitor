  
<template>
  <div>
    Http error
    <ve-histogram :data="chartData"></ve-histogram>
    <List header="Header" footer="Footer" border size="small">
      <ListItem v-for="item in httpErrorList">
        <ListItemMeta
          :title='item.type'
          :description='item.reason'
        />
        <template slot="action">
          <li>
            时间：{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "次数"],
        rows: [{ 日期: "1/1", 次数: 1393 }]
      },
      httpErrorList: []
    };
  },
  mounted: function() {
    this.$axios("http://localhost:8081/getCount/chart", {
      params: { type: "resource" }
    }).then(res => {
      let rows = [];
      for (let key in res.data) {
        rows.push({ 日期: key, 次数: res.data[key] });
      }
      this.chartData.rows = rows;
    });
    this.$axios("http://localhost:8081/getList", {
      params: { type: "resource" }
    }).then(res => {
      this.httpErrorList = res.data;
    });
  }
};
</script>

<style>
</style>