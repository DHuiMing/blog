<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="工号">
                <el-input style="width: 130px" v-model="formInline.number"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input style="width: 130px" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="角色" v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.roleId" placeholder="角色">
                    <el-option v-for="(item,index) in allList.roleList" :label="item.name" :key="index"  :value="item.id">{{item.name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色状态"  v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.status" placeholder="角色状态">
                    <el-option v-for="(item,index) in allList.userStateList" :label="item" :key="index"  :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Reset">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        name: "seach-form",
        props:['allList'],
        data() {
            return {
                isShow:false,
                formInline: {
                    number:'',
                    name:'',
                    roleId:'',
                    status: ''
                },
                searchList:{}
            }
        },
        created() {
            setTimeout(() => {
                this.isShow=true
            }, 0.5 * 1000)
        },
        methods: {
            onSubmit() {
                this.$emit('changeParmas', this.formInline)
            },
            Reset(){
                this.formInline={};
                this.$emit('changeParmas', {})
            }
        }
    }
</script>

<style scoped>
    .search-form{
        background-color: #fff;
        padding: 16px 10px 0px 10px;
        margin-bottom: 10px;
        border-radius: 6px;
    }
</style>