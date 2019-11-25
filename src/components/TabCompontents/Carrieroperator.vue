//运营商通话
<template>
    <div style="height: 60vh">
        <el-button v-if="againShow" type="primary" @click="again">重新获取</el-button>
        <section v-if="show" style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto" v-loading="listLoading" v-html="htmlTpl">
            {{htmlTpl}}
        </section>
        <iframe width="100%" height="100%" :src="imgUrl"></iframe>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "carrieroperator",
        data(){
            return{
                listLoading:false,
                htmlTpl:null,
                show:false,
                againShow:false,
                imgUrl:''
            }
        },
        props:['userId','orderNo'],
        created() {
            this.getData()
        },
    //       /manage/loanother/searchTianjiReport.htm
        methods:{
            getData(){
                let _this = this;
                _this.listLoading=true
                _this.$axios.post({
                    url: '/manage/yunyingshang/report.htm',
                    data: {userId:_this.userId,reportType: "mobile"},
                    callback(res) {
                        if(res.url){
                            _this.imgUrl = res.url
                            return;
                        }
                        if(!res.content.data){
                            _this.$message('暂无数据')
                            _this.againShow=true
                            return;
                        }
                        _this.againShow=false
                        _this.htmlTpl=res.content.data;
                        _this.show=true
                        setTimeout(() => {
                            if(res.content.data){
                                $(".check-more").on("click", function () {
                                    var className = $(this).slideUp().data("class");
                                    $("." + className).slideDown()
                                });
                                $(".sidenav li").on("click", function () {
                                    $(".sidenav li").removeClass("active");
                                    $(this).addClass("active")
                                });
                                var inputInfoTop = $("#inputInfo").offset().top;
                                var basicInfoTop = $("#basicInfo").offset().top;
                                var riskAnalysisTop = $("#riskAnalysis").offset().top;
                                var userPortraitTop = $("#userPortrait").offset().top;
                                var emergencyAnalysisTop = $("#emergencyAnalysis").offset().top;
                                var areaAnalysisTop = $("#areaAnalysis").offset().top;
                                var monthlyConsumptionTop = $("#monthlyConsumption").offset().top;
                                var tripAnalysisTop = $("#tripAnalysis").offset().top;
                                var callLogTop = $("#callLog").offset().top;
                                $(window).scroll(function () {
                                    var scrolls = $(this).scrollTop();
                                    if (scrolls > 150) {
                                        $(".back-to-top").show()
                                    } else {
                                        $(".back-to-top").hide()
                                    }
                                    var activeSideNav = "#inputInfo";
                                    if (scrolls >= callLogTop) {
                                        activeSideNav = "#callLog"
                                    } else {
                                        if (scrolls >= tripAnalysisTop) {
                                            activeSideNav = "#tripAnalysis"
                                        } else {
                                            if (scrolls >= monthlyConsumptionTop) {
                                                activeSideNav = "#monthlyConsumption"
                                            } else {
                                                if (scrolls >= areaAnalysisTop) {
                                                    activeSideNav = "#areaAnalysis"
                                                } else {
                                                    if (scrolls >= emergencyAnalysisTop) {
                                                        activeSideNav = "#emergencyAnalysis"
                                                    } else {
                                                        if (scrolls >= userPortraitTop) {
                                                            activeSideNav = "#userPortrait"
                                                        } else {
                                                            if (scrolls >= riskAnalysisTop) {
                                                                activeSideNav = "#riskAnalysis"
                                                            } else {
                                                                if (scrolls >= basicInfoTop) {
                                                                    activeSideNav = "#basicInfo"
                                                                } else {
                                                                    if (scrolls >= inputInfoTop) {
                                                                        activeSideNav = "#inputInfo"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $('.sidenav li a[href="' + activeSideNav + '"]').parent().click()
                                })
                            }

                            _this.listLoading = false
                        },1 * 1000)
                    }
                })
            },
            again(){
                let _this = this;
                _this.listLoading=true
                _this.$axios.post({
                    url: '/manage/loanother/researchTianjiReportDetail.htm',
                    data: {userId:_this.userId,reportType: "mobile",orderNo:_this.orderNo},
                    callback(res) {
                        if(res.code==2000){
                            _this.getData()
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
.sidebar-container{
    display: none!important;
}
</style>