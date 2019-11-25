<!--渠道统计-->
<template>
    <div class="CollectionTotalOrderList">
        <seach-form @changeParmas="passParmas($event)"></seach-form>
        <list ref="list"></list>
    </div>
</template>

<script>
    import SeachForm from './Components/SeachForm';
    import List from './Components/List';
    export default {
        name: 'CollectionTotalOrderList',
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

            this.power=this.$route.params
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
