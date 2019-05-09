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
                    <span class="cz"  @click="handleAction('Edit',scope.row)">编辑</span>
                    <span class="cz"  @click="handleAction('update',scope.row)">重置密码</span>
                    <span v-show="scope.row.status==0" class="cz"  @click="handleAction('lock',scope.row)">锁定</span>
                    <span v-show="scope.row.status==1" class="cz"  @click="handleAction('lock',scope.row)">解锁</span>
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

      <el-dialog :title="title" :visible.sync="dialogFormVisible" v-if="dialogFormVisible" :before-close="handleClose" v-loading="formLoading">
        <el-form :model="formInit" style="margin-right: 20px" ref="form">
          <el-row :gutter="20">
            <el-col :span="1" style="display: none;">
              <el-form-item label="" prop="id" :label-width="formLabelWidth">
                <el-input v-model="formInit.id" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth" :rules="[{ required: true, message: '用户名不能为空'}]">
                <el-input v-model="formInit.userName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="真实姓名" prop="name" :label-width="formLabelWidth" :rules="[{ required: true, message: '真实姓名不能为空'}]">
                <el-input v-model="formInit.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="角色" prop="roleId"  :label-width="formLabelWidth" :rules="[{ required: true, message: '不能为空'}]">
                <el-select v-model="formInit.roleId"  placeholder="角色">
                  <el-option v-for="item in allList.roleList" :key="item.id"  :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="formInit.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input v-model="formInit.remark" autocomplete="off"></el-input>
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
    </section>
</template>

<script>
    export default {
        name: "list",
        components: {
        },
        props:['allList'],
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
                dialogFormVisible:false,
                formLabelWidth: '120px',
                formInit:{
                  id:'',
                  number:'',
                  name:'',
                  userName:'',
                  roleId:'',
                  phone:'',
                  remark:'',
                },
                options: [{
                    value: '0',
                    label: '启用'
                }, {
                    value: '1',
                    label: '禁用'
                }],
                formLoading:false,
                title:'新增',
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
                if(actionTag=='Edit'){
                  _this.title='编辑'
                  this.rest()
                    this.dialogFormVisible=true
                    this.formInit.id=row.id
                    this.formInit.name=row.name
                    this.formInit.userName=row.userName
                    this.formInit.roleId=Number(row.roleId)
                    this.formInit.phone=row.phone
                    this.formInit.remark=row.remark
                  console.log(this.formInit)
                }else if(actionTag=='Add'){
                  _this.title='新增'
                  this.rest()
                    this.dialogFormVisible=true
                }else if(actionTag=="lock"){
                    let tip = '锁定'
                    row.status == 0?tip = '锁定':tip = '解锁'
                    this.$confirm('是否确定'+tip, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$axios({
                            url: "/portal/sysManage/userUpdate.htm",
                            method: "post",
                            data: {id:row.id,status:row.status==0?'lock':'unLock'},
                        }).then(res => {
                                _this.getList();
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!'
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

                }
            },
            cancel(){
                this.dialogFormVisible=false
            },
            ensure(formName){
              this.$refs[formName].validate((valid) => {
                if (valid) {

                  let _this = this;
                  let addUrl='/portal/sysManage/userEdit.htm';
                  if(_this.title=='新增'){
                    addUrl='/portal/sysManage/userSave.htm'
                  }
                  _this.formInit.roleId = _this.formInit.roleId.toString();

                  console.log(_this.formInit)
                  _this.formLoading=true;
                  _this.$axios({
                    url: addUrl,
                    method: "post",
                    data: _this.formInit
                  }).then(data => {
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
          rest(){
            this.formInit.id=''
            this.formInit.number=''
            this.formInit.name=''
            this.formInit.userName=''
            this.formInit.roleId=''
            this.formInit.phone=''
            this.formInit.remark=''
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
