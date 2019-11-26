<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('coll.JobNumber')">
                <el-input style="width: 130px" v-model="formInline.number"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.name')">
                <el-input style="width: 130px" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('coll.Role')" v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.roleId" :placeholder="$t('coll.Role')">
                    <el-option v-for="(item,index) in allList.roleList" :label="item.name" :key="index"  :value="item.id">{{item.name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('coll.RoleStatus')"  v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.status" :placeholder="$t('coll.RoleStatus')">
                    <el-option v-for="(item,index) in allList.userStateList" :label="item" :key="index"  :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{$t('table.query')}}</el-button>
                <el-button type="primary" @click="Reset">{{$t('table.reset')}}</el-button>
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
