<!--催收总订单-->
<template>
  <div class="CollectionTotalOrderList">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('DataStatistics')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('KeyIndex')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectionTotalOrderList",
  data() {
    return {
       params: {
        current: 1,
        pageSize: 10,
        searchParams: {}
      },
    };
  },
  components: {},
  mounted() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
      this.getList()
  },
  methods: {
    getList() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/manage/statistic/KPIData.htm",
          data: _this.params
        })
        .then(res => {})
        .catch(err => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
