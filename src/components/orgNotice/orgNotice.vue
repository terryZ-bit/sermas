<template>
  <div id="org-notice-manage">
    <div class="org-notice-button">
      <el-button @click="centerDialogVisible = true" type="primary">新建公告</el-button>
    </div>
    <div class="org-notice-scroll">
      <template>
        <el-table
            border
            :data="table_data"
            style="width: 100%"
        >
          <el-table-column prop="topic" label="标题" width="180px"> </el-table-column>
          <el-table-column prop="info" label="内容" width="500px"> </el-table-column>
          <el-table-column prop="create_time" label="发布时间"> </el-table-column>
          <el-table-column prop="create_people" label="发布人"> </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button type="text" size="small" @click="deleteNotice(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </template>
      <el-dialog
          title="新建公告"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
        <el-form :model="form">
          <el-form-item label="标题" >
            <el-input v-model="form.topic" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="谁可以看" >
            <el-select v-model="form.show_role" placeholder="请选择人员">
              <el-option label="全体成员" value="all"></el-option>
              <el-option label="仅管理员" value="admin-only"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newNotice">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "orgNoticeManage",
  data() {
    return {
      count: 1,
      table_data: [],
      centerDialogVisible: false,
      form: {
        topic: '',
        desc: '',
        show_role: ''
      },
    }
  },

  mounted() {
    this.listAllNotice()
  },

  methods: {
    newNotice() {
      axios
      .post('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/new-notice/',
          {
          email: localStorage.getItem('email'),
          token: localStorage.getItem('token'),
          role_id: localStorage.getItem('role_id'),
          role: localStorage.getItem('role'),
          org_id: localStorage.getItem('org_id'),
          form: this.form
      })
      .then( resp => {
        this.$message.success('发布新公告成功！')
        console.log(resp)
      })
      .catch( err => {
        this.$message.error('发布新公告失败！')
        console.log(err)
      })
      this.centerDialogVisible = false
    },

    load() {
      this.count += 2
    },

    handleClick(scope) {
      console.log(scope)
    },

    deleteNotice(scope) {
      this.$confirm('确认删除该通告吗？')
      .then(confirm => {
        console.log(confirm)
        axios
        .get('', {
          params: {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            role_id: localStorage.getItem('role_id'),
            role: localStorage.getItem('role'),
            notice_id: scope.notice_id,
          }
        })
      })
      .catch( err => {
        console.log(err)
      })
    },

    listAllNotice() {
      axios
      .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/list-notice/',{
        params:{
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            role_id: localStorage.getItem('role_id'),
            role: localStorage.getItem('role'),
            org_id: localStorage.getItem('org_id'),
        }
      }).then( resp => {
        this.$message.success('刷新公告列表成功！')
        this.table_data = resp.data.notice_list
        console.log(resp)
      }).catch( err => {
        this.$message.error('刷新公告列表失败！')
        console.log(err)
      })
    }
  },

}
</script>

<style scoped lang="less">
#org-notice-manage {
  .org-notice-button {
    .el-button {
      float: right;
      margin-bottom: 30px;
    }
  }

  .org-notice-scroll {
  }
}
</style>