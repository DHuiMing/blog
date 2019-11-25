<template>
    <div    style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto">
        <el-tabs v-if="show" v-model="active" type="card" @tab-click="handleClick">
            <!--用户信息-->
            <el-tab-pane label="用户信息" name="first">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">基本信息</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><el-form-item :label="$t('table.name')">
                            <el-input disabled v-model="dataList.basic_info.name"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item :label="$t('table.gender')">
                            <el-input disabled v-model="dataList.basic_info.has_other_name=1?'男':'女'"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="是否有非本人账单">
                            <el-input disabled v-model="dataList.basic_info.other_name==1?'是':'否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><el-form-item label="非本人账单姓名">
                            <el-input disabled v-model="dataList.basic_info.other_name || ''"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">信用卡信息</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><el-form-item label="是否有四大行">
                            <el-input disabled v-model="dataList.card_info.bank==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="信用卡银行">
                            <el-input disabled v-model="dataList.card_info.bank"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="信用卡数">
                            <el-input disabled v-model="dataList.card_info.card_cnt"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><el-form-item label="银行数">
                            <el-input disabled v-model="dataList.card_info.bank_cnt"></el-input>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="最早消费日期">
                            <el-input disabled v-model="dataList.card_info.first_flow_trans_date"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <!--信用卡额度信息-->
            <el-tab-pane label="信用卡额度信息" name="second">
                <el-form ref="form" :model="form" label-width="400px" style="width: 800px">
                    <!--当前额度-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">当前额度</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前额度总和:">
                            <el-input disabled  v-model="dataList.limit_info.credit_limit_sum/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最高授信额度：">
                            <el-input disabled v-model="dataList.limit_info.credit_limit_max/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最高授信额度所属银行：">
                            <el-input disabled v-model="dataList.limit_info.credit_limit_max_bank"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最低授信额度:">
                            <el-input disabled v-model="dataList.limit_info.credit_limit_min/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最低授信额度所属银行:">
                            <el-input disabled v-model="dataList.limit_info.credit_limit_min_bank"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前取现额度总和:">
                            <el-input disabled v-model="dataList.limit_info.cash_advance_limit_sum/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最高取现额度:">
                            <el-input disabled v-model="dataList.limit_info.cash_advance_limit_max/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="当前单一银行最低取现额度:">
                            <el-input disabled v-model="dataList.limit_info.cash_advance_limit_min/100"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--额度变化-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">额度变化</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月是否有提额（任一银行）:">
                            <el-input disabled v-model="dataList.limit_change.has_raise_limit==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月是否有降额（任一银行）:">
                            <el-input disabled v-model="dataList.limit_change.has_lower_limit==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月是否降额超过80%（任一银行）:">
                            <el-input disabled v-model="dataList.limit_change.has_lower_limit_large==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--额度使用率-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">额度使用率</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <!--<el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]个月的额度使用率:">
                            <el-input disabled v-model="dataList.limit_usage.limit_usage_list"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]个月的取现额度使用率（取现额度如果没抓到，用额度的50%近似代替）:">
                            <el-input disabled v-model="dataList.limit_usage.cash_usage_list"></el-input>
                        </el-form-item></el-col>
                    </el-row>-->
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近1个月是否4家以上机构额度使用率高于90%:">
                            <el-input disabled v-model="dataList.limit_usage.is_4_bank_90pct_usage==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近1个月是否6家以上机构额度使用率高于70%:">
                            <el-input disabled v-model="dataList.limit_usage.is_6_bank_70pct_usage==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
           <!-- 还款行为-->
            <el-tab-pane label="还款行为" name="third">
                <el-form ref="form" :model="form" label-width="300px" style="width: 800px">
                    <!--应还款金额-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">应还款金额</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]月账单应还金额:">
                            <el-input disabled v-model="dataList.repayment_plan.new_balance[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]月最低应还金额：">
                            <el-input disabled v-model="dataList.repayment_plan.min_payment[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--还款率-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">还款率</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]月还款率:">
                            <el-input disabled v-model="dataList.repayment_raito=null?'':'0'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--历史逾期-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="2" class="list-write">历史逾期</el-col>
                        <el-col :span="20" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,3,6,12]个月有逾期账单的月数:">
                            <el-input disabled v-model="dataList.overdue.overdue_month_cnt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="历史逾期最大金额:">
                            <el-input disabled v-model="dataList.overdue.max_overdue_amt"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="历史连续逾期最大月数:">
                            <el-input disabled v-model="dataList.overdue.max_continue_overdue_month"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,3,6,12]个月滞纳金(违约金):">
                            <el-input disabled v-model="dataList.overdue.penalty[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>

                </el-form>
            </el-tab-pane>
            <!--交易行为-->
            <el-tab-pane label="交易行为" name="fourth">
                <el-form ref="form" :model="form" label-width="300px" style="width: 600px">
                    <!--疑似套现-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">疑似套现</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="是否小店大额消费异常(近半年，小店大额1000元以上存在3个月以上):">
                            <el-input disabled v-model="dataList.suspected_cash.is_store_large_consume==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="是否账单整额消费异常（近半年3个月以上整百消费）：">
                            <el-input disabled v-model="dataList.suspected_cash.is_often_hundreds_consume==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="是否大额低频消费异常:">
                            <el-input disabled v-model="dataList.suspected_cash.is_large_amt_low_frequency_consume==1? '是' : '否'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--取现行为-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">取现行为</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近第[1,2,3,4,5,6]取现笔数(不累计):">
                            <el-input disabled v-model="dataList.encashment.encashment_cnt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近第[1,2,3,4,5,6]取现金额(不累计):">
                            <el-input disabled v-model="dataList.encashment.encashment_amt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--分期行为-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">分期行为</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近第[1,2,3,4,5,6]个月分期笔数(不累计):">
                            <el-input disabled v-model="dataList.installment.installment_cnt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近第[1,2,3,4,5,6]个月分期金额(不累计):">
                            <el-input disabled v-model="dataList.installment.installment_amt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--息费记录-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">消费行为</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]利息:">
                            <el-input disabled v-model="dataList.interest_fee.interest_amt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近[1,2,3,4,5,6]手续费:">
                            <el-input disabled v-model="dataList.interest_fee.fee_amt[0]"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <!--数据完整性-->
            <el-tab-pane label="数据完整性" name="five">
                <el-form ref="form" :model="form" label-width="300px" style="width: 600px">
                    <!--有账单月数-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">有账单月数</el-col>
                        <el-col :span="18" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近3个月有账单月数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_cnt_3m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月有账单月数：">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_cnt_6m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近12个月有账单月数：">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_cnt_12m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近3个月有账单月数比例:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_ratio_3m_sum*100+'%'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月有账单月数比例:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_ratio_6m_sum*100+'%'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近12个月有账单月数比例:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_month_ratio_12m_sum*100+'%'"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--账单数-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="4" class="list-write">账单数</el-col>
                        <el-col :span="180" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近1个月账单数:">
                            <el-input disabled disabled v-model="dataList.credit_behavior.bill_cnt_1m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近3个月账单数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_cnt_3m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月账单数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_cnt_6m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近12个月账单数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_cnt_12m_sum"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <!--账单不连续最大月数-->
                    <el-row>
                        <el-col :span="2" class="list-top"></el-col>
                        <el-col :span="8" class="list-write">账单不连续最大月数</el-col>
                        <el-col :span="14" class="list-top"></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近3个月账单不连续最大月数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_no_continue_3m"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近6个月账单不连续最大月数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_no_continue_6m"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><el-form-item label="最近12个月账单不连续最大月数:">
                            <el-input disabled v-model="dataList.credit_behavior.bill_no_continue_12m"></el-input>
                        </el-form-item></el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        name: "credit-cards",
        data(){
            return{
                listLoading:false,
                dataList:'',
                active:'first',
                form:{ },
                show:false
            }
        },
        props:['userId'],
        created() {
            this.getData(this.userId)
        },
        methods:{
            getData(userId){
                let _this = this;
                _this.listLoading=true
                _this.$axios.post({
                    url: '/manage/loanother/searchTianjiReport.htm',
                    data: {userId:userId,reportType: "credit_email"},
                    callback(res) {
                        if(res.content.data){
                            _this.show=true
                            _this.dataList=JSON.parse(res.content.data);
                        }else{
                            _this.$message({
                                message: '暂无数据',
                                type: 'warning'
                            });
                        }
                        setTimeout(() => {
                            _this.listLoading = false
                        }, 0.5 * 1000)
                    }
                })
            },
            handleClick(tab, event) {

            }
        }
    }
</script>

<style scoped>
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-row{
        padding: 0.4rem;
    }
    .list-top{
        border-bottom: 1px solid gainsboro;
        height: 10px;
        line-height: 2px;
    }
    .list-write{
        text-align: center;
    }
</style>
