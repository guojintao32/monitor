  
<template>
  <div>
    <h2>性能监控</h2>
    <Select style="width:200px" @on-change='selectPerfor'>
        <Option v-for="item in perforOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      chartData: {
        columns: ["日期", "时间"],
        rows: [
          { 日期: 1, 时间: 1393 },
          { 日期: 2, 时间: 3530 },
          { 日期: 3, 时间: 2923 },
          { 日期: 8, 时间: 1723 },
          { 日期: 5, 时间: 3792 },
          { 日期: 6, 时间: 4593 },
          { 日期: 6, 时间: 4593 }
        ]
      },
      perforOptions: [
        {
          value: "redirectTime",
          label: "重定向时间"
        }, {
          value: "dnsTime",
          label: "dns 查询耗时"
        }, {
          value: "ttfbTime",
          label: "读取页面第一个字节的时间"
        }, {
          value: "appcacheTime",
          label: "DNS 缓存时间"
        }, {
          value: "unloadTime",
          label: "卸载页面的时间"
        }, {
          value: "tcpTime",
          label: "tcp 连接耗时"
        }, {
          value: "reqTime",
          label: "request 请求耗时"
        }, {
          value: "analysisTime",
          label: "解析 dom 树耗时"
        }, {
          value: "blankTime",
          label: "白屏时间 "
        },
      ],
    };
  },
  methods: {
    selectDate(p) {
      this.$refs.childList.selectDate(p);
    },
    selectPerfor(value){
      this.$axios("/performance/getCol", {
      params: { col: value }
    }).then(res => {
      this.chartData.rows=res.data.map((item,index)=>{
        return { 日期: index, 时间: item[value] }
      });
    });
    }
  },
  mounted: function() {

  }
};
</script>

<style>
</style>