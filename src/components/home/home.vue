<template>
  <div id="home">
    <el-container>

      <el-header height="40px">
        <public-header :button_list="[$route.params.email, $route.params.role_name]"></public-header>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <home-aside>

          </home-aside>
        </el-aside>

        <el-main>

        </el-main>

      </el-container>


    </el-container>
  </div>
</template>

<script>

import PublicHeader from "../publicComponents/header";
import HomeAside from "./homeAside";
export default {
  name: "home",
  components: {HomeAside, PublicHeader}
}
</script>

<style lang="less">
#home {
  height: 100%;
  width: 100%;
}
</style>