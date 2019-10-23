  
<template>
  <div>
    <h2>js错误数量统计</h2>
    <ve-histogram :data="chartData"></ve-histogram>
    <List header="Header" footer="Footer" border size="small">
            <ListItem v-for="item in jsErrorList">
              {{item.reason}}
              <span style="margin-left:10px">
              时间：{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}
              </span>
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
        rows: [
          { 日期: "1/1", 次数: 1393 },
          { 日期: "1/2", 次数: 3530 },
          { 日期: "1/3", 次数: 2923 }
        ]
      },
      jsErrorList:[]
    };
  },
  mounted:function(){
    this.$axios('http://localhost:8081/getCount/chart',{params:{type:'js'}}).then(res=>{
      let rows = [];
      for(let key in res.data){
        rows.push({ 日期: key, 次数:res.data[key] })
      }
      this.chartData.rows=rows
    });
    this.$axios('http://localhost:8081/getList',{params:{type:'js'}}).then(res=>{
      this.jsErrorList = res.data;
    })
  }
};
</script>

<style>
</style>