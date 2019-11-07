<template>
  <div>
    <DatePicker
      type="datetimerange"
      placement="bottom-end"
      placeholder="请选择日期"
      style="width: 360px"
      :value="selectDateList"
      @on-change="handleChange"
    ></DatePicker>
    <List :header="listheader" footer="Footer" border size="small">
      <ListItem v-for="item in errorList" v-bind:key="item._id">
        <ListItemMeta :title="item.reason" />
        <template slot="action">
          <li>时间：{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}</li>
          <li @click='deleteItem(item._id)'>
            删除
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  props:['errorType','listheader'],
  data() {
    return {
      errorList: [],
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
      this.$axios("/getList", {
      params: { type: this.errorType,...params}
    }).then(res => {
      this.errorList = res.data;
    });
    },
    deleteItem(_id){
      this.$axios.post("/remove",{_id})
    }
  },
  mounted:function(){
    this.getErrorList();
  }
};
</script>
