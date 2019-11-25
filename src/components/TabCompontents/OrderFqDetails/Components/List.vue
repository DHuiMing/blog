<template>
    <section style="">
        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;overflow: auto;"
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

            <!--<el-table-column label="审核人" prop="auditName" align="center" width="150px">-->
            <!--</el-table-column>-->
            <el-table-column label="实际还款日期" prop="repayTime" width="180px" align="center">
            </el-table-column>
            <el-table-column label="还款方式" prop="repayWay" width="180px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.repayWay==20?'银行卡转账' : scope.row.repayWay==10?'代扣' : scope.row.repayWay==30?'支付宝转账' : scope.row.repayWay==40?'40' :'_'}}</span>
                </template>
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
            <el-table-column label="还款状态" fixed="right" width="100px" align="center">
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
                        <el-button v-if="(item.actionTag == 'confirmRepay') & (scope.row.state == 20) &(scope.row.index==0 )"
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
        <!---->
        <el-dialog :title="title" v-if="okVisible" :visible.sync="okVisible" append-to-body width="800px">
            <el-form :model="formInit" ref="form2" v-loading="formLoading">
                <div style="height: 50px;margin-left: 50px">
                    <el-radio-group v-model="formInit.state" @change="selectOne">
                        <el-radio :label="10">正常还款</el-radio>
                        <el-radio :label="20">金额减免</el-radio>
                        <el-radio :label="30">逾期正常还款</el-radio>
                    </el-radio-group>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="还款账号" prop="repayAccount" :label-width="formLabelWidth" :rules="[{ required: true, message: '还款账号不能为空'}]">
                            <el-input v-model="formInit.repayAccount" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="还款方式" prop="repayWay" :label-width="formLabelWidth" :rules="[{ required: true, message: '还款方式不能为空'}]">
                            <el-select v-model="formInit.repayWay"  placeholder="还款方式">
                                <el-option value="" label="全部"></el-option>
                                <el-option value="20" label="银行卡转账"></el-option>
                                <el-option value="30" label="支付宝转账"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="流水号" prop="serialNumber" :label-width="formLabelWidth" :rules="[{ required: true, message: '流水号不能为空'}]">
                            <el-input v-model="formInit.serialNumber" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="还款时间" prop="repayTime" :label-width="formLabelWidth" :rules="[{ required: true, message: '还款时间不能为空'}]">
                            <el-date-picker
                                    v-model="formInit.repayTime"
                                    type="datetime"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="show2">
                    <el-col :span="12">
                        <el-form-item label="还款金额" prop="amount" :label-width="formLabelWidth" :rules="[{ required: true, message: '还款金额不能为空'}]">
                            <el-input v-model="formInit.amount" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="逾期罚金" prop="penaltyAmout" :label-width="formLabelWidth" :rules="[{ required: true, message: '逾期罚金不能为空'}]">
                            <el-input v-model="formInit.penaltyAmout" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="show1">
                    <el-col :span="12">
                        <el-form-item label="减免金额" prop="derateAmount" :label-width="formLabelWidth" :rules="[{ required: true, message: '减免金额不能为空'}]">
                            <el-input v-model="formInit.derateAmount" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="okVisible = false">取 消</el-button>
                <el-button type="primary"  @click="ensure('form2')">确 定</el-button>
            </div>
        </el-dialog>
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
                okVisible:false,
                formLoading:false,
                title:'确认还款',
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
                    10: "申请成功待审核",
                    12: "待活体自动放款",
                    14: "待活体自动人审",
                    20: "自动审核通过",
                    21: "自动审核不通过",
                    22: "自动审核未决待人工复审",
                    25: "人工复审挂起",
                    26: "人工复审通过",
                    27: "人工复审不通过",
                    28: "审核成功(待银程同意)",
                    29: "银程同意(待连连放款)",
                    30: "放款成功",
                    31: "放款失败",
                    40: "还款成功",
                    41: "还款成功-金额减免",
                    50: "逾期",
                    90: "坏账",
                },
                formLabelWidth: '120px',
                formInit: {
                    state:10,
                },
                show1:false,
                show2:false,
                rid:'',
                repayAmount:'',
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
                p.borrowMainId=this.id;
                this.params.searchParams=JSON.stringify(p);
                this.getList(this.params)
            },
            getList(params){
                let _this = this;
                _this.listLoading = true;
                _this.$axios.post({
                    url: '/manage/borrowRepay/repayList.htm',
                    data: params,
                    callback(res) {
                        for(var i=0;i<res.content.data.length;i++){
                            if(res.content.data[i].state==20){
                                res.content.data[i].index=0
                                break;
                            }
                        }
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

                }else if(item.actionTag=='confirmRepay'){
                    let _this = this;
                    _this.repayAmount= row.repayAmount
                     _this.okVisible=true
                    _this.rid=row.id
                }else if(item.actionTag=='deduction' || item.actionTag=='refund'){
                    let _this=this
                    let itemUrl = item.code
                    let title;
                    item.actionTag=='deduction'?title='补扣':title='退还'
                    _this.$prompt(title, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: '',
                        inputErrorMessage: ''
                    }).then(({ value }) => {
                        if(!value){
                            _this.$message('不能为空!')
                            return;
                        }
                        _this.$axios.post({
                            url: itemUrl,
                            data: {id:row.id,amount:value},
                            callback(res) {

                                _this.getList(_this.params)
                                _this.$message({
                                    type: 'success',
                                    message: '你的'+title+'金额是: ' + value
                                });
                                // setTimeout(() => {
                                //     _this.listLoading = false
                                // }, 0.5 * 1000)
                            }
                        })
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            },
            closeDetailWin(){
                this.detailWinShow=false
            },
            open3(row) {


            },
            selectOne(event, item) {     //change 触发事件
                if(event==20){
                    this.show1=true
                    this.show2=true
                }else if(event==30){
                    this.show1=false
                    this.show2=true
                }else if(event==10){
                    this.show1=false
                    this.show2=false
                }
            },
            ensure(formName){
                let _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.formInit.id=_this.rid
                        if(_this.formInit.state==10){
                            _this.formInit.amount=_this.repayAmount
                        }
                        _this.formLoading=true;

                        _this.$axios.post({
                            url: '/manage/borrowRepay/confirmRepay.htm',
                            data: _this.formInit,
                            callback(res) {
                                _this.formLoading=false;
                                _this.getList(_this.params);
                                _this.okVisible=false
                            }
                        })
                    } else {
                        _this.formLoading=false;
                        return;
                    }
                });

            },
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
