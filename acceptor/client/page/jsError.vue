  
<template>
  <div>
    <h2>js错误数量统计</h2>
    <Histogram :chartData="chartData" @selectDate="selectDate"></Histogram>
    <DatePicker
      type="datetimerange"
      placement="bottom-end"
      placeholder="Select date"
      style="width: 360px"
      :value="selectDateList"
      @on-change="handleChange"
    ></DatePicker>
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
      jsErrorList: [],
      selectDateList:[]
    };
  },
  methods:{
    handleChange(value,type){
      this.selectDateList = value;
      this.getErrorList({startTime:value[0]?this.$moment(value[0]).valueOf():"",endTime:value[1]?this.$moment(value[1]).valueOf():""});
    },
    selectDate(p){
      let startTime = this.$moment(p).startOf('day');
      let endTime = this.$moment(p).endOf('day');
      this.$set(this.selectDateList,0,startTime.format('YYYY-MM-DD HH:mm:ss'));
      this.$set(this.selectDateList,1,endTime.format('YYYY-MM-DD HH:mm:ss'));
      this.getErrorList({startTime:startTime.valueOf(),endTime:endTime.valueOf()});
    },
    getErrorList(params){
      this.$axios("http://localhost:8081/getList", {
      params: { type: "js" ,...params}
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
    this.getErrorList();
  }
};
</script>

<style>
</style>