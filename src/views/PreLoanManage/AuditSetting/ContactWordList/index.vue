<!--借款订单-->
<template>
  <div class="LoanManage">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>贷前管理</el-breadcrumb-item>
        <el-breadcrumb-item>风控信审设置</el-breadcrumb-item>
        <el-breadcrumb-item>通讯录字典库</el-breadcrumb-item>
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
  name: "LoanManage",
  data() {
    return {
      power: "",
      allList: {}
    };
  },
  components: {
    List,
    SeachForm
  },
  mounted() {
    let _this = this;
    // _this
    //   .$axios({
    //     method: "get",
    //     url: "/manage/risk/searchDictionaryList.htm"
    //   })
    //   .then(res => {
    //     _this.allList = res.content;
    //   })
    //   .catch(err => {});
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
