<!--任务列表-->
<template>
  <div class="TimedTaskList">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>定时任务</el-breadcrumb-item>
        <el-breadcrumb-item>任务列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="con">
      <seach-form @changeParmas="passParmas($event)" :allList="allList"></seach-form>
      <list ref="list" :allList="allList"></list>
    </div>
  </div>
</template>

<script>
import SeachForm from "./Components/SeachForm";
import List from "./Components/List";
export default {
  name: "TimedTaskList",
  data() {
    return {
      allList: {}
    };
  },
  components: {
    List,
    SeachForm
  },
  mounted() {
    let _this = this;
    _this
      .$axios({
        method: "post",
        url: "/manage/sysManage/userDropDownList.htm"
      })
      .then(res => {
        _this.allList = res.content;
      })
      .catch(err => {});
  },
  methods: {
    passParmas(childValue) {
      this.$refs.list.changeData(childValue);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
