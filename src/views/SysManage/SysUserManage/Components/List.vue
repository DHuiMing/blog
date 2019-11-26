<template>
    <section>
        <div style="margin: 4px 0;background-color: #fff;padding: 4px">
            <el-button  @click="topAction('Add')" size="small" type="primary">{{$t('tab.Add')}}</el-button>
        </div>
        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;margin-bottom: 50px;"
        >
            <el-table-column :label="$t('table.name')"  prop="name" fixed  align="center" width="150px">
            </el-table-column>
            <el-table-column :label="$t('table.name')"  prop="userName" fixed  align="center" width="120px">
            </el-table-column>
            <el-table-column :label="$t('coll.JobNumber')" prop="number" width="220px"  align="center">
            </el-table-column>
            <el-table-column :label="$t('coll.Role')" prop="roleName" width="180px" align="center">
            </el-table-column>
            <el-table-column :label="$t('table.status')" fixed="right" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.status==0?$t('tips.Enabled') : scope.row.status==1 ? $t('tips.Disable') : "-"}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
                <template slot-scope="scope">
                     <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>
                      <el-button v-if="scope.row.status==0" type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Disable')}}</el-button>
                       <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>
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
        <detail-win v-if="detailWinShow" @refush="refush($event)" @hideWin="hideWin($event)"  ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win>
        <el-dialog title="" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :before-close="handleClose" v-loading="formLoading">
            <el-form :model="formInit" style="margin-right: 20px" ref="form">
                <el-row :gutter="20">
                    <el-col :span="1" style="display: none;">
                        <el-form-item label="" prop="id" :label-width="formLabelWidth">
                            <el-input v-model="formInit.id" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item :label="$t('coll.JobNumber')" prop="number" :label-width="formLabelWidth" :rules="[{ required: true, message: '工号不能为空'}]">
                            <el-input v-model="formInit.number" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item :label="$t('table.name')" prop="name" :label-width="formLabelWidth" :rules="[{ required: true, message: '真实姓名不能为空'}]">
                            <el-input v-model="formInit.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item :label="$t('table.name')" prop="userName" :label-width="formLabelWidth" :rules="[{ required: true, message: '姓名不能为空'}]">
                            <el-input v-model="formInit.userName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('coll.Role')" prop="roleIds"  :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
                            <el-select v-model="formInit.roleIds" multiple :placeholder="$t('coll.Role')">
                                <el-option v-for="item in allList.roleList" :key="item.id"  :value="item.id" :label="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item :label="$t('table.phone')" prop="mobile" :label-width="formLabelWidth">
                            <el-input v-model="formInit.mobile" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('coll.Tel')" prop="phone" :label-width="formLabelWidth">
                            <el-input v-model="formInit.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item :label="$t('coll.Mmailbox')" prop="email" :label-width="formLabelWidth">
                            <el-input v-model="formInit.email" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('coll.Remarks')" prop="remark" :label-width="formLabelWidth">
                            <el-input v-model="formInit.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="height: 60px">
                    <el-form-item  style="float: right;margin-top: 20px">
                        <el-button @click="cancel">{{$t('tips.cancel')}}</el-button>
                        <el-button type="primary" @click="ensure('form')">{{$t('tips.confirm')}}</el-button>
                    </el-form-item>
                </div>
            </el-form>

        </el-dialog>
    </section>
</template>

<script>
    import DetailWin from './AssignPermissions'
    export default {
        name: "list",
        components: {
            DetailWin
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
                let result = ''
                return result
            }
        },
        props:['allList'],
        data(){
            return{
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: false,
                params:{
                    current: 1,
                    pageSize: 10,
                    searchParams:{
                        state:22
                    }
                },
                currentPage: 1,
                detailWinShow:false,
                power:null,
                actionList:null,
                actionPlBtn:null,
                isDisabled:false,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                formInit:{
                    id:'',
                    number:'',
                    name:'',
                    userName:'',
                    roleIds:[],
                    mobile:'',
                    phone:'',
                    email:'',
                    remark:'',
                },
                options: [{
                    value: '0',
                    label: this.$t('tips.Enabled')
                }, {
                    value: '1',
                    label: this.$t('tips.Disable')
                }],
                formLoading:false,
                topUrl:'',
                p7:false
            }
        },
        computed:{},
        mounted(){},
        created() {
            this.getList();
            this.actionList=this.getActionList(this.$route.params);
            this.actionPlBtn = this.getPlBtn(this.$route.params);
            if(this.actionPlBtn){
                this.p7=true
            }
        },
        methods:{
            hideWin(){
                this.detailWinShow=false
            },
            getActionList(list){

                if(list.BtnPermList && list.BtnPermList[4] && list.BtnPermList[4].length){

                    return list.BtnPermList[4]
                }
            },
            getPlBtn(list){
                if(list.BtnPermList && list.BtnPermList[7] && list.BtnPermList[7].length){

                    return list.BtnPermList[7]
                }
            },
            changeData(p) {
                this.params.searchParams=JSON.stringify(p);
                this.getList()
            },
            getList(){
                let _this = this;
                _this.listLoading = true;
                _this.$axios({
                    url: '/manage/sysManage/userList.htm',
                    method: "post",
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

                let _this = this
                if(actionTag=='Edit'){
                    this.topUrl='/manage/sysManage/userEdit.htm'
                    this.rest()
                    let roleArray = row.roleId.split(',')
                    for(let p=0;p<roleArray.length;p++){
                        roleArray[p]=parseInt(roleArray[p])
                    }
                    this.formInit.id=row.id
                    this.formInit.number=row.number
                    this.formInit.name=row.name
                    this.formInit.userName=row.userName
                    this.formInit.roleIds=roleArray
                    this.formInit.mobile=row.mobile
                    this.formInit.phone=row.phone
                    this.formInit.email=row.email
                    this.formInit.remark=row.remark
                    this.dialogFormVisible=true
                }else if(actionTag=="Lock"){
                    let state = row.status==0?_this.$t('tips.Disable'):_this.$t('tips.Enabled')
                    this.$confirm(_this.$t('tips.Areyousureto') +state, '', {
                        confirmButtonText: _this.$t('tips.confirm'),
                        cancelButtonText: _this.$t('tips.cancel'),
                        type: 'warning'
                    }).then(() => {
                        _this.$axios({
                            url: '/manage/sysManage/userUpdate.htm',
                            method: "post",
                            data: {id:row.id,status:row.status==0?'lock':'unLock'},
                        }).then(res => {
                              _this.getList();
                                _this.$message({
                                    type: 'success',
                                    message: state+'成功!'
                                });
                        }).catch(err => {

                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消该操作'
                        });
                    });

                }else if(actionTag=="ResetPassWord"){
                    this.$confirm('是否确定重置密码', '', {
                        confirmButtonText: _this.$t('tips.confirm'),
                        cancelButtonText: _this.$t('tips.cancel'),
                        type: 'warning'
                    }).then(() => {
                        _this.$axios.post({
                            url: item.code,
                            data: {id:row.id,status:'resetPassword'},
                            callback(res) {
                                _this.getList();
                                _this.$message({
                                    type: 'success',
                                    message: '重置密码成功!'
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
            refush(){
                this.closeDetailWin()
                this.getList()
            },
            topAction(actionTag){
                this.topUrl='/manage/sysManage/userSave.htm'
                if(actionTag=="Add"){
                    this.dialogFormVisible=true
                    this.rest()
                }
            },
            rest(){
              this.formInit.id=''
              this.formInit.number=''
              this.formInit.name=''
              this.formInit.userName=''
              this.formInit.roleIds=[]
              this.formInit.mobile=''
              this.formInit.phone=''
              this.formInit.email=''
              this.formInit.remark=''
            },
            cancel(){
                this.dialogFormVisible=false
            },
            ensure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        _this.formInit.roleIds = _this.formInit.roleIds.toString();

                        _this.formLoading=true;
                        _this.$axios({
                            url: _this.topUrl,
                            method: "post",
                            data: _this.formInit,
                        }).then(res => {
                              _this.formLoading=false;
                                _this.getList();
                                _this.dialogFormVisible=false
                        }).catch(err => {

                        })
                    } else {

                        return false;
                    }
                });
            },
            handleClose(){
                this.dialogFormVisible=false
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
