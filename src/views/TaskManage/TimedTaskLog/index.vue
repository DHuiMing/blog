<!--执行记录-->
<template>
  <div class="TimedTaskLog">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('TaskManage')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('TimedTaskLog')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="con">
      <seach-form @changeParmas="passParmas($event)"></seach-form>
      <list ref="list"></list>
    </div>
  </div>
</template>

<script>
import SeachForm from "./Components/SeachForm";
import List from "./Components/List";
export default {
  name: "TimedTaskLog",
  data() {
    return {
      power: ""
    };
  },
  components: {
    List,
    SeachForm
  },
  mounted() {
    this.power = this.$route.params;
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
