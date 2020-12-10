<template>
    <div  class="back-image">
        <el-container>
            <el-aside width="250px">
                <el-card class="aside">
                    <div v-for="(item,i) in navList" :key="i" @click="toPage(item.name)">
                        <el-card class="aside-item">{{item.navItem}}</el-card>
                    </div>
                    <div @click="logout">
                        <el-card class="aside-item"
                                 style="background: #F56C6C;margin-top: 150px">登出</el-card>
                    </div>
                </el-card>
            </el-aside>
            <el-main style="padding: 0">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/history', navItem: '借书记录'},
        {name: '/borrow', navItem: '借书'},
        {name: '/return', navItem: '还书'},
        {name: '/admin', navItem: '个人中心'}
      ]
    }
  },
  methods: {
    toPage (item) {
      this.$router.push({path: item})
    },
    logout () {
      this.$axios.get('/user/logout', {
        params: {
          userId: this.$store.state.user.userid
        }
      }).then((resp) => {
        this.$store.commit('logout')
        this.$message(resp.data.msg)
        this.$router.push({path: '/login'})
      }).catch(() => {
        // this.$store.commit('logout')
        this.$message('登出失败')
      })
    }
  }
}
</script>

<style scoped>
.aside{
    background: #909399;
    min-height: 600px;
    margin: 10px;
}
.aside-item{
    background: #409EFF;
    margin: 10px;
}
.aside-item:hover {
    margin-left: +8px;
    margin-right: +5px;
}
</style>
