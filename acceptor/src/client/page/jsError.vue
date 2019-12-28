  
<template>
  <div>
    <h2>js错误数量统计</h2>
    <Histogram :chartData="chartData" @selectDate="selectDate"></Histogram>
    <IncorrectList errorType="js" ref="childList"
    listheader='js报错列表'/>
  </div>
</template>

<script>
import Histogram from "../component/Histogram.vue";
import IncorrectList from '../component/IncorrectList.vue';
export default {
  components:{
    Histogram,IncorrectList
  },
  data() {
    return {
      chartData: {columns: ["日期", "次数"],rows: []}
    };
  },
  methods:{
    selectDate(p){
      this.$refs.childList.selectDate(p)
    },
  },
  mounted: function() {
    this.$axios("/getCount/chart", {
      params: { type: "js" }
    }).then(res => {
      let rows = [];
      for (let key in res.data) {
        rows.push({ '日期': key, '次数': res.data[key] });
      }
      this.chartData.rows = rows;
    });
  }
};
</script>

<style>
</style>