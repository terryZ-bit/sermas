<template>
  <div id="role-person-manage">

    <div class="role-person-manage-main">
      <div class="role-person-choose-role">
        <el-button  @click="clickChooseList(1)" :type="chooseUserList">用户列表</el-button>
        <el-button  @click="clickChooseList(2)" :type="chooseManagerList">管理员列表</el-button>
      </div>
      <template>
        <el-table
            :data="table_data"
            border
            style="width: 100%">
          <el-table-column
              fixed
              prop="role_id"
              label="成员编号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="role_name"
              label="成员名字"
              width="120">
          </el-table-column>
          <el-table-column
              prop="user_email"
              label="主账号邮箱"
              width="200">
          </el-table-column>
          <el-table-column
              prop="role_phone"
              label="成员电话"
              width="120">
          </el-table-column>
          <el-table-column
              prop="role_create_time"
              label="成员创建时间"
              width="250">
          </el-table-column>
          <el-table-column
              prop="role_status"
              label="成员状态"
              width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="freezeRole(scope.row)">{{scope.row.role_status === '已激活' ? '冻结' : '解冻'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "rolePersonManage",
  data() {
    return {
      table_data: [],
      chooseUserList: "primary",
      chooseManagerList: "info",
    }
  },

  mounted() {
    this.listAllRoles(1)
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },

    freezeRole(row) {
      console.log(row)
      this.$confirm('确认' + (row.role_status === '已激活' ? '冻结' : '解冻') +'该角色？')
      .then( confirm => {
        console.log(confirm)
        axios
        .get('', {
          params: {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            role_id: row.role_id,
            manage_id: localStorage.getItem('role_id'),
            org_id: localStorage.getItem('org_id'),
            role: localStorage.getItem('role'),
            action: row.role_status,
          }
        })
      })
    },

    listAllRoles(choose_role) {
      console.log(choose_role)
      axios
      .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/list-org-roles/', {
        params: {
          email: localStorage.getItem('email'),
          token: localStorage.getItem('token'),
          role_id: localStorage.getItem('role_id'),
          role: localStorage.getItem('role'),
          org_id: localStorage.getItem('org_id'),
          choose_role: choose_role
        }
      })
      .then( resp => {
        console.log(resp)
        this.table_data = resp.data.role_check_list
        this.$message.success('角色列表刷新成功')
      })
      .catch( err => {
        console.log(err)
        this.$message.error('角色刷新列表失败！')
      })
    },

    clickChooseList(role) {
      this.listAllRoles(role)
      if (role === 1) {
        this.chooseUserList = "primary"
        this.chooseManagerList = "info"
      }else if (role === 2) {
        this.chooseUserList = "info"
        this.chooseManagerList = "primary"
      }
    }
  }
}
</script>

<style scoped lang="less">
#role-person-manage {

  .role-person-manage-main {

    .role-person-choose-role {

      .el-button {

        margin-bottom: 20px;
      }
    }
  }
}
</style>