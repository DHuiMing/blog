<!--催收总订单-->
<template>
  <div class="CollectionTotalOrderList">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectionTotalOrderList",
  data() {
    return {
 
    };
  },
  components: {},
  mounted() {
      this.getList()
  },
  methods: {
    getList() {
      let _this = this;

      _this
        .$axios({
          method: "post",
          url: "/manage/sysManage/findRoleMenuHas.htm",
          data: {roleId:'1'}
        })
        .then(res => {})
        .catch(err => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
