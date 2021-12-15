<template>
  <div id="ctrl-lab">
    <div class="role_welcome_title">
      <h1 class="ctrl-main-h1">您好！
        <span style="color: #698fd9">{{role_name}}</span>
      </h1>
    </div>

    <div class="role-welcome-info-card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我租用的服务器</span>
          <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>

    <div class="role-welcome-org-card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>组织通知</span>
          <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ctrlLab",

  data() {
    return {
      role_name: localStorage.getItem("role_name"),
    }
  }
}
</script>

<style lang="less" scoped>
#ctrl-lab {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;


  .ctrl-main-h1 {
    float: left;
  }

  .role-welcome-info-card {
    float: left;
    text-align: left;
  }

  .role-welcome-org-card {
    padding-top: 30px;
    float: left;
    text-align: left;
  }
}
</style>