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
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="letUnRent(scope.row.rent_log_id, scope.row.server_id)">停止租用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminRentLog",
  data() {
    return {
      table_data: []
    }
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },

    letUnRent() {

    }
  }
}
</script>

<style scoped>

</style>