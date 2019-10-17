  
<template>
  <div>
    <h2>js错误数量统计</h2>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "次数"],
        rows: [
          { 日期: "1/1", 次数: 1393 },
          { 日期: "1/2", 次数: 3530 },
          { 日期: "1/3", 次数: 2923 },
          { 日期: "1/4", 次数: 1723 },
          { 日期: "1/5", 次数: 3792 },
          { 日期: "1/6", 次数: 4593 }
        ]
      }
    };
  },
  mounted:function(){
    this.$axios('http://localhost:8081/getCount/chart',{params:{type:'js'}}).then(res=>{
      let rows = [];
      for(let key in res.data){
        rows.push({ 日期: key, 次数:res.data[key] })
      }
      this.chartData.rows=rows
    })
  }
};
</script>

<style>
</style>