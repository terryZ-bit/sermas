<template>
  <div id="sign-up">
    <div class="sign-up-area">

      <div class="word-check-area">
        <h1>
          欢迎注册!
        </h1>
        <p>
          已有账号？
          <el-button type="text" v-on:click="login">登录</el-button>
        </p>
        <div class="sign-up-input-area">

          <el-tooltip class="item" effect="dark" content="用户名为3-12个字符的英文或者汉字或者组合" placement="top">
            <div class="sign-up-input-top-input">
              用户名<el-input v-model="username" placeholder="请设置用户名"></el-input>
            </div>
          </el-tooltip>

          <div class="sign-up-input-custom-input">
            邮&nbsp;&nbsp;&nbsp;箱
            <el-input v-model="email_address" placeholder="用于登录或找回密码">
            </el-input>
          </div>

          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">长度为8~14个字符<br/>字母/数字以及标点符号至少包含2种<br/>不允许有空格/中文</div>
            <div class="sign-up-input-custom-input">
              密&ensp;&ensp;码<el-input v-model="password" placeholder="请设置登录密码" show-password
                                      v-on:blur="checkPassword" :class="{'input-check-error-display': password_check}"
            ></el-input>
            </div>
          </el-tooltip>

          <div class="sign-up-input-for-s-code">
            验证码<el-input v-model="s_code" placeholder="请输入验证码" :disabled="s_code_input_disabled"></el-input>
            <el-button v-on:click="getCode" :disabled="s_code_button_disabled">{{s_code_button_text}}</el-button>
          </div>
          <div class="sign-up-button-area">
            <el-button @click="signUp" round type="primary" plain :disabled="sign_up_button_disabled" :loading="sign_up_button_loading">注册</el-button>
            <el-checkbox size="mini" @change="checkChange">
              阅读并接受
              <el-link type="primary">sermas用户协议</el-link>
              及
              <el-link type="primary">《sermas隐私权保护声明》</el-link>
            </el-checkbox>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";

export default {
  name: "signup",
  data() {
    return {
      username: '',
      email_address: '',
      password: '',
      s_code: '',
      s_code_input_disabled: true,
      s_code_button_text: '获取验证码',
      s_code_button_disabled: false,
      time: 60,
      sign_up_button_disabled: true,
      sign_up_button_loading: false,
      password_check: false
    }
  },

  methods: {
    login: function () {
      this.$router.push('/')
    },

    getCode: function () {
      if (this.username === '' || this.password === '' || this.email_address === '') {
        this.$message.error('请完整填写好信息后获取验证码!')
        return
      }
      this.$data.s_code_input_disabled = false
      let me = this
      me.s_code_button_disabled = true
      let interval = window.setInterval(function() {
        me.s_code_button_text = + me.time
        --me.time
        if(me.time < 0) {
          me.s_code_button_text = "重新发送"
          me.time = 60
          me.s_code_button_disabled = false
          window.clearInterval(interval)
        }
      }, 1000)

      axios
        .get('https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/sign-up-send-email/', {
          params: {
            email: this.email_address
          }
        })
        .then(resp => {
          console.log(resp)
          this.$message.success('成功将验证码发送到您的邮箱')
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            if (error.response.data === 'get param error' || error.response.data === 'create auth_code error' || error.response.data === 'email address error' || error === 'send email error') {
              this.$message.error('请检查您的邮箱地址是否有拼写错误')
            } else if (error.response.data === 'email exist code exist' || error.response.data === 'set auth code error') {
              this.$message.error('已经发送验证码，无法重复获取')
            } else if (error.response.data === 'email address exist') {
              this.$message.error('您已经注册过，请直接登录！')
            }
          } else if (error.request) {
            this.$message.error('服务器无应答，请稍后重试')
          }
        })
    },

    signUp: function () {
      if (this.username === '' || this.password === '' || this.email_address === '') {
        this.$message.error('请完整填写好信息后再登录！')
        return
      }
      this.sign_up_button_loading = true

      axios
        .get(
            'https://1904535339792558.cn-chengdu.fc.aliyuncs.com/2016-08-15/proxy/sermas-backend/sign-up/',
            {
              params: {
                email: this.email_address,
                password: md5(this.password),
                auth_code: this.s_code,
                user_name: this.username
              }
            }
        )
      .then(resp => {
        console.log(resp)
        this.$message.success('您已经成功注册，现在为您跳转登录界面')
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error)
        this.$message.error('注册失败！')
        this.sign_up_button_loading = false
      })
    },

    checkChange: function (param) {
      this.sign_up_button_disabled = param !== true;
    },

    checkPassword() {
       if (this.password.length < 8 || this.password.length >14) {
         this.password_check = true
         return
       }

       this.password_check = false
    }
  }
}
</script>

<style lang="less" scoped>
#sign-up {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(112.5deg, rgba(232, 232, 232, 0.03) 0%, rgba(232, 232, 232, 0.03) 2%,rgba(231, 231, 231, 0.03) 2%, rgba(231, 231, 231, 0.03) 4%,rgba(231, 231, 231, 0.03) 4%, rgba(231, 231, 231, 0.03) 11%,rgba(2, 2, 2, 0.03) 11%, rgba(2, 2, 2, 0.03) 67%,rgba(231, 231, 231, 0.03) 67%, rgba(231, 231, 231, 0.03) 90%,rgba(111, 111, 111, 0.03) 90%, rgba(111, 111, 111, 0.03) 100%),linear-gradient(157.5deg, rgba(210, 210, 210, 0.03) 0%, rgba(210, 210, 210, 0.03) 17%,rgba(254, 254, 254, 0.03) 17%, rgba(254, 254, 254, 0.03) 18%,rgba(96, 96, 96, 0.03) 18%, rgba(96, 96, 96, 0.03) 44%,rgba(159, 159, 159, 0.03) 44%, rgba(159, 159, 159, 0.03) 70%,rgba(24, 24, 24, 0.03) 70%, rgba(24, 24, 24, 0.03) 82%,rgba(16, 16, 16, 0.03) 82%, rgba(16, 16, 16, 0.03) 100%),linear-gradient(22.5deg, rgba(47, 47, 47, 0.03) 0%, rgba(47, 47, 47, 0.03) 32%,rgba(124, 124, 124, 0.03) 32%, rgba(124, 124, 124, 0.03) 40%,rgba(200, 200, 200, 0.03) 40%, rgba(200, 200, 200, 0.03) 42%,rgba(16, 16, 16, 0.03) 42%, rgba(16, 16, 16, 0.03) 64%,rgba(243, 243, 243, 0.03) 64%, rgba(243, 243, 243, 0.03) 94%,rgba(93, 93, 93, 0.03) 94%, rgba(93, 93, 93, 0.03) 100%),linear-gradient(90deg, #ffffff,#ffffff);
  .sign-up-area {
    position: absolute;
    width: 480px;
    height: 680px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.5);
    overflow: hidden;

    .word-check-area {
      display: flex;
      flex-direction: column;

      h1 {
        margin: 50px auto 3px 30px;
      }

      p {
        margin: 0 auto 0 30px;
        padding: 0;
        color: darkgray;
      }

      .sign-up-input-area {
        text-align: left;

        .sign-up-input-top-input {
          margin-top: 50px;
          margin-left: 30px;
        }

        .sign-up-input-custom-input {
          margin-top: 40px;
          margin-left: 30px;

          .el-input-group__append {
            padding-left: 10px;
          }
          .sign-up-input-choose-order-input {

            .el-input {
              width: 155px;
            }

            .el-input__inner {
              padding-left: 0;
            }

            .el-select {
              input {
                padding: 0;
              }
              .el-input {
                width: 120px;
                padding: 0;
              }
            }
          }
        }

        .sign-up-input-for-s-code {
          margin-top: 40px;
          margin-left: 30px;
          .el-input {
            width: 215px;
          }

          .el-button {
            margin-left: 10px;
            width: 110px;
          }
        }

        .sign-up-button-area {
          margin-left: 30px;
          margin-top: 80px;

          .el-button {
            width: 403px;
          }

          .el-checkbox {
            margin-top: 13px;
            margin-left: 8px;
            text {
              font-size: small;
            }
          }
        }

        .el-input {
          width: 335px;
          margin-left: 20px;
        }
      }
    }
  }
}

//.input-check-error-display {
//  border-color: #f3620a;
//  border-style: double;
//  border-width: 3px;
//  border-radius: 7px;
//}
</style>