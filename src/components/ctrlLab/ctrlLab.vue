<template>
  <div id="ctrl-lab">
    <div class="role_welcome_title">
      <h1 class="ctrl-main-h1">您好！
        <span style="color: #698fd9">{{role_name}}</span>
      </h1>
    </div>

    <div class="role-welcome-info-card" v-if="role==='1'">
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

    <div class="role-main-manage-card" v-if="role==='2'">
      <el-descriptions class="margin-top" title="您管理的组织" :column="3" :size="descriptons_size" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            组织名称
          </template>
          {{org_name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            联系人电话
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            驻地
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>

    </div>



    <div class="role-welcome-org-card" >
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
      role: localStorage.getItem("role"),
      org_name: localStorage.getItem("org_name"),
      org_id: localStorage.getItem("org_id"),
      descriptons_size: ''
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

  .role-main-manage-card {
    float: left;
    text-align: left;
  }
}
</style>