  
<template>

    <ve-histogram 
  :data="chartData" 
  :events="chartEvents"
  ></ve-histogram>
</template>

<script>
export default {
  props:['chartData'],
  data(){
    this.chartEvents = {
        click:  (e)=> {
          this.$emit('selectDate',e.name)
        }
      }
      return {}
  }
};
</script>

<style>
</style>