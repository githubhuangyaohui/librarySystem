<template>
    <div class="defaultForm">
        <el-form :model="userForm" :rules="rules" ref="userForm" size="small" label-width="135px" >
            <el-form-item label="ID" prop="id">
                <el-input v-model="userForm.id"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="E-mail" prop="email">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="userForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address">
                <el-input v-model="userForm.address"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="userForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
                <span>{{userForm.createTime}}</span>
            </el-form-item>
            <el-form-item label="上次登录时间" prop="lastTime">
                <span>{{userForm.lastTime}}</span>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <span>{{userForm.status}}</span>
            </el-form-item>
            <el-form-item label="身份" prop="roleID">
                <span>{{userForm.roleId}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(userForm)">保存</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: '',
      operater: '',
      userForm: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        sex: '',
        createTime: '',
        lastTime: '',
        status: '',
        roleId: ''
      },
      rules: {
        // userName: [
        //     { required: true, message: '请输入用户名', trigger: 'change' },
        // ],
        // id: [
        //     { required: true, message: '请输入ID', trigger: 'change' }
        // ],
        // password: [
        //     {  required: true, message: '请输入密码', trigger: 'change' }
        // ],
        // nickname: [
        //     { required: true, message: '请输入昵称', trigger: 'change' }
        // ],
        // email: [
        //     { required: true, message: '请输入email', trigger: 'change' }
        // ],
        // phone: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // address: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ],
        // sex: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ],
      }
    }
  },
  created () {
    this.initForm()
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    initForm () {
      // console.log(this.$route.query);
      let username = this.$route.query.username
      let id = this.$route.query.id
      this.$axios.get('/user/getAdminPersonInfo', {
        params: {
          id: id,
          username: username
        }
      }).then(resp => {
        console.log('用户详情')
        console.log(resp)
        // eslint-disable-next-line eqeqeq
        if (resp.data.code == 200) {
          this.userForm = resp.data.data
          this.operater = this.$store.state.user.username
          // this.total = resp.data.data.total;
          console.log(this.userForm)
        }
      })
    },
    submitForm (userForm) {
      let form = {
        id: userForm.id,
        username: userForm.username,
        password: userForm.password,
        nickname: userForm.nickname,
        email: userForm.email,
        phone: userForm.phone,
        address: userForm.address,
        sex: userForm.sex
      }
      console.log('操作者名称')
      console.log(this.operater)
      if (this.operater === form.username) {
        this.$axios.post('/user/edit', form).then(resp => {
          // eslint-disable-next-line eqeqeq
          if (resp.data.code == 200) {
            this.$message({
              type: 'info',
              message: '更新成功'
            })
          }
        })
      } else {
        this.$message({
          type: 'info',
          message: '您无权修改'
        })
      }
    }
  }
}
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 92px;
        height: 92px;
        line-height: 92px;
        text-align: center;
    }
    .avatar {
        width: 92px;
        height: 92px;
        display: block;
    }
</style>
