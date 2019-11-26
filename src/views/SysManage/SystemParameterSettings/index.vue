<template>
  <div class="home page-body">
      <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('SysManage')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('SysArgManage')}}</el-breadcrumb-item>
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
  name: "home",
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
        url: "/manage/sysManage/configDropDownList.htm"
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
