<template>
<div id="main-aside">
  <el-menu
      default-active="2"
      class="el-menu-vertical-role-1"
      @open="handleOpen"
      @close="handleClose"
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
      @open="handleOpen"
      @close="handleClose"
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
</template>

<script>
export default {
  name: "homeAside",
  data() {
    return {
      role: localStorage.getItem('role')
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  created() {

  }
}
</script>

<style lang="less" scoped>
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
</style>