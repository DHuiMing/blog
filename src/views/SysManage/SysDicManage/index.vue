<!--字典管理-->
<template>
  <div class="TimedTaskList">
            <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <div class="con">
      <seach-form @changeParmas="passParmas($event)"></seach-form>
      <list ref="list"></list>
    </div>
  </div>
</template>

<script>
import SeachForm from './Components/SeachForm';
import List from './Components/List';
export default {
    name: 'TimedTaskList',
    data(){
        return{

        }
    },
    components: {
        List,
        SeachForm
    },
    mounted(){
    },
    methods:{
        passParmas(childValue){
            this.$refs.list.changeData(childValue);
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
