  
<template>
  <div>
    Http error
    <Histogram :chartData="chartData"></Histogram>
    <List header="资源请求失败列表" footer="Footer" border size="small">
      <ListItem v-for="item in httpErrorList">
        <ListItemMeta :title="item.type" :description="item.reason" />
        <template slot="action">
          <li>时间：{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}</li>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
import Histogram from "../component/Histogram.vue";
export default {
  components: {
    Histogram
  },
  data() {
    return {
      chartData: { columns: ["日期", "次数"], rows: [] },
      httpErrorList: []
    };
  },
  mounted: function() {
    this.$axios("/getCount/chart", {
      params: { type: "resource" }
    }).then(res => {
      let rows = [];
      for (let key in res.data) {
        rows.push({ 日期: key, 次数: res.data[key] });
      }
      this.chartData.rows = rows;
    });
    this.$axios("/getList", {
      params: { type: "resource" }
    }).then(res => {
      this.httpErrorList = res.data;
    });
  }
};
</script>

<style>
</style>