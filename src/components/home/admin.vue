<template>
<div>
    <el-card class="main" style="min-height: 600px">
        <div slot="header" style="font-size: 1em">个人中心</div>
        <div>
            <el-row>
                <el-card class="admin-item" style="background: #F56C6C;">{{ this.data.username }}</el-card>
                <el-card class="admin-item" style="background: #67C23A">{{ this.data.nickname }}</el-card>
                <div @click="dig=true">
                    <el-card class="admin-item" style="background: #FFFFFF;float: right;width: 90px">
                        <div class="el-icon-edit"></div>
                    </el-card>
                </div>
            </el-row>
            <el-row>
                <div v-if="data.roleId=='1'">
                    <el-card class="admin-item" style="background: #409EFF;float: right">借阅者</el-card>
                </div>
                <div v-else>
                    <el-card class="admin-item" style="background: #409EFF;float: right">管理员</el-card>
                </div>
                <!--性别-->
                <div v-if="data.sex=='1'">
                    <el-card class="admin-item" style="font-size: 1.5em;background: #409EFF;">
                        <div class="el-icon-male"></div>
                    </el-card>
                </div>
                <div v-else>
                    <el-card class="admin-item" style="font-size: 1.5em;background: #409EFF;">
                        <div class="el-icon-female"></div>
                    </el-card>
                </div>
            </el-row>
            <el-row>
                <!--邮箱-->
                <el-card class="admin-item-index">
                    <div class="el-icon-message"></div>
                </el-card>
                <el-card class="admin-item" style="background: #E6A23C;">{{this.data.email}}</el-card>
            </el-row>
           <!--电话-->
            <el-row>
                <el-card class="admin-item-index">
                    <div class="el-icon-phone"></div>
                </el-card>
                <el-card class="admin-item" style="background: #E6A23C;">{{this.data.phone}}</el-card>
            </el-row>
            <el-row>
                <el-card class="admin-item-index">
                    <div class="el-icon-s-check"></div>
                </el-card>
                <el-card class="admin-item" style="background: #67C23A;width: 80%">{{this.data.address}}</el-card>
            </el-row>
        </div>
    </el-card>
    <el-drawer :visible.sync="dig"
               width="40%">
        <el-form>
            <el-form-item>
                <div class="dig-item">
                    <span>密码:</span>
                    <el-input id="pwd"
                              @blur="pwdmat"
                              show-password
                              v-model="data.password"
                              style="width: 80%"></el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="dig-item">
                    <span>昵称:</span>
                    <el-input id="nick"
                              @blur="nickmat"
                              style="width: 80%"
                              v-model="data.nickname">{{data.nickname}}</el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="dig-item">
                    <span>邮箱:</span>
                    <el-input id="emil"
                              @blur="emilmat"
                              style="width: 80%"
                              v-model="data.email">{{data.email}}</el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="dig-item">
                    <span>电话:</span>
                    <el-input id="pho"
                              @blur="phomat"
                              style="width: 80%"
                              v-model="data.phone">{{data.phone}}</el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="dig-item">
                    <span>地址:</span>
                    <el-input id="add"
                              @blur="addmat"
                              style="width: 80%"
                              v-model="data.address">{{data.address}}</el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="dig-item">
                    <el-tag style="width: 50px">性别</el-tag>
                    <el-radio v-model="data.sex" label="1">男</el-radio>
                    <el-radio v-model="data.sex" label="2">女</el-radio>
                </div>
            </el-form-item>
            <el-form-item style="text-align: center ">
                <el-button @click="dig = false">取 消</el-button>
                <el-button type="primary" @click="updateMessage">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</div>
</template>

<script>
export default {
  name: 'admin',
  mounted () {
    this.getMessge()
  },
  data () {
    return {
      dig: false,
      data: {
        username: '黑夜的孩子',
        password: '111111',
        nickname: 'nikename',
        email: '11111@qq.com',
        phone: '1211212121',
        address: '加大回答是倒是埃松加的撒娇大',
        sex: '2',
        createTime: '1020-12-21',
        lastTime: '1020-12-21',
        status: '',
        roleId: '1'
      }
    }
  },
  methods: {
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
      if (!name.value.match(/[^ ]/)) {
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
    getMessge () {
      console.log('获取个人信息')
      this.$axios.post('/user/getPersonInfo', {
        id: this.$store.state.user.userid,
        username: this.$store.state.user.username
      }).then((resp) => {
        console.log(resp.data)
        this.$message(resp.data.msg)
        this.books = resp.data.data
        this.$store.commit('login', resp.data.data)
      })
    },
    updateMessage () {
      // eslint-disable-next-line eqeqeq
      if (this.pwdmat() &&
        this.nickmat() &&
        this.emilmat() &&
        this.phomat() &&
        this.addmat()) {
        this.$axios.post('user/edit', {
          id: this.$store.state.user.userid,
          username: this.$store.state.user.username,
          password: this.data.password,
          nickname: this.data.nickname,
          email: this.data.email,
          phone: this.data.phone,
          address: this.data.address,
          sex: this.data.sex
        }).then((resp) => {
          console.log('修改个人信息')
          this.$message(resp.data.msg)
          this.getMessge()
          this.dig = false
        }).catch(() => {
          this.$message.error('修改失败')
          this.dig = false
        })
      } else {
        this.$message.error('请按照格式填写')
      }
    }
  }
}
</script>

<style scoped>
.admin-item{
    width: 300px;
    margin: 10px;
    font-size: 1.5em;
    float: left;
}
.admin-item-index{
    width: 100px;
    margin: 10px;
    font-size: 1.5em;
    float: left;
    background: #909399;
}
</style>
