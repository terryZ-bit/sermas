<template>
  <div id="login-main">
    <div class="main-show-area">

    </div>

    <div class="main-login-area">
      <div class="login-area-top-black"/>
      <div class="login-area">
        <h1>好久不见&nbsp;~</h1>
        <p>
          <span style="color: #409eff">
            登录
          </span>
          以开始管理您的服务器资源
        </p>

          <el-input v-model="username" placeholder="请输入邮箱">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>

        <el-input v-model="password" placeholder="请输入密码" show-password>
          <i slot="prefix" class="el-input__icon el-icon-arrow-right"></i>
        </el-input>
        <div class="save-password-area">
          <el-checkbox size="mini">记住密码</el-checkbox>
        </div>
        <el-button el-button type="primary" plain @click="login" :loading="login_in_btn_load">登录</el-button>
        <div class="sign-in-check-area">
          <el-button type="text" v-on:click="signUp">注册</el-button>
          <el-button type="text">忘记密码？</el-button>
        </div>
      </div>
      <div class="login-area-footer-black" />
    </div>

    <div class="main-black-area"/>

  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";

export default {
  name: "loginMain",

  data() {
    return {
      username: '',
      password: '',
      savePassword: '1',
      login_in_btn_load: false
    }
  },

  methods: {
    signUp: function () {
      this.$router.push('/signup')
    },

    login() {
      if (this.username === '' || this.password === '') {
        this.$message.error('请输入用户名和密码！')
      }

      this.login_in_btn_load = true
      axios
        .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/login-in/',
            {
              params: {
                email: this.username,
                password: md5(this.password)
              }
            })
        .then(resp => {
          console.log(resp)
          localStorage.setItem('token', resp.data.data.token)
          localStorage.setItem('email', this.username)
          this.$message.success({
            message: '登录成功',
            duration: 4000,
            center: true
          })
          this.login_in_btn_load = false
          this.$router.push({
            name: 'chooseRolePage',
            params: {
              login_info: this.username.toString(),
              role_num: resp.data.data.role_num,
              role_list: resp.data.data.role_list
            }
          })
        })
        .catch(error => {
          console.log(error)
          if (error.response.data === 'get param error' || error.response.data === 'error password' || error.response.data === 'create auth_code error') {
            this.$message.error('用户名或密码错误')
          }else if (error.response.data === 'not sign up') {
            this.$message.error('还为注册！请先注册后使用')
          }else {
            this.$message.error('网络错误，请稍后再试')
          }
          this.login_in_btn_load = false
        })
    }
  }
}
</script>

<style lang="less">

#login-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;


  .main-show-area {
    height: 100%;
    width: 60%;
    word-break: break-all;
    word-wrap: break-word;
    p {
      float: left;
    }

  }

  .main-login-area {
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;

    .login-area-top-black {
      height: 19%;
      width: 100%;
    }

    .login-area-footer-black {
      height: 25%;
      width: 100%;
    }

    .login-area {
      display: flex;
      flex-direction: column;
      height: 60%;

      h1 {
        float: left;
        text-align: left;
        margin: 0;
        padding: 0;

      }

      p {
        float: left;
        text-align: left;
        padding: 0;
        margin: 15px 0 0;
      }

      .el-input {
        margin-top: 15px;
      }

      .save-password-area {
        float: left;
        .el-checkbox {
          margin-top: 5px;
          float: left;
        }
      }

      .el-button {
        margin-top: 5px;
      }
    }

    .sign-in-check-area {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .el-button {
        margin-top: 30px;
      }
    }
  }

  .main-black-area {
    height: 100%;
    width: 10%;
    display: flex;

  }
}
</style>