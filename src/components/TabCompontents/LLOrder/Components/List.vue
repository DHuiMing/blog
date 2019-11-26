<template>
    <section style="">
        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;height: 500px;overflow: auto;"
        >

            <el-table-column :label="$t('table.name')"  prop="realName" fixed  align="center" width="120px">
            </el-table-column>
            <el-table-column label="期数"  prop="phase"  align="center" width="50px">
            </el-table-column>
            <el-table-column :label="$t('table.phone')" prop="phone" align="center" width="150px">
            </el-table-column>
            <el-table-column :label="$t('tab.OrderNumber')" prop="orderNo" width="180px" align="center">
            </el-table-column>
            <el-table-column label="身份证号" prop="idNo" width="180px" align="center">
            </el-table-column>
            <el-table-column :label="$t('tab.DaysOverdue')" prop="penaltyDay" width="50px" align="center">
            </el-table-column>
            <el-table-column label="订单生成时间" prop="borrowTime" width="180px" align="center">
            </el-table-column>
            <el-table-column label="应还款金额(元)" prop="repayAmount" width="180px" align="center">
            </el-table-column>
            <el-table-column label="应还逾期罚金（元）" prop="penaltyAmout" width="180px" align="center">
            </el-table-column>
            <el-table-column label="已还款金额(元)" prop="realAmout" width="180px" align="center">
            </el-table-column>
            <el-table-column label="已还逾期罚金（元）" prop="realPenaltyAmout" width="180px" align="center">
            </el-table-column>
            <el-table-column label="应还款日期" prop="repayPlanTime" width="180px" align="center">
            </el-table-column>

            <el-table-column :label="$t('tab.Auditor')" prop="auditName" align="center" width="150px">
            </el-table-column>
            <el-table-column label="实际还款日期" prop="repayTime" width="180px" align="center">
            </el-table-column>
            <el-table-column :label="$t('tab.PaymentMode1')" prop="repayWay" width="180px" align="center">
            </el-table-column>
            <el-table-column label="还款账号" prop="repayAccount" width="200px" align="center">
            </el-table-column>
            <el-table-column label="流水号" prop="serialNumber" width="180px" align="center">
            </el-table-column>
            <el-table-column :label="$t('tab.Theorderstatus')" width="200px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.borrowState == 40 ? '还款成功' : scope.row.borrowState == 30 ? '放款成功' : scope.row.borrowState == 41 ? '还款成功-金额减免' : scope.row.borrowState == 50 ? '逾期' : scope.row.borrowState == 90 ? '坏账' : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('tab.Status')" fixed="right" width="100px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.state==20?'未还款' : '已还款'}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
                <template slot-scope="scope">
                    <!--if(item.label.indexOf('|') > -1){-->
                        <!--<el-button v-for="item in actionList" type="primary" size="mini" @click="handleDetail(scope.row)">{{item.label}}</el-button>-->
                    <!--}-->
                    <span v-for="item in actionList" style="padding: 0 4px">
                        <el-button v-if="(item.actionTag == 'confirmRepay') & (scope.row.state == 20)"
                                   type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label}}</el-button>
                        <el-button v-else-if="(item.actionTag == 'refund' || item.actionTag == 'deduction') & (scope.row.state == 10)"
                                   type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label}}</el-button>
                        <el-button v-else-if="item.actionTag == 'Info'" type="primary" size="mini" @click="handleAction(item,scope.row)">{{item.label}}</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!--<div class="pagination-box">-->
            <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--:page-sizes="[10, 20, 30, 40]"-->
                    <!--:page-size="10"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="total"-->
                    <!--class="pag-list">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <detail-win v-if="detailWinShow" ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win>
    </section>
</template>

<script>
    import DetailWin from './DetailWin'
    export default {
        name: "list",
        components: {
            DetailWin
        },
        filters: {
            typeFilter(type) {
                let result = (type==20?"否" : "是")
                return result
            }
        },
        props:['id','items'],
        data(){
            return{
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: false,
                params:{
                    current: 1,
                    pageSize: 100,
                    searchParams:{
                        borrowMainId:''
                    }
                },
                currentPage: 1,
                detailWinShow:false,
                power:null,
                actionList:null,
                allBorrowState:{
                    10: this.$t('tab.Apply'),
                    12: "待活体自动放款",
                    14: "待活体自动人审",
                    20: this.$t('tab.AutoReviewPass'),
                    21: this.$t('tab.AutoReviewRefuse'),
                    22: this.$t('tab.Reviewing'),
                    25: this.$t('tab.ReviewHangup'),
                    26: this.$t('tab.ReviewPass'),
                    27: this.$t('tab.ReviewRefuse'),
                    28: "审核成功(待银程同意)",
                    29: "银程同意(待连连放款)",
                    30: this.$t('tab.LoanSuccess'),
                    31: this.$t('tab.LoanFail'),
                    40: this.$t('tab.Repayed'),
                    41: this.$t('tab.RepayedReduced'),
                    50: this.$t('tab.Overdue'),
                    90: this.$t('tab.BadDebt'),
                }
            }
        },
        computed:{},
        mounted(){},
        created() {
            this.params.searchParams.borrowMainId=this.id;
            this.params.searchParams = JSON.stringify(this.params.searchParams)
            this.getList(this.params);
            this.actionList=this.getActionList(this.items);
        },
        methods:{
            getActionList(list){
                if(list.data && list.data[4] && list.data[4].length){
                    return list.data[4]
                }
            },
            changeData(p) {
                this.params.searchParams=JSON.stringify(p);
                this.getList()
            },
            getList(params){
                let _this = this;
                _this.listLoading = true;
                _this.$axios.post({
                    url: '/manage/borrowRepay/repayList.htm',
                    data: params,
                    callback(res) {
                        _this.list = res.content.data;
                        _this.total = res.content.page.total;
                        setTimeout(() => {
                            _this.listLoading = false
                        }, 0.5 * 1000)
                    }
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
            handleAction(item,row){

                if(item.actionTag=='Info'){
                    this.detailWinShow=true
                    setTimeout(() => {
                        this.$refs.deatilwin.getUserInfo(item.code,row);
                    }, 0.5 * 1000)

                }else if(item.actionTag=='PayAgain'){
                    let _this = this;
                    this.$confirm('是否确定再次支付', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$axios.post({
                            url: '/manage/loan/borrowPayAgain.htm',
                            data: {borrowMainId:row.id},
                            callback(res) {
                                _this.getList();
                                _this.$message({
                                    type: 'success',
                                    message: '再次支付成功!'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消该操作'
                        });
                    });
                }
            },
            closeDetailWin(){
                this.detailWinShow=false
            },
            open3(row) {


            }
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
    }
</style>
