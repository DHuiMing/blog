<template>
    <section>
        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;margin-bottom: 50px;"
        >
            <el-table-column label="真实姓名"  prop="name" fixed  align="center" width="150px">
            </el-table-column>
            <el-table-column label="用户名"  prop="userName" fixed  align="center" width="120px">
            </el-table-column>
            <el-table-column label="角色" prop="roleName" width="180px" align="center">
            </el-table-column>
            <el-table-column label="状态" fixed="right" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.status==0?"正常" : scope.row.status==1 ? "锁定" : "-"}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300px" align="center">
                <template slot-scope="scope">
                    <span v-show="scope.row.status==0" class="cz"  @click="handleAction('lock',scope.row)">添加黑名单</span>
                    <span v-show="scope.row.status==1" class="cz"  @click="handleAction('lock',scope.row)">接触黑名单</span>
                </template>
            </el-table-column>
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
                    class="pag-list">
            </el-pagination>
        </div>
      </section>
</template>

<script>
    export default {
        name: "list",
        components: {
        },
        data() {
            return{
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: false,
                params:{
                    pageNum: 1,
                    pageSize: 10,
                    searchParams:{

                    }
                },
                currentPage: 1,
            }
        },
        computed:{
        },
        created(){
            this.getList();
        },
        methods:{
            changeData(p) {
                this.params.searchParams=JSON.stringify(p);
                this.getList()
            },
            getList(){
                let _this = this
                _this.listLoading = true;
                this.$axios({
                    url: "/portal/sysManage/userList.htm",
                    method: "post",
                    data: _this.params
                }).then(res => {
                    _this.list = res.data.list;
                    _this.total = res.data.total;
                    setTimeout(() => {
                        _this.listLoading = false
                    }, 0.5 * 1000)
                }).catch(err => {
                    console.log(err)
                })
            },
            handleSizeChange(val) {
                this.params.pageSize=val;
                this.params.pageNum=1;
                this.getList();
            },
            handleCurrentChange(val) {
                this.params.pageNum=val;
                this.getList();
            },
            handleAction(actionTag,row){
                let _this = this
            },
        }
    }
</script>

<style scoped>
.cz{
    color: #409EFF;
    padding: 0 6px;
    cursor: pointer;
}
</style>
