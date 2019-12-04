<template>
  <div
    v-loading="loading"
    style="background-color: #fff;padding-top: 10px;overflow: auto;min-height:500px;"
  >
    <el-tabs v-if="show" v-model="active" type="card" @tab-click="handleClick">
      <!--用户管理-->
      <el-tab-pane :label="$t('tab.BasicInfo')" name="first">
        <el-row v-if="dataList.userIdentificationInfo">
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.selfie')}}</div>
            <div class="tup" v-if="dataList.userIdentificationInfo && dataList.userIdentificationInfo.livingProofImg">
              <el-popover placement="right" trigger="click">
                <img class="max-img" :src="path+'/'+path+'/'+dataList.userIdentificationInfo.livingProofImg.split(';')[0] || noImg">
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.userIdentificationInfo.livingProofImg.split(';')[0] || noImg">
                </el-button>
              </el-popover>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.IDphoto')}}</div>
            <div class="tup">
              <el-popover placement="right" trigger="click">
                <img class="max-img" :src="path+'/'+dataList.IDPhoto || noImg">
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.IDPhoto || noImg">
                </el-button>
              </el-popover>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-dark">{{$t('tab.SimilarityLevel')}}</div>
            <div class="tup" style='font-weight: bold;height:50px;line-height:50px;font-size:24px;'>
              {{(dataList.Similarity*100).toFixed(2)}}%
            </div>
          </el-col>
        </el-row>
        <el-row v-if="dataList.userIdentificationInfo">
             <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.AadhaarFont')}}</div>
            <div class="tup" v-if="dataList.userIdentificationInfo && dataList.userIdentificationInfo.aadhaarCardFrontImg">
              <el-popover placement="right" trigger="click">
                <img
                  class="max-img"
                  :src="path+'/'+dataList.userIdentificationInfo.aadhaarCardFrontImg || noImg"
                >
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.userIdentificationInfo.aadhaarCardFrontImg || noImg">
                </el-button>
              </el-popover>
            </div>
            <p style="text-align: center">AadhaarNo: {{dataList.userIdentificationInfo.aadhaarNumber}}</p>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.AadhaarBack')}}</div>
            <div class="tup">
              <el-popover placement="right" trigger="click">
                <img class="max-img" :src="path+'/'+dataList.userIdentificationInfo.aadhaarCardBackImg || noImg">
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.userIdentificationInfo.aadhaarCardBackImg || noImg">
                </el-button>
              </el-popover>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.PANFont')}}</div>
            <div class="tup">
              <el-popover placement="right" trigger="click">
                <img class="max-img" :src="path+'/'+dataList.userIdentificationInfo.panCardFrontImg|| noImg">
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.userIdentificationInfo.panCardFrontImg || noImg">
                </el-button>
              </el-popover>
            </div>
            <p style="text-align: center">PAN: {{dataList.userIdentificationInfo.panNumber}}</p>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">{{$t('tab.PANBack')}}</div>
            <div class="tup">
              <el-popover placement="right" trigger="click">
                <img
                  class="max-img"
                  :src="path+'/'+dataList.userIdentificationInfo.panCardBackImg || noImg"
                >
                <el-button slot="reference" class="small-img">
                  <img :src="path+'/'+dataList.userIdentificationInfo.panCardBackImg || noImg">
                </el-button>
              </el-popover>
            </div>
          </el-col>
        </el-row>

        <el-form ref="form" label-width="100px" v-if="dataList.userBaseInfo">
          <el-row>
            <el-col :span="4">
              <el-form-item :label="$t('tab.LastName')">
                <el-input disabled v-model="dataList.userBaseInfo.lastName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="$t('tab.FirstName')">
                <el-input disabled v-model="dataList.userBaseInfo.firstName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('table.gender')">
                <el-input disabled v-model="dataList.userBaseInfo.genderDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.Age')">
                <el-input disabled v-model="dataList.userBaseInfo.age"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.DOB')">
                <el-input disabled v-model="dataList.userBaseInfo.dateOfBirth"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.PersonalEmail')">
                <el-input disabled v-model="dataList.userBaseInfo.personalEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.PhoneNumber')">
                <el-input disabled v-model="dataList.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.MaritalStatus')">
                <el-input disabled v-model="dataList.userBaseInfo.maritalStatusDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.EducationLevel')">
                <el-input disabled v-model="dataList.userBaseInfo.educationLevelDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.LoanPopurse')">
                <el-input disabled v-model="dataList.userBaseInfo.loanPopurseDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
             <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.State')">
                <el-input disabled v-model="dataList.userBaseInfo.stateDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.City')">
                <el-input disabled v-model="dataList.userBaseInfo.cityDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.Pincode')">
                <el-input disabled v-model="dataList.userBaseInfo.pincode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('tab.Address')">
                <el-input disabled v-model="dataList.userBaseInfo.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('tab.RegisterAddress')">
                <el-input disabled v-model="dataList.userBaseInfo.registerAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.Geographiccoordinates')">
                <el-input disabled v-model="dataList.userBaseInfo.geographicCoordinates"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.NearbyLandmark')">
                <el-input disabled v-model="dataList.userBaseInfo.nearbyLandmark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.TypeofResidence')">
                <el-input disabled v-model="dataList.userBaseInfo.typeOfResidenceDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.LengthofResidence')">
                <el-input disabled v-model="dataList.userBaseInfo.currentResidenceYearsDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="dataList.userIdentificationInfo && dataList.userIdentificationInfo.addressProofImg">
              <el-form-item :label="$t('tab.AddressProof')">
                <div style="display: flex;justify-content: space-around;margin-left:350px;">
                  <el-popover style="margin-left:10px;"  placement="right" trigger="click" v-for="(item,index) in dataList.userIdentificationInfo.addressProofImg.split(';')" :key="index">
                    <img
                      class="max-img"
                      :src="path+'/'+item"
                    >
                    <el-button slot="reference" class="small-img">
                      <img :src="path+'/'+item">
                    </el-button>
                  </el-popover>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!--配置管理-->
      <el-tab-pane :label="$t('tab.ComanyProof')" name="2">
        <el-form ref="form" label-width="100px" v-if="dataList.userJobInfo">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.EmployeeType')">
                <el-input disabled v-model="dataList.userJobInfo.employeeTypeDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.MonthlySalary')">
                <el-input disabled v-model="dataList.userJobInfo.monthlySalaryDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.SalaryMode')">
                <el-input disabled v-model="dataList.userJobInfo.salaryModeDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.CompanyName')">
                <el-input disabled v-model="dataList.userJobInfo.companyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.ComanyType')">
                <el-input disabled v-model="dataList.userJobInfo.companyTypeDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.CompanyPincode')">
                <el-input disabled v-model="dataList.userJobInfo.companyPincode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.Profession')">
                <el-input disabled v-model="dataList.userJobInfo.professionDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.WorkEmail')">
                <el-input disabled v-model="dataList.userJobInfo.workEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.YearsofThisJob')">
                <el-input disabled v-model="dataList.userJobInfo.yearsOfThisJobDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.TotalWorkExperience')">
                <el-input disabled v-model="dataList.userJobInfo.totalWorkExperienceDescribetion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('tab.CompanyAddress')">
                <el-input disabled v-model="dataList.userJobInfo.companyAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="dataList.userIdentificationInfo">
              <el-form-item :label="$t('tab.CompanyProof')">
                <div style="display: flex;justify-content: space-around;margin-left:350px;">
                  <el-popover style="margin-left:10px;"  placement="right" trigger="click" v-for="(item,index) in dataList.userIdentificationInfo.companyProofImg.split(';')" :key="index">
                    <img
                      class="max-img"
                      :src="path+'/'+item"
                    >
                    <el-button slot="reference" class="small-img">
                      <img :src="path+'/'+item">
                    </el-button>
                  </el-popover>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.SocailInfo')" name="3">
        <el-form ref="form" label-width="100px" v-if="dataList.userSocialInfo">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.FatherName')">
                <el-input disabled v-model="dataList.userSocialInfo.fatherName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.MotherName')">
                <el-input disabled v-model="dataList.userSocialInfo.motherName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.EmegencyContact')">
                <el-input disabled v-model="dataList.userSocialInfo.contact1Name"></el-input>
              </el-form-item>
            </el-col>
               <el-col :span="8">
              <el-form-item :label="$t('tab.Relation')">
                <el-input disabled v-model="dataList.userSocialInfo.familyContactsDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.phonenumber')">
                <el-input disabled v-model="dataList.userSocialInfo.contact1PhoneNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.EmegencyContact')">
                <el-input disabled v-model="dataList.userSocialInfo.contact2Name"></el-input>
              </el-form-item>
            </el-col>
                <el-col :span="8">
              <el-form-item :label="$t('tab.Relation')">
                <el-input disabled v-model="dataList.userSocialInfo.otherRefenceDescribetion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.phonenumber')">
                <el-input disabled v-model="dataList.userSocialInfo.contact2PhoneNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.BankInfo')" name="4">
        <el-form ref="form" label-width="100px" v-if="dataList.userPayInfo">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.BankName')">
                <el-input disabled v-model="dataList.userPayInfo.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.IFSCCode')">
                <el-input disabled v-model="dataList.userPayInfo.ifscCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tab.AccountName')">
                <el-input disabled v-model="dataList.userPayInfo.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tab.AccountNumber')">
                <el-input disabled v-model="dataList.userPayInfo.accountNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "user-info",
  data() {
    return {
      isShow: false,
      loading: true,
      form: {},
      dataList: {},
      active: "first",
      show: false,
      noImg: require("../../assets/noImg.png"),
      path:'http://47.97.172.192:6080',
    };
  },
  props: ["userId"],
  created() {
    this.getUser(this.userId);
  },
  methods: {
    getUser(userId) {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "manage/loanother/userDetail.htm",
          data: { userId: userId }
        })
        .then(res => {
          _this.loading = false;
          _this.dataList = res.content;

          if (res.content) {
            _this.show = true;
          } else {
            _this.$message({
              message: _this.$t('tem.nodata'),
              type: "warning"
            });
          }
          setTimeout(() => {
            _this.loading = false;
            _this.isShow = true;
          }, 0.5 * 1000);
        })
        .catch(err => {
          _this.loading = false;
        });
    },
    handleClick() {},
    showBigImg(src) {}
  }
};
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
  margin-left: 20px;
  text-align: center;
  margin: 0 auto;
}
.tup {
  display: flex;
  justify-content: space-around;
}
.small-img img {
  height: 150px;
  border-radius: 14px;
}
.max-img {
  max-height: 500px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-row {
  padding: 0.4rem;
}

.list-top {
  border-bottom: 1px solid gainsboro;
  height: 10px;
  line-height: 2px;
}
.list-write {
  text-align: center;
}
.el-input__inner {
  color: #606266 !important;
}
</style>
