<template>
    <div v-loading="loading">
        <p>
            <span>规则名称 ：</span><span>{{ruleList[0]?ruleList[0].engineRuleName:''}}</span>
        </p>
        <p>
            <span>规则条数 ：</span><span>{{ruleList.length}} 条</span>
        </p>
        <el-table
                :data="ruleList"
                style="width: 100%">
            <el-table-column
                    prop="tbName"
                    label="字段描述"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="rule"
                    label="运算符"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="值"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="resultType"
                    label="结果"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="matching"
                    label="当前值"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="result"
                    label="命中结果">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "review-detail",
        data(){
            return{
                loading:true,
                ruleList:[]
            }
        },
        props:['userId','tableUrl'],
        created() {
            this.getUser(this.userId)
        },
        methods:{
            getUser(userId){
                let _this = this;
                _this.$axios.post({
                    url: _this.tableUrl,
                    data: {borrowMainId:userId},
                    callback(res) {
                        _this.ruleList=res.content.ruleList;
                        setTimeout(() => {
                            _this.loading = false
                        }, 0.5 * 1000)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>