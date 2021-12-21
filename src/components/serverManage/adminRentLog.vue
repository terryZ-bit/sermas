<template>
  <div id="admin-rent-log">
    <div class="admin-rent-log-main">
      <template>
        <el-table
            :data="table_data"
            border
            style="width: 100%">
          <el-table-column
              fixed
              prop="rent_log_id"
              label="租用编号"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="server_id"
              label="服务器编号"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="role_name"
              label="租用人"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="begin_time"
              label="开始时间"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="end_time"
              label="结束时间"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="rent_status"
              label="租用状态"
              width="100">
          </el-table-column>
          <el-table-column
              fixed
              prop="is_accord"
              label="是否为主动退租"
              width="100">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="letUnRent(scope.row.rent_log_id, scope.row.server_id)" :disabled="scope.row.rent_status === '正在租用'">停止租用</el-button>
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
  name: "adminRentLog",
  data() {
    return {
      table_data: []
    }
  },

  mounted() {
    this.listAllRentServer()
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },

    letUnRent() {

    },

    listAllRentServer() {
      axios
          .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend.LATEST/list-rent-server/', {
            params: {
              email: localStorage.getItem('email'),
              token: localStorage.getItem('token'),
              role: localStorage.getItem('role'),
              role_id: localStorage.getItem('role_id'),
              org_id: localStorage.getItem('org_id')
            }
          })
      .then(resp => {
        console.log(resp)
        this.$message.success('刷新租用列表成功')
        this.table_data = resp.data.server_list
      })
      .catch( err => {
        console.log(err)
        this.$message.error('刷新列表失败')
      })
    }
  }
}
</script>

<style scoped>

</style>