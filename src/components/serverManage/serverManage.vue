<template>
  <div id="server-manage">
    <div class="server-manage-top">

    </div>

    <div class="server-manage-main">
      <div class="server-manage-push">
        <el-button type="primary" plain  @click="dialogFormVisible = true">新建</el-button>
        <el-button type="primary" plain  @click="mult_choice === true ? mult_choice = false : mult_choice = true">多选操作</el-button>
      </div>
      <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              fixed
              prop="check"
              label="多选"
              width="60"
              v-if="mult_choice">
          </el-table-column>
          <el-table-column
              fixed
              prop="server_id"
              label="编号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="rent_status"
              label="租借状态"
              width="120">
          </el-table-column>
          <el-table-column
              prop="rent_by"
              label="租借人"
              width="120">
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
              <el-button type="text" size="small" @click="deleteServer(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- Form -->

    <el-dialog title="新增服务器" :visible.sync="dialogFormVisible">
      <el-form :model="form_new_server">
        <el-form-item label="CPU型号" :label-width="formLabelWidth">
          <el-input v-model="form_new_server.cpu_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="GPU型号" :label-width="formLabelWidth">
          <el-input v-model="form_new_server.gpu_name" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="内存大小" :label-width="formLabelWidth">
          <el-tooltip class="item" effect="dark" content="单位为G，请输入一个整数" placement="top-start">
            <el-input v-model="form_new_server.ram_size" autocomplete="off"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="硬盘大小" :label-width="formLabelWidth">
          <el-tooltip class="item" effect="dark" content="单位为T，请输入一个整数" placement="top-start">
            <el-input v-model="form_new_server.rom_size" autocomplete="off"></el-input>
          </el-tooltip>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" >取 消</el-button>
        <el-button type="primary" @click="newServer" :loading="new_server_button_load">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "serverManage",

  data() {
    return {
      tableData: [],
      mult_choice: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form_new_server: {
        cpu_name: '',
        gpu_name: '',
        ram_size: '',
        rom_size: '',
      },
      new_server_button_load: false,
      table_data: []
    }
  },

  mounted() {
    this.listAllServer()
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },

    newServer() {
      this.new_server_button_load = true
      axios
      .post('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/new-server/',
          {
        data: this.form_new_server,
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        org_id: localStorage.getItem('org_id')
      })
      .then( resp => {
        console.log(resp)
        this.$message.success('服务器添加成功！')
        this.dialogFormVisible = false
        this.new_server_button_load = false
        this.listAllServer()
      })
      .catch( err => {
        console.log(err)
        if (err.response.data === 'token time out') {
          this.$message.error('由于长时间未操作，登录身份已过期，请重新登录！！！')
          this.$router.push('/')
        }else if (err.response.data === 'check your param') {
          this.$message.error('新增服务器时，参数出现错误')
        }else {
          this.$message.error('未知错误，请联系管理员')
        }
        this.dialogFormVisible = false
        this.new_server_button_load = false
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
        this.tableData = resp.data.server_list
        this.$message.success('刷新管理列表成功')
          })
      .catch(err => {
        console.log(err)
      })
    },

    deleteServer(row) {
      this.$confirm('确认删除？')
      .then(_ => {
        console.log(_)
        axios
        .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/delete-server/',
            {
              params: {
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token'),
                server_id: row.server_id
              }
            })
        .then(resp => {
          console.log(resp)
          this.$message.success('删除成功')
          this.listAllServer()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除失败！')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#server-manage {

  .server-manage-main {

    .server-manage-push {
      float: right;

      .el-button {
        margin-bottom: 20px;
      }
    }
  }
}
</style>