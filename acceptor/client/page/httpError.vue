  
<template>
  <div>
    Http error
    
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