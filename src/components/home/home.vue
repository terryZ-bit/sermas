<template>
  <div id="home">
    <el-container>

      <el-header height="40px">
        <public-header :button_list="[$route.params.email, $route.params.role_name]"></public-header>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <div id="main-aside">
            <el-menu
                default-active="2"
                class="el-menu-vertical-role-1"
                v-if="role==='1'"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-platform"></i>
                  <span>控制台</span>
                </template>
                <el-menu-item index="1-1" >我的服务器</el-menu-item>
                <el-menu-item index="1-2" >服务器市场</el-menu-item>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">组织管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>设置</span>
                </template>
                <el-menu-item index="3-1">角色设置</el-menu-item>
                <el-menu-item index="3-2">个人设置</el-menu-item>
              </el-submenu>
            </el-menu>


            <el-menu
                default-active="2"
                class="el-menu-vertical-role-2"
                v-if="role==='2'"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-platform"></i>
                  <span>控制台</span>
                </template>
                <el-menu-item index="1-1" >组织服务器管理</el-menu-item>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">组织管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>设置</span>
                </template>
                <el-menu-item index="3-1">角色设置</el-menu-item>
                <el-menu-item index="3-2">个人设置</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>

        <el-main>
          <div id="home-main">

            <!-- 欢迎界面显示控制台    -->
            <ctrl-lab></ctrl-lab>
          </div>
        </el-main>

      </el-container>


    </el-container>
  </div>
</template>

<script>

import PublicHeader from "../publicComponents/header";
import CtrlLab from "../ctrlLab/ctrlLab";
export default {
  name: "home",
  components: {CtrlLab, PublicHeader},

  data() {
    return {
      is_ctrl_show: true,
      role: localStorage.getItem('role')
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%,rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%,rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%,rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%,rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%,rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%,rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),linear-gradient(90deg, rgb(195, 195, 195),rgb(228, 228, 228)); background-blend-mode:overlay,overlay,overlay,normal;


  .el-container {
    height: 100%;
    width: 100%;

    .el-aside {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border-top: 1px;
      border-radius: 0;

      #main-aside {
        height: 100%;
        width: 100%;

        .el-menu {
          all: unset;
          text-align: left;
        }

        .el-submenu {
          all: unset;
        }
      }
    }

    .el-main {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border-top: 1px;
      border-radius: 0
    }
  }
}
</style>