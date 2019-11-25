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
            <el-table-column label="渠道名称"  prop="name" fixed  align="center" width="120px">
            </el-table-column>
            <el-table-column label="注册量：" prop="registerCount" fixed="left"  align="center" width="120px">
            </el-table-column>
            <el-table-column :label="$t('tab.Theorderstatus')" fixed="left" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.state | typeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="实名认证" prop="idMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="绑卡" prop="bankCardMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="运营商" prop="phoneMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column :label="$t('tab.EmegencyContact')" prop="contactMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="芝麻授信" prop="zhiMaMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="申请人数" prop="borrowMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="放款人数" prop="loanMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="放款金额(元)" prop="payAccount" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="申请率(%)" prop="toFixed" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="转化率(%)" prop="toFixed" width="200px"  align="center">
            </el-table-column>
            <el-table-column label="老用户" prop="oldMember" width="200px"  align="center">
            </el-table-column>
            <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
                <template slot-scope="scope">

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
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            typeFilter(type) {

                let result = type == 11 ? "待催收" : type == 20 ? "催收中" : type == 30 ? "承诺还款" : type == 40 ? "催收成功" : type == 50 ? "坏账" : "-"
                return result
            }
        },
        data(){
            return{
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: false,
                params:{
                    current: 1,
                    pageSize: 10,
                    searchParams:{}
                },
                currentPage: 1,

                power:"",
                actionList:"",
                dialogFormVisible: false,
                form:{},
                isDisabled:false,
                formLabelWidth: '120px',
                actionPlBtn:''
            }
        },
        computed:{},
        mounted(){},
        created() {
            this.getList();
            this.actionList=this.getActionList(this.$route.params);
            this.actionPlBtn = this.getPlBtn(this.$route.params);
        },
        methods:{
            // 操作
            getActionList(list){
                if(list.BtnPermList && list.BtnPermList[4] && list.BtnPermList[4].length){
                    return list.BtnPermList[4]
                }
            },
            /*新增*/
            getPlBtn(list){
                if(list.BtnPermList && list.BtnPermList[7] && list.BtnPermList[7].length){

                    return list.BtnPermList[7]
                }
            },
            getdialogFormVisible(data){

            },
            changeData(p) {
                this.params.searchParams=JSON.stringify(p);
                this.getList()
            },
            // 获取列表
            getList(list){
                let _this = this;
                _this.listLoading = true;
                _this.$axios({
                    method:'post',
                    url: '/manage/channel/channelUserList.htm',
                    data: _this.params,

                }).then(res => {
          _this.list = res.content.data;
                        _this.total = res.content.page.total;
                        setTimeout(() => {
                            _this.listLoading = false
                        }, 0.5 * 1000)
}).catch(err => {

})
            },


            handleSizeChange(val) {
                this.params.pageSize=val;
                this.params.current=1;
                this.getList();
            },
            handleCurrentChange(val) {
                this.params.current=val;
                this.getList();
            },
            handleAction(actionTag,row){

                if(actionTag=='Info'){
                    // this.detailWinShow=true
                    setTimeout(() => {
                        this.$refs.deatilwin.getUserInfo('',row);
                    }, 0.5 * 1000)

                }else if(actionTag=='Black'){
                    this.open3(row)
                }
            },
            // closeDetailWin(){
            //     this.detailWinShow=false
            // },
            // refush(){
            //     this.closeDetailWin()
            //     this.getList()
            // }
        },
        watch:{

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .pagination-box{
        position: absolute;
        bottom: 0px;
        padding: 10px;
        border-radius: 4px;
        background-color: #fff;
        width: 100%;
        margin-right: 10px;
        .pag-list{
            float: right;
            margin-right: 100px;
        }
        .el-table__fixed-right{
            z-index: 0;
        }
    }
</style>
