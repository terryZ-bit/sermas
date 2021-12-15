<template>
  <div id="mainPage">

    <el-container>
      <el-header height="40px">
        <public-header :button_list="[$route.params.login_info]"></public-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="main-aside" v-show="choose_user_role">
            <p>
              这是侧边栏部分
            </p>
          </div>
        </el-aside>
        <el-main>

          <!--  已经选择角色部分 -->
          <div v-show="choose_user_role" class="main-page-main">

          </div>

          <!--  未选择角色部分 -->

          <div v-show="!choose_user_role" class="main-page-choose-role">
            <h1>请
              <span style="color: #4e7ad2">选择</span>
              或者
              <span style="color: #4e7ad2">创建</span>
              一个角色登入：</h1>
            <el-empty description="还没有角色" v-show="((!role_num) && (!newRoleCardAllowed))">
              <el-button type="primary" plain @click="newRole">创建角色</el-button>
            </el-empty>

            <div class="main-page-role-list" v-show="((role_num) && (!newRoleCardAllowed))" v-for="role in role_list" :key="role.role_name">
              <el-button icon="el-icon-user-solid" @click="loginRole(role.role_id, role.role_name, role.role)" :loading="role_check_loading">
                {{role.role_name}}
              </el-button>
            </div>
            <el-button icon="el-icon-upload2" v-show="(role_num && (!newRoleCardAllowed))" plain @click="newRole">
              新建一个角色
            </el-button>

            <transition name="el-zoom-in-center">
              <new-role-card v-show="newRoleCardAllowed" @rollCardRollBack="roleCardRollBack">
              </new-role-card>
            </transition>

          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import PublicHeader from "../publicComponents/header";
import NewRoleCard from "./newRoleCard";
import axios from "axios";
export default {
  name: "mainPage",
  components: {NewRoleCard, PublicHeader},

  data() {
    return {
      choose_user_role: false,
      newRoleCardAllowed: false,
      role_list: this.$route.params.role_list,
      role_num: this.$route.params.role_num,
      role_check_loading: false
    }
  },

  props:[

  ],

  methods: {
    newRole() {
      this.newRoleCardAllowed = true
    },

    roleCardRollBack() {
      this.newRoleCardAllowed = false
      axios
        .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/get-role-list/',
            {
              params: {
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token')
              }
            }
        ).then(resp => {
          console.log(resp)
          this.role_list = resp.data.data.role_list
          this.role_num = resp.data.data.role_num
        }).catch(error => {
          console.log(error)
          if (error.response.data === 'token time out') {
            this.$message.error('由于长时间未操作，登录身份已过期，请重新登录！！！')
            this.$router.push('/')
          }else if (error.response.data === 'check role error') {
            this.$message.error('查寻角色发生错误，请联系管理员')
            this.$router.push('/')
          }
      })
    },

    loginRole(role_id, role_name, role) {
      // axios
      //   .get('',
      //       {
      //         params: {
      //           role_id: role_id
      //         }
      //       })
      this.role_check_loading = true
      this.$message.success(role_id)

      this.$router.push({
        name: 'home',
        params: {
          email: localStorage.getItem('email'),
          role_id: role_id,
          role_name: role_name,
          role: role,
        }
      })
    }
  }
}
</script>

<style lang="less">

#mainPage {
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(90deg, rgb(195, 195, 195),rgb(228, 228, 228)); background-blend-mode:overlay,overlay,overlay,normal;

    .el-header {
      display: flex;
      flex-direction: column;
    }

    .el-footer {
    }

    .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;

      .main-page-choose-role {
        display: flex;
        flex-direction: column;
        width: 100%;
        p {
          margin-right: auto;
        }
        h1 {
          margin-right: auto;
        }

        .el-empty {
          margin-right: auto;
        }

        .el-button {
          margin-right: auto;
          margin-left: 0;
          margin-top: 20px;
          width: 200px;
        }

        .main-page-role-list {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}

#return_button {
  width: 20px !important;
}
</style>