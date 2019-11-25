<!--催收总订单-->
<template>
  <div class="CollectionTotalOrderList">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>催收工作台</el-breadcrumb-item>
        <el-breadcrumb-item>催收中订单</el-breadcrumb-item>
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
  name: "CollectionTotalOrderList",
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
