  
<template>
  <div>
    <h2>性能监控</h2>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>

export default {
  components:{
   
  },
  data() {
    return {
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': 1, '访问用户': 1393, },
            { '日期': 2, '访问用户': 3530,  },
            { '日期': 3, '访问用户': 2923,  },
            { '日期': 8, '访问用户': 1723, },
            { '日期': 5, '访问用户': 3792,  },
            { '日期': 6, '访问用户': 4593,  },
             { '日期': 6, '访问用户': 4593,  }
          ]
        }
      }
  },
  methods:{
    selectDate(p){
      this.$refs.childList.selectDate(p)
    },
  },
  mounted: function() {
    
  }
};
</script>

<style>
</style>