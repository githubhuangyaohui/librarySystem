<template>
    <!--登录表单-->
    <div id="poster" class="back-image">
    <el-form class="login-container" label-position="left" label-width="0px">
        <!--标题-->
        <h3 class="login_title">图书管理系统</h3>
        <!--用户名输入框-->
        <el-form-item class="login_title">
            <el-input type="text" v-model="loginForm.username"
                      auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <!--密码输入框-->
        <el-form-item>
            <el-input type="password" v-model="loginForm.password"
                      @keyup.enter.native="login"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--登录注册按钮-->
        <el-form-item style="text-align: center">
            <el-button type="primary" round v-on:click="login">登录</el-button>
            <el-button type="primary" plain round v-on:click="register">注册</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: [],
      role: {
        nickname: '',
        roleId: 2,
        roleName: '',
        permissionList: [
          {
            permissionCode: '',
            menuCode: '',
            permissionName: '',
            menuName: '',
            requiredPermission: ''
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$store.commit('logout')
      this.$axios
        .post('/user/login', {
          // 携带参数
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then((response) => {
          if (response.data.code === '200') {
            console.log('登录成功')
            console.log(response.data)
            // message是后端传回的登录失败的信息
            this.$message(response.data.msg)
            // 页面跳转到首页
            this.$store.commit('login', response.data.data)
            // console.log(response)
            // console.log(response['authorization'])
            console.log(response)
            this.$store.commit('saveAuthorization', response.headers.authorization)
            // this.$axios.defaults.headers.common['Authorization'] = this.$store.state.authorization
            this.getRole(response.headers.authorization)
          }
        })
        .catch(() => {
          // var path = this.$route.query.redirect
          // this.$router.push({path: path === '/' || path === undefined ? '/index' : path})
          this.$message('登录失败')
        })
    },
    getRole (authorization) {
      console.log('获取权限')
      console.log(this.$store.state.authorization)
      this.$axios.get('/user/getPermission', {
        params: {
          username: this.$store.state.user.username
        },
        headers: {
          authorization: authorization
        }
      }).then((resp) => {
        this.$message(resp.data.msg)
        this.role = resp.data.data
        // eslint-disable-next-line eqeqeq
        if (this.role.roleId == '2') {
          this.$router.push({path: '/index'})
        } else {
          this.$router.push({path: '/librarian'})
        }
      }).catch(() => {
        this.message('获取权限失败')
      })
    },
    register () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style scoped>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
    #poster {
        /*background: #409EFF;*/
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body,html{
        margin: 0;
        padding: 0;
    }
</style>
