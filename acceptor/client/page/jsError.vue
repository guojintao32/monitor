  
<template>
  <div>
    <h2>js错误数量统计</h2>
    <Histogram :chartData="chartData" @selectDate="selectDate"></Histogram>
    <List header="js报错列表" footer="Footer" border size="small">
      <ListItem v-for="item in jsErrorList">
        <ListItemMeta :title="item.reason" />
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
  components:{
    Histogram
  },
  data() {
    return {
      chartData: {columns: ["日期", "次数"],rows: []},
      jsErrorList: []
    };
  },
  methods:{
    selectDate(p){
      let startTime = this.$moment(p).startOf('day').valueOf();
      let endTime = this.$moment(p).endOf('day').valueOf();
      this.$axios("http://localhost:8081/getList", {
      params: { type: "js" ,startTime,endTime}
    }).then(res => {
      this.jsErrorList = res.data;
    });
    }
  },
  mounted: function() {
    this.$axios("http://localhost:8081/getCount/chart", {
      params: { type: "js" }
    }).then(res => {
      let rows = [];
      for (let key in res.data) {
        rows.push({ '日期': key, '次数': res.data[key] });
      }
      this.chartData.rows = rows;
    });
    this.$axios("http://localhost:8081/getList", {
      params: { type: "js" }
    }).then(res => {
      this.jsErrorList = res.data;
    });
  }
};
</script>

<style>
</style>