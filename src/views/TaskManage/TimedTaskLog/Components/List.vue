<template>
  <section>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; z-index: 0"
    >
      <el-table-column
        :show-overflow-tooltip="true"
        :label="$t('tem.Taskname')"
        prop="name"
        fixed
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column :label="$t('tem.ResultSet')" prop="resultStr" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Executiontime')" prop="startTime" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.ResultSet')" :show-overflow-tooltip="true" prop="remark" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Timemilliseconds')" prop="time" width="200px" align="center"></el-table-column>
      <!--<el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--&lt;!&ndash;if(item.label.indexOf('|') > -1){&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button v-for="item in actionList" type="primary" size="mini" @click="handleDetail(scope.row)">{{item.label}}</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;}&ndash;&gt;-->
      <!--<span v-for="item in actionList" style="padding: 0 4px">-->
      <!--<el-button v-if="(item.label.indexOf('|') > -1) && (scope.row.state==20)"-->
      <!--type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label.split('|')[0]}}</el-button>-->
      <!--<el-button v-if="(item.label.indexOf('|') > -1) && (scope.row.state!=20)"-->
      <!--type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label.split('|')[1]}}</el-button>-->
      <!--<el-button v-if="(item.label.indexOf('|') <= -1)" type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label}}</el-button>-->
      <!--</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pag-list"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  name: "list",
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      params: {
        current: 1,
        pageSize: 10,
        searchParams: {}
      },
      currentPage: 1,
      detailWinShow: false,
      power: "",
      actionList: "",
      dialogFormVisible: false,
      form: {},
      isDisabled: false,
      formLabelWidth: "120px",
      actionPlBtn: ""
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
  },
  methods: {
    // 操作
    getActionList(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[4] &&
        list.BtnPermList[4].length
      ) {
        return list.BtnPermList[4];
      }
    },
    changeData(p) {
      this.params.searchParams = JSON.stringify(p);
      this.getList();
    },
    // 获取列表
    getList() {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/quartz/logPage.htm",
          data: _this.params
        })
        .then(res => {
          _this.list = res.content.data;
          _this.total = res.content.page.total;
          setTimeout(() => {
            _this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(err => {});
    },

    handleSizeChange(val) {
      this.params.pageSize = val;
      this.params.current = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.current = val;
      this.getList();
    }
    // handleAction(item,row){
    //
    //     if(item.actionTag=='Info'){
    //         this.detailWinShow=true
    //         setTimeout(() => {
    //             this.$refs.deatilwin.getUserInfo(item.code,row);
    //         }, 0.5 * 1000)
    //
    //     }else if(item.actionTag=='Black'){
    //         this.open3(row)
    //     }
    // },
  },
  watch: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.pagination-box {
  position: absolute;
  bottom: 0px;
  padding: 4px;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  margin-right: 10px;
  .pag-list {
    float: right;
    margin-right: 100px;
    opacity: 0.5;
  }
}
</style>
