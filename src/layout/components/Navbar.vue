<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!-- <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->

        <lang-select class="right-menu-item hover-effect" />
        <!--
             <div class="user-info" v-if="usermsg">
            <span>
                欢迎您, {{userMsg.name}}
            </span>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    切换角色<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="item in userMsg.roleList" :key="item.id" :command="item.id">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>-->
      </template>
      <el-dropdown @command="handleCommand" class="right-menu-item hover-effect">
        <span class="el-dropdown-link checkrole" style="font-size:14px;">
          {{ $t('navbard.SwitchRoles') }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in userMsg.roleList"
            :key="item.id"
            :command="item.id"
          >{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <span class="el-dropdown-link checkrole" style="font-size:14px;">
           {{userMsg.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
import Search from "@/components/HeaderSearch";

export default {
  data() {
    return {
      avatar: require("../../assets/logo.jpg"),
      userMsg: {},
      usermsg: false
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },
  computed: {
    ...mapGetters(["sidebar", "device"])
  },
  created() {
    let _this = this;
    _this
      .$axios({
        method: "post",
        url: "/system/user/userRoleFind.htm",
        data: {}
      })
      .then(res => {
        _this.userMsg = res.content;
        _this.usermsg = true;
      })
      .catch(err => {});
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/FedLogOut");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleCommand(command) {
      let _this = this;
      _this
        .$confirm("你真的要切换吗?", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this
            .$axios({
              method: "post",
              url: "/system/user/switch/role.htm",
              data: { role: command }
            })
            .then(res => {
              _this.$router.push('/data/dataInfo')
              window.location.reload();
            })
            .catch(err => {});
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.checkrole {
  display: inline-block;
  font-size: 20px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
