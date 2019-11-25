<template>
    <section>
        <el-dialog title="收货地址" :visible.sync="showAdd" append-to-body width="50%" :before-close="AddClose">
            <el-form :model="form" :rules="rules" ref="feedForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('table.name')" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.borrowName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('table.phone')" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.phone" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="金额" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.amount" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('tab.BorrowingTime')" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.borrowTime" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="预计还款时间" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.repayTime" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('tab.DaysOverdue')" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.penaltyDay" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="罚息" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.penaltyAmout" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="逾期等级" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.level" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="催收人" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.userName" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('tab.Theorderstatus')" :label-width="formLabelWidth">
                            <el-input disabled v-model="rowList.state" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="催收时间" prop="createTime" :label-width="formLabelWidth">
                            <el-date-picker
                                    v-model="form.createTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="催收方式" prop="way" :label-width="formLabelWidth">
                            <el-select v-model="form.way" placeholder="请选择活动区域">
                                <el-option v-for="item in wayList" :label="item.itemValue" :value="item.itemCode"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="催收结果" prop="state" :label-width="formLabelWidth">
                            <el-select v-model="form.state" placeholder="请选择活动区域" @change="checkState">
                                <el-option label="请选择" value="">请选择</el-option>
                                <el-option label="催收中" value="20"></el-option>
                                <el-option label="承诺还款" value="30"></el-option>
                                <el-option label="坏账" value="50"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="promise" prop="promiseTime" label="承诺还款时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    v-model="form.promiseTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="催收反馈" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('feedForm')">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    // value-format="yyyy-MM-dd HH:mm:ss"
    import axios from 'axios';
    export default {
        name: "add-feedback",
        props:['rowList'],
        data() {
            return {
                showAdd:true,
                form: {
                    createTime: '',
                    way: '',
                    state: '',
                    promiseTime: '',
                    remark: '',
                },
                formLabelWidth: '120px',
                wayList:{},
                promise:false,
                rules: {
                    way: [
                        { required: true, message: '请选择催收方式', trigger: 'change' }
                    ],
                    createTime: [
                        {  required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    promiseTime: [
                        {  required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    state: [
                        { required: true, message: '请选择催收结果', trigger: 'change' }
                    ],
                }
            }
        },
        created() {
            this.getWay()
        },
        methods:{
            getWay(){
                let _this=this
                _this.$axios.post({
                    url: '/manage/loanother/collFindDict.htm',
                    data: {current:1,pageSize:100,code:'URGE_WAY'},
                    callback(res) {
                        _this.wayList = res.content.data;
                    }
                })
            },
            AddClose(done){
                let _this = this;
                this.$confirm(_this.$t('tab.Confirmshutdown'))
                    .then(_ => {
                        _this.$emit('closeAdd',false)
                        done();
                    })
                    .catch(_ => {});
            },
            cancel(){
                let _this = this;
                _this.$emit('closeAdd',false)
            },
            checkState(state){
                if(state==30){
                    this.promise=true
                }else {
                    this.promise=false
                }
            },
            submitForm(formName){
                let _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.form.dueId=_this.rowList.id
                        if(!_this.form.promiseTime){
                            delete(_this.form.promiseTime )
                        }
                        _this.$axios.post({
                            url: '/manage/loanother/saveOrderInfo.htm',
                            data: _this.form,
                            callback(res) {
                                _this.$emit('closeAdd',false)
                            }
                        })
                    } else {

                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
