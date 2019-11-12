  
<template>
    <div>
      <h1>错误详情</h1>
      
    </div>
</template>

<script>

export default{
    data(){
      return{}
    },
    mounted(){
      this.$axios("/getDetail", {
      params: { _id: location.href.split("_id=")[1] }
    }).then(res => {
      console.log(res.data)
    });
    }
  }
</script>

<style>
 
</style>