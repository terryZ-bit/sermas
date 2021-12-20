<template>
  <div class="user-rent-server">
    <div class="user-rent-main">
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
              prop="cpu_name"
              label="CPU型号"
              width="250">
          </el-table-column>
          <el-table-column
              prop="gpu_name"
              label="GPU型号"
              width="250">
          </el-table-column>
          <el-table-column
              prop="ram"
              label="内存大小"
              width="120">
          </el-table-column>
          <el-table-column
              prop="rom"
              label="硬盘大小"
              width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="unRent(scope.row.rent_log_id, scope.row.server_id)">放弃租用</el-button>
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
  name: "userRentServer",

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

    unRent(server_rent_id, server_id) {
      this.$confirm('确认放弃租用吗？')
      .then(confirm => {
        console.log(confirm)
        axios.get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/unrent/',
            {
              params: {
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token'),
                rent_log_id: server_rent_id,
                role_id: localStorage.getItem('role_id'),
                org_id: localStorage.getItem('org_id'),
                server_id: server_id,
              }
            })
        .then(resp => {
          console.log(resp)
          this.listAllRentServer()
          this.$message.success('放弃租用成功！')
        })
        .catch( err => {
          console.log(err)
          this.$message.error('放弃租用失败！')
        })
      })
    },

    listAllRentServer() {
      axios
      .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/list-rent-server/',
          {
            params: {
              email: localStorage.getItem('email'),
              token: localStorage.getItem('token'),
              role_id: localStorage.getItem('role_id'),
              org_id: localStorage.getItem('org_id'),
              role: localStorage.getItem('role')
            }
          })
      .then( res => {
        console.log(res)
        this.table_data = res.data.server_list
      }).catch(err => {
        console.log(err)
        this.$message.error('刷新失败')
      })
    }
  }
}
</script>

<style scoped lang="less">
#user-server-market {

}
</style>