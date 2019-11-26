<template>
    <section v-loading="listLoading">
        <el-form v-if="show" label-width="160px" >
            <el-row>
                <el-col :span="8">
                    <el-form-item :label="$t('tab.OrderNumber')">
                        <el-input disabled v-model="dataList.orderNo" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款人姓名">
                        <el-input disabled v-model="dataList.realName" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('table.phone')">
                        <el-input disabled v-model="dataList.loginName" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="借款期数">
                        <el-input disabled v-model="dataList.stage" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="借款金额(元)">
                        <el-input disabled v-model="dataList.amount" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="综合费用(元)">
                        <el-input disabled v-model="dataList.fee" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="实际到账金额(元)">
                        <el-input disabled v-model="dataList.realAmount" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('tab.BorrowingTime')">
                        <el-input disabled v-model="dataList.createTime" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="$t('tab.Loantime')">
                        <el-input disabled v-model="dataList.loanTime" ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "order-details",
        props:['userId','tableUrl'],
        data(){
            return{
                listLoading:false,
                params:{
                    borrowMainId:null,
                },
                dataList:{},
                show:false
            }
        },
        created() {
            this.getData(this.userId,this.tableUrl)
        },
        methods:{
            getData(userId,tableUrl){
                let _this = this;
                _this.listLoading = true;
                _this.params.borrowMainId=userId;
                _this.$axios.post({
                    url: '/manage/loan/borrowRepayContent.htm',
                    data: _this.params,
                    callback(res) {

                        _this.dataList=res.content[0]

                        _this.show=true
                        setTimeout(() => {
                            _this.listLoading = false
                        }, 0.5 * 1000)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
