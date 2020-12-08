<template>
    <body id="poster" class="back-image">
    <el-form class="register-container" label-position="left" label-width="0px">
        <h3 class="register_title">图书管理系统</h3>
        <el-form-item class="register_item">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item class="register_item">
            <el-input type="password" v-model="loginForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="register_item">
            <el-input type="text" v-model="loginForm.nickname"
                      auto-complete="off" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item class="register_item">
            <el-row>
                <el-input type="text" v-model="loginForm.email"
                          auto-complete="off" placeholder="邮箱"></el-input>
            </el-row>
        </el-form-item>
        <el-form-item class="register_item">
            <el-row>
                <el-input type="text" v-model="loginForm.phone"
                          auto-complete="off" placeholder="电话"></el-input>
            </el-row>
        </el-form-item>
        <el-form-item class="register_item">
            <el-row>
                <el-input type="text" v-model="loginForm.address"
                          auto-complete="off" placeholder="地址"></el-input>
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
                <el-tag style="width: 50px">角色</el-tag>
                <el-radio v-model="loginForm.roleId" label="1">管理员</el-radio>
                <el-radio v-model="loginForm.roleId" label="2">借阅者</el-radio>
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
        sex: '',
        roleId: ''
      }
    }
  },
  methods: {
    register () {
      this.$axios
        .post('/user/register', {
          user: {
            username: this.loginForm.username,
            password: this.loginForm.password,
            nickname: this.loginForm.nickname,
            email: this.loginForm.email,
            phone: this.loginForm.phone,
            address: this.loginForm.address,
            sex: this.loginForm.sex,
            roleId: this.loginForm.roleId
          },
          code: this.loginForm.code
        }).then((response) => {
        })
        .catch(failResponse => {
          this.$message('注册错误')
        })
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
