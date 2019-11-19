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
    <List :header="listheader" border size="small">
      <ListItem v-for="item in errorList" v-bind:key="item._id">
        <ListItemMeta :title="item._id" />
        <template slot="action">
          <li>次数：{{item.times}}</li>
          <li>最近：{{$moment(item.last_time).format('YYYY-MM-DD HH:mm:ss')}}</li>
          <li>
            <a :href="'/errorDetail?_id='+item._id" target="_blank">详情 ></a>
          </li>
        </template>
      </ListItem>
    </List>
    <Page
      :total="total"
      :page-size="pageSize"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      show-sizer
    />
  </div>
</template>
<script>
export default {
  props: ["errorType", "listheader"],
  data() {
    return {
      errorList: [],
      selectDateList: [],
      total: 0,
      pageSize: 10
    };
  },
  methods: {
    handleChange(value, type) {
      this.selectDateList = value;
      this.getErrorList({
        startTime: value[0] ? this.$moment(value[0]).valueOf() : "",
        endTime: value[1] ? this.$moment(value[1]).valueOf() : ""
      });
    },
    selectDate(p) {
      let startTime = this.$moment(p).startOf("day");
      let endTime = this.$moment(p).endOf("day");
      this.$set(
        this.selectDateList,
        0,
        startTime.format("YYYY-MM-DD HH:mm:ss")
      );
      this.$set(this.selectDateList, 1, endTime.format("YYYY-MM-DD HH:mm:ss"));
      this.getErrorList({
        startTime: startTime.valueOf(),
        endTime: endTime.valueOf()
      });
    },
    getErrorList(params) {
      this.$axios("/getList", {
        params: { type: this.errorType, ...params }
      }).then(res => {
        const responent = res.data.body;
        this.errorList = responent.list;
        this.total = responent.pageInfo.total;
        this.pageSize = responent.pageInfo.pageSize;
      });
    },
    pageChange(pageNum) {
      this.getErrorList({ pageNum, pageSize: this.pageSize });
    },
    pageSizeChange(pageSize) {
      this.getErrorList({ pageNum: 1, pageSize });
    },
    deleteItem(_id) {
      this.$Modal.confirm({
        title: "是否确认删除？",
        onOk: () => {
          this.$axios.post("/remove", { _id });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    }
  },
  mounted: function() {
    this.getErrorList();
  }
};
</script>
