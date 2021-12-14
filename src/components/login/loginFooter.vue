<template>
  <div id="login-footer">
    <el-link :underline="false" type="info">Copyright © 2021 http://www.sermas.top/ All Rights Reserved</el-link>
    <el-link :underline="false" type="info">鲁ICP备2021042343号-1</el-link>
  </div>
</template>

<script>
export default {
  name: "loginFooter"
}
</script>

<style lang="less">
#login-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .el-link {
    margin-right: 10px;
  }
}
</style>