<template>
    <el-container>
      <el-header class="homeHeader">
          <div class="title" @click="toPage('/librarian')">图书管理后台</div>
          <div>
              <el-button :icon="collapseClass" type="text" @click="collapseHandler" style="color: #000000; font-size:16px"></el-button>
              <el-dropdown class="userInfo" @command="commandHandler">
                <span class="el-dropdown-link">
                    Hi，{{user.userName}}
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal" >个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout" divided >退出登录</el-dropdown-item>
                    </el-dropdown-menu>
              </el-dropdown>
          </div>
      </el-header>
      <el-container>
          <el-aside :style="leftMenuStyle">
              <el-menu router :collapse="isCollapse" >
                <el-menu-item v-for="(item,i) in navList" :key="i" @click="toPage(item.name)">
                    <!-- <i class="el-icon-menu"></i> -->
                    <span slot="title">{{item.navItem}}</span>
                </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main style="padding:0px;">
              <!--主区-->
              <el-container>
                  <el-main class="a">
                    <template v-if="this.$router.currentRoute.path=='/librarian'" >
                        <div class="defaultForm">
                            <el-image
                            style="width:1318px;height:662px "
                            :src=imgURL >
                            </el-image>
                        </div>
                    </template>
                    <router-view class="homeRouterView" ></router-view>
                  </el-main>
              </el-container>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {name: '/books', navItem: '图书管理'},
        {name: '/userInfo', navItem: '用户信息'}
      ],
      isCollapse: false,
      user: {
        userName: '杨荣东'

      },
      imgURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607003387595&di=e1d64b9656b583c5e1be2edbaf3bc6f1&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftranslate%2Fw600h407%2F20180104%2FZIPq-fyqincu1601826.jpg'
    }
  },
  computed: {
    leftMenuStyle: function () {
      if (!this.isCollapse) {
        return 'width:200px'
      } else {
        return 'width:0px'
      }
    },
    collapseClass: function () {
      if (!this.isCollapse) {
        return 'el-icon-s-unfold'
      } else {
        return 'el-icon-s-fold'
      }
    }
  },
  methods: {
    commandHandler (cmd) {
      // 退出登录
      // eslint-disable-next-line eqeqeq
      if (cmd == 'logout') {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('LOGIN')
          this.$router.push({path: '/login'})
          this.$axios.get('/user/logout', {
            params: {
              userId: this.$store.state.user.id
            }
          }).then(resp => {
            console.log(resp)
            // eslint-disable-next-line eqeqeq
            if (resp.data.code == 200) {
              this.$message('退出成功')
              console.log(resp)
            }
          })
        }
        )
        // eslint-disable-next-line eqeqeq
      } else if (cmd == 'personal') {
        this.$router.push('/personal?id=' + this.$store.state.user.userid + '&username=' + this.$store.state.user.username)
      }
    },
    toPage (name) {
      this.$router.push({path: name})
    },
    collapseHandler () {
      // 折叠菜单处理
      if (this.isCollapse) {
        this.isCollapse = false
      } else {
        this.isCollapse = true
      }
    }

  }
}
</script>

<style>
    body {margin: 0px}

    .el-main{ width: 100px;}

    .homeRouterView {
        margin-top: 20px;
        margin-bottom: 20px;
        width:100%;

    }
    .homeWelcome {
        text-align: center;
        font-family: 华文行楷;
        color: #409eff;
    }

    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 32px;
        height: 32px;
        border-radius: 24px;
        margin-left: 8px;
        margin-right: 10px;
    }

    .el-dropdown-link {
        color: rgb(32, 25, 25);
        display: flex;
        align-items: center;
    }

    .main-header{
        line-height: 45px;
        background:#e4f5ff;
        padding: 15px;
        width:100%
    }

    .card-header{
        padding-bottom:20px;
        font-weight: bold;
    }

    .text {
        font-size: 14px;
    }

    .book-item{
        height: 130px;
        margin-bottom: 20px
    }
    .book-item .img{
        float:left;width:16%
    }
    .book-item .content{
        float:left; width:84%
    }
    .book-item .content .title{
        float:left; width:80%
    }
    .book-item .content .category{
        text-align:right; float:left; width:20%
    }
    .book-item .content .introduction{
        color:#b1aeae;font-size:12px; height:78px
    }
    .book-item .content .author{
        color:#9db4e5;font-size:13px;font-weight:bold; height:26px
    }

    .author-text {
        font-size: 14px;
        color: rgb(221, 103, 133);
        font-weight: bold;
    }

    .author-book-text{
        font-size: 14px;
        color: rgb(175, 178, 182);
    }

    .author-item {
        height: 48px;
        line-height: 48px;
        display: block;
    }

    .author-item-img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-right: 10px;
    }
    .defaultForm {
        width: 100%;
    }
    .a{
        padding: 0;
    }
</style>
