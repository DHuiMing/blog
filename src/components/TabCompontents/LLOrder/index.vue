<!--分期订单详情-->
<template>
  <div class="LoanManage">
      <seach-form @changeParmas="passParmas($event)"></seach-form>
      <list ref="list" v-bind:id="userId" v-bind:items="item"></list>
  </div>
</template>

<script>
import SeachForm from './Components/SeachForm';
import List from './Components/List';
export default {
    name: 'LoanManage',
    props:['userId','item'],
    data(){
        return{
            power:""
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
