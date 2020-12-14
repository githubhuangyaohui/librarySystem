<template>
    <body id="poster" class="back-image">
    <el-form class="register-container" label-position="left" label-width="0px">
        <h3 class="register_title">图书管理系统</h3>
<!--用户名：大于5位-->
        <el-form-item class="register_item">
            <el-input id="username"
                      type="text"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="用户名"
                      @blur="namemat">
            </el-input>
        </el-form-item>
<!--密码框-->
        <el-form-item class="register_item">
            <el-input id="pwd"
                      type="password"
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="密码"
                      @blur="pwdmat"></el-input>
        </el-form-item>
<!--昵称-->
        <el-form-item class="register_item">
            <el-input id="nick"
                      type="text"
                      v-model="loginForm.nickname"
                      auto-complete="off"
                      placeholder="昵称"
                      @blur="nickmat"></el-input>
        </el-form-item>
<!--邮箱-->
        <el-form-item class="register_item">
            <el-row>
                <el-input id="emil"
                          type="text"
                          v-model="loginForm.email"
                          auto-complete="off"
                          placeholder="邮箱"
                          @blur="emilmat"></el-input>
            </el-row>
        </el-form-item>
<!--电话-->
        <el-form-item class="register_item">
            <el-row>
                <el-input id="pho"
                          type="text"
                          v-model="loginForm.phone"
                          auto-complete="off"
                          placeholder="电话"
                          @blur="phomat"></el-input>
            </el-row>
        </el-form-item>
<!--地址-->
        <el-form-item class="register_item">
            <el-row>
                <el-input id="add"
                          type="text"
                          v-model="loginForm.address"
                          auto-complete="off"
                          placeholder="地址"
                          @blur="addmat"></el-input>
            </el-row>
        </el-form-item>
        <el-form-item class="register_item">
            <el-card class="register_item2">
                <el-tag style="width: 50px">性别</el-tag>
                <el-radio v-model="loginForm.sex" label="1">男</el-radio>
                <el-radio v-model="loginForm.sex" label="2">女</el-radio>
            </el-card>
        </el-form-item>
        <el-form-item class="register_item">
            <el-card class="register_item2">
                <el-button type="primary" round v-on:click="register">注册</el-button>
            </el-card>
        </el-form-item>
    </el-form>
    </body>

</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        sex: ''
      }
    }
  },
  methods: {
    namemat () {
      var name = document.getElementById('username')
      if (!name.value.match(/.{5,15}/)) {
        this.$message.error('用户名不少于5位')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    pwdmat () {
      var name = document.getElementById('pwd')
      if (!name.value.match(/^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{6,}$/)) {
        this.$message.error('密码大于6位的字母数字组合')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    nickmat () {
      var name = document.getElementById('nick')
      if (!name.value.match(/.{5,15}/)) {
        this.$message.error('昵称不能为空')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    emilmat () {
      var name = document.getElementById('emil')
      if (!name.value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
        this.$message.error('邮箱格式不正确')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    phomat () {
      var name = document.getElementById('pho')
      if (!name.value.match(/^1[0-9]{10}$/)) {
        this.$message.error('电话格式不正确')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    addmat () {
      var name = document.getElementById('add')
      if (!name.value.match(/[^ ]/)) {
        this.$message.error('地址不能为空')
        name.style = 'background: #F56C6C'
        return false
      } else {
        name.style = 'background: #ffffff'
        return true
      }
    },
    register () {
      if (this.namemat() &&
        this.pwdmat() &&
        this.nickmat() &&
        this.emilmat() &&
        this.phomat() &&
        this.addmat()) {
        this.$axios
          .post('/user/register', {
            username: this.loginForm.username,
            password: this.loginForm.password,
            nickname: this.loginForm.nickname,
            email: this.loginForm.email,
            phone: this.loginForm.phone,
            address: this.loginForm.address,
            sex: this.loginForm.sex
          }).then((response) => {
            if (response.data.code === '200') {
              this.$message('注册成功')
              this.$router.push({path: '/login'})
            } else {
              this.$message('注册失败')
            }
          })
          .catch(failResponse => {
            this.$message.error('注册错误')
          })
      } else {
        this.$message.error('请按格式填写')
      }
    }
  }
}
</script>

<style scoped>
    .register-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 25px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .register_item{
        margin: 0;
    }
    .register_item2{
        margin: 0;
    }
    .register_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    #poster {
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
</style>
