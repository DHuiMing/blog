<!--催收反馈-->
<template>
    <section style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto">
        <div style="margin: 4px 0;background-color: #fff;padding: 4px">
            <el-button  size="small" type="primary" @click="addFeed" class="people">{{$t('tab.Add')}}</el-button>
        </div>
        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                style="width: 100%;"
        >
            <el-table-column label="借款人姓名"  prop="borrowName" fixed  align="center">
            </el-table-column>
            <el-table-column :label="$t('table.phone')" prop="phone"  align="center">
            </el-table-column>
            <el-table-column label="催收方式"  prop="name" fixed  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.way | typeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('coll.Collectiontime')" prop="createTime"  align="center">
            </el-table-column>
            <el-table-column :label="$t('coll.Collectionstatus')"  prop="name" fixed  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.state | stateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="催收备注" prop="remark"  align="center">
            </el-table-column>
        </el-table>
        <add-feedback v-if="addFeedShow" v-on:closeAdd="closeAddWin" v-bind:rowList="rowList"></add-feedback>
    </section>
</template>

<script>
    import AddFeedback from './AddFeedback'
    export default {
        name: "collection-feedback",
        components: {
            AddFeedback
        },
        filters: {
            typeFilter(type) {
                let result = (type== 10 ? '电话' : type == 20 ? '邮件' : type == 30 ? '短信' : type == 40 ? '现场沟通' :'其他');
                return result
            },
            stateFilter(type) {
                let result = (type == 20 ? '催收中' : type == 30 ? '承诺还款' : type == 40 ? '催收成功' : type == 50 ? '坏账' :'-');
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
                    pageSize: 10000,
                    borrowId:null,
                    searchParams:{}
                },
                currentPage: 1,
                addFeedShow:false,
            }
        },
        props:['rowList'],
        created() {
            this.getData(this.rowList)
        },
        methods:{
            getData(row){
              console.log(row)
                let _this = this;
                _this.listLoading = true;
                _this.params.borrowId=row.borrowUserId;
              _this
                .$axios({
                  method: "post",
                  url: "/manage/logListbyBorrowId.htm",
                  data: _this.params,
                })
                .then(res => {
                  _this.list = res.content.data;
                  _this.total = res.content.page.total;
                  setTimeout(() => {
                    _this.listLoading = false
                  }, 0.5 * 1000)
                })
                .catch(err => {});
            },
            addFeed(){
                this.addFeedShow=true
            },
            closeAddWin(){
                this.getData(this.rowList)
                this.addFeedShow=false
            }
        }
    }
</script>

<style scoped>

</style>
