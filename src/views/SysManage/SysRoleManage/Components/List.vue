<template>
    <section>
        <div  style="margin: 4px 0;background-color: #fff;padding: 4px 20px;display: flex;justify-content: space-between;">
            <div></div>
            <div><el-button size="small" type="primary" @click="handleAction('Add')">新增</el-button></div>
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
            <el-table-column label="角色名称"  prop="name" fixed  align="center" width="200px">
            </el-table-column>
            <el-table-column label="角色唯一标示"  prop="nid" fixed  align="center" width="120px">
            </el-table-column>
            <el-table-column label="创建时间" prop="addTime" width="220px"  align="center">
            </el-table-column>
            <el-table-column label="修改时间" prop="updateTime" width="180px" align="center">
            </el-table-column>
            <el-table-column label="修改人" prop="updateUser" width="150px" align="center">
            </el-table-column>
            <el-table-column label="备注" prop="remark" width="300px"    align="center">
            </el-table-column>
            <el-table-column label="是否停用" fixed="right" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.isValid==0?"否" : "是"}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="300px" align="center">
                <template slot-scope="scope">
                    <span class="cz"  @click="handleAction('Edit',scope.row)">编辑</span>
                    <span class="cz"  @click="handleAction('Del',scope.row)">删除</span>
                    <span class="cz"  @click="handleAction('Allot',scope.row)">分配权限</span>
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

        <el-dialog title="新增" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :before-close="handleClose" v-loading="formLoading">
            <el-form :model="formInit" style="margin-right: 20px" ref="form">
                <el-row :gutter="20">
                    <el-col :span="1" style="display: none;">
                        <el-form-item label="角色名称" prop="id" :label-width="formLabelWidth">
                            <el-input v-model="formInit.id" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth" :rules="[{ required: true, message: '角色名称不能为空'}]">
                            <el-input v-model="formInit.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色唯一标示" prop="nid" :label-width="formLabelWidth" :rules="[{ required: true, message: '角色唯一标示不能为空'}]">
                            <el-input v-model="formInit.nid" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="11">
                        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                            <el-input v-model="formInit.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="isValid" :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
                            <el-select v-model="formInit.isValid"  placeholder="状态">
                                <el-option v-for="item in options" :key="item.value"  :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="height: 60px">
                    <el-form-item  style="float: right;margin-top: 20px">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="ensure('form')">确 定</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>
      <detail-win v-if="detailWinShow" @refush="refush($event)" @hideWin="hideWin($event)"  ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win>
    </section>
</template>

<script>
  import DetailWin from './AssignPermissions'
    export default {
        name: "list",
        components: {
          DetailWin
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
                        state:22
                    }
                },
                currentPage: 1,
                detailWinShow:false,
                isDisabled:false,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                formInit:{
                    id:'',
                    name:'',
                    nid:'',
                    remark:'',
                    isValid:''
                },
                options: [{
                    value: '0',
                    label: '启用'
                }, {
                    value: '1',
                    label: '禁用'
                }],
                formLoading:false,
                topUrl:'',
            }
        },
        computed:{
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                let _this = this
                _this.listLoading = true;
                this.$axios({
                    url: "/portal/sysManage/roleList.htm",
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
                if(actionTag=='Edit'){
                    this.dialogFormVisible=true
                    this.formInit.id=row.id
                    this.formInit.isValid=row.isValid==1?'禁用':'启用'
                    this.formInit.name=row.name
                    this.formInit.nid=row.nid
                    this.formInit.remark=row.remark
                }else if(actionTag=='Add'){
                    this.dialogFormVisible=true
                }else if(actionTag=="Del"){
                    this.$confirm('是否确定删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$axios({
                            url: "/portal/sysManage/roleDelete.htm",
                            method: "post",
                            data: {roleId:row.id},
                        }).then(res => {
                                _this.getList();
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消该操作'
                        });
                    });

                }else if(actionTag=="Allot"){
                    this.detailWinShow=true
                    setTimeout(() => {
                        this.$refs.deatilwin.getUserInfo(actionTag,row,'分配权限');
                    }, 0.5 * 1000)
                }
            },
            cancel(){
                this.dialogFormVisible=false
            },
            ensure(formName){
              let _this = this;
              _this.formLoading=true;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                  if(this.formInit.isValid=='启用'){
                      this.formInit.isValid=0
                  }else if(this.formInit.isValid=='禁用'){
                      this.formInit.isValid=1
                  }
                  _this.$axios({
                    url: "/portal/sysManage/roleSaveOrUpdate.htm",
                    method: "post",
                    data: _this.formInit
                  }).then(data => {
                    _this.formLoading=false;
                    _this.handleClose()
                  }).catch(err => {

                  })
                } else {
                  return false;
                }
              });
            },
            handleClose(){
                this.dialogFormVisible=false
                this.getList();
            },

            hideWin(){
                this.detailWinShow=false
            },
            closeDetailWin(){
                this.detailWinShow=false
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
