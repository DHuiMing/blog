<template>
    <div>
        <el-dialog title="权限分配" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-button @click="allCheck">全选</el-button>
            <el-button @click="allNoCheck">全不选</el-button>
            <el-tree
                    :data="list"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="defaultKeys"
                    :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="ensure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "detailWin",
        data() {
            return {
                dialogFormVisible: false,
                list: [],
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                defaultKeys:[],
                rowData:{},
                allKey:[],
            };
        },
        components: {},
        mounted() {

        },
        methods: {
            getUserInfo(code, data, title) {
                let _this = this
                _this.rowData=data
                _this.dialogFormVisible=true
                _this.getlist(data.id)
            },
            getlist(id) {
                let _this = this
                _this.$axios.post({
                    url: '/manage/sysManage/findRoleMenuHas.htm',
                    data: {roleId:id},
                    callback(res) {
                       let content = res.content
                        for(let i=0;i<content.length;i++){
                           let p1 =  content[i]
                            p1.id=p1.value;
                            _this.allKey.push(p1.value)
                           if(p1.checked==1){
                                _this.defaultKeys.push(p1.value)
                           }
                           if(p1.children && p1.children.length>=1){
                                for(let j=0;j<p1.children.length;j++){
                                    let p2 = p1.children[j];
                                    p2.id=p2.value;
                                    _this.allKey.push(p2.value)
                                    if(p2.checked==1){
                                        _this.defaultKeys.push(p2.value)
                                    }
                                    if(p2.children && p2.children.length){
                                        for (let k=0;k<p2.children.length;k++){
                                            let p3 = p2.children[k];
                                            p3.id=p3.value;
                                            _this.allKey.push(p3.value)
                                            if(p3.checked==1){
                                                _this.defaultKeys.push(p3.value)
                                            }
                                        }
                                    }
                                }
                           }
                        }
                        _this.list = res.content;
                    }
                })
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            ensure(){
                let _this = this
                let checkKeys = _this.$refs.tree.getCheckedKeys();
                if(checkKeys.length<1){
                    _this.$message({
                        message: '权限不能为空!',
                        type: 'warning'
                    });
                    return;
                }
                let newList = JSON.stringify(checkKeys).replace('[',"");
                _this.$axios.post({
                        url: '/manage/sysManage/updateRoleMenuHas.htm',
                        data: {roleId: _this.rowData.id,menus:newList.replace(']','')},
                        callback(res) {

                            _this.$message({
                                message: '分配成功',
                                type: 'success'
                            });
                            _this.dialogFormVisible = false
                            _this.$emit('hideWin', true)
                        }
                    })
            },
            cancel(){
                this.dialogFormVisible = false
                this.$emit('hideWin', true)
            },
            handleClose(done) {
                let _this = this;
                this.$confirm(_this.$t('tab.Confirmshutdown'))
                    .then(_ => {
                        _this.$emit('hideWin', true)
                        done();
                    })
                    .catch(_ => {});
            },
            allCheck(){
                this.$refs.tree.setCheckedKeys(this.allKey);
            },
            allNoCheck(){
                this.$refs.tree.setCheckedKeys([]);
            }
        }
    }
</script>

<style scoped>

</style>
