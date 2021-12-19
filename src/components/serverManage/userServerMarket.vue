<template>
  <div id="user-server-market">

    <div class="user-market-main">
      <template>
        <el-table
            :data="table_data"
            border
            style="width: 100%">
          <el-table-column
              fixed
              prop="server_id"
              label="编号"
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
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="dialogFormVisible = true; this.choose_server_id = scope.row.server_id;">租用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-dialog title="租用服务器" :visible.sync="dialogFormVisible">
        <el-form :model="form_rent_server">
          <el-form-item label="时间" >
            <div class="block">
              <el-date-picker
                  v-model="rent_time"
                  type="datetime"
                  placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取 消</el-button>
          <el-button type="primary" @click="rentServer(choose_server_id, rent_time)" :loading="rent_server_button_load">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userServerMarket",

  data() {
    return {
      table_data: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: 80,
      rent_server_button_load: false,
      rent_time: '',
      choose_server_id: '',
      form_rent_server: {

      }
    }
  },

  mounted() {
    this.listAllServer()
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },

    rentServer(server_id, time) {
      this.rent_server_button_load = true
      if (Date.parse(time) < new Date()) {
        this.$message.error('选择时间小于当前时间！')
        this.rent_server_button_load = false
        return
      }
      axios
      .get('', {
        params: {
          server_id: server_id,
          time: time
        }
      }).then(res => {
        console.log(res)
        this.$message.success('租用成功！')
        this.rent_server_button_load = false
      }).catch( err => {
        console.log(err)
        this.message.error('租用失败！')
      })
    },

    listAllServer() {
      axios
          .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/list-server/',
              {
                params: {
                  email: localStorage.getItem('email'),
                  token: localStorage.getItem('token'),
                  role: localStorage.getItem('role'),
                  org_id: localStorage.getItem('org_id')
                }
              })
          .then( resp => {
            console.log(resp)
            this.table_data = resp.data.server_list
          })
          .catch(err => {
            console.log(err)
          })
    },
  }
}
</script>

<style scoped>

</style>