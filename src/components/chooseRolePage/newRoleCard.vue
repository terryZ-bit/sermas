<template>
  <div id="new-role-card">
    <el-form ref="form" :model="form" label-width="80px" label-position="top" :rules="rules">
      <el-form-item label="角色昵称" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色昵称"></el-input>
      </el-form-item>
      <el-form-item label="角色等级">
        <el-radio v-model="form.radio.is_user" label="1" v-on:change="selectRole">用户</el-radio>
        <el-radio v-model="form.radio.is_user" label="2" v-on:change="selectRole">管理员</el-radio>
      </el-form-item>

      <transition name="el-zoom-in-center">
        <el-form-item label="组织ID" v-show="is_join" prop="region_id">
          <el-input v-model="form.region_id"></el-input>
        </el-form-item>
      </transition>

      <transition name="el-zoom-in-bottom">
        <el-form-item label="是否创建新组织" v-show="!is_user">
          <el-radio v-model="form.radio.is_new_org" label='1' v-on:change="selectNewOrg">是</el-radio>
          <el-radio v-model="form.radio.is_new_org" label="2" v-on:change="selectNewOrg">否</el-radio>
        </el-form-item>
      </transition>

      <transition name="el-zoom-in-top">
        <el-form-item label="组织名称" v-show="is_new_org" prop="region_name">
          <el-input placeholder="请输入组织名称" v-model="form.region"></el-input>
        </el-form-item>
      </transition>

      <transition name="el-zoom-in-top">
        <el-form-item >
          <el-button v-show="is_all_done" type="primary" plain :loading="button_loading" @click="submitForm('form')">
            创建角色
          </el-button>
          <el-button @click="roll_back" ref="roll_back_ref">
            取消
          </el-button>
        </el-form-item>

      </transition>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newRoleCard",

  data() {
    return {
      form: {
        name: '',
        region: '',
        region_id: '',
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        radio: {
          is_user: '1',
          is_new_org: '1'
        }
      },
      is_user: true,
      is_admin: false,
      is_new_org: false,
      is_all_done: true,
      button_loading: false,
      is_join: true,

      rules: {
        name: [
          {required: true, message: '请输入用户昵称', trigger: 'blur'},
          {min:3, max:10, message: '长度在3到10个字符', trigger: 'blur'}
        ],
        region_id: [
          {required: false, message: '请输入组织ID', trigger: 'blur'},
          {min:12, max:12, message: '长度为12个字符', trigger: 'blur'}
        ],
        region_name: [
          {required: false, message: '请输入组织名称', trigger: 'blur'},
          {min:2, max:10, message: '长度在2到12个字符', trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    selectRole(param) {
      if(param === "1") {
        this.is_user = true
        this.is_admin = false
        this.is_join = true
        this.is_new_org = false
      }else {
        this.is_admin = true
        this.is_join = false
        this.is_user = false
        this.is_new_org = true
      }
    },

    selectNewOrg(param) {
      this.is_new_org = param === '1'
      if (param === '1') {
        this.is_new_org = true
        this.is_join = false
      }
      this.is_all_done = true

      this.is_join = param === '2';
    },

    roll_back() {
      this.$emit('rollCardRollBack', '1')
    },

    submitForm(formName) {
      this.button_loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend.LATEST/new-role/',
                {
                  action: 'newRole',
                  data: this.form
                }
                )
            .then(resp => {
              console.log(resp)
              this.$message.success('成功创建角色！')
              this.roll_back()
            })
            .catch(error => {
              if (error.response.data === 'set auth code error') {
                this.$message.error('由于长时间未操作，登录身份已过期，请重新登录')
                this.$router.push('/')
                localStorage.removeItem('token')
              }else if(error.response.data === 'connect sql error') {
                this.$message.error('服务器错误,请联系网站维护人员')
              }else if(error.response.data === 'insert error') {
                this.$message.error('创建时发生错误')
              }
            })
        }else {
          this.$message.error('提交表单失败！')
        }
        this.button_loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
#new-role-card {
  height: 400px;
  width: 260px;
  float: left;
  margin-left: 0;
  margin-right: auto;
  text-align: left;

  .el-form-item__label {
    float: left;
  }

  label {
    font-size: 15px;
  }

  span {
    font-size: 14px;
  }

  input {
    height: 30px;
  }

}

</style>