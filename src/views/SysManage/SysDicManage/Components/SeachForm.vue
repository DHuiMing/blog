<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('coll.DictType')">
                <el-input style="width: 130px" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('coll.Typecode')">
                <el-input style="width: 130px" v-model="formInline.code"></el-input>
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
                formInline: {
                    name:'',
                    code:''
                },
            }
        },
        created() {
        },
        methods: {
            onSubmit() {
                this.$emit('changeParmas', this.formInline)
                // this.params.searchParams=JSON.stringify(this.params.searchParams);
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
