<template>
<div>
    <el-card class="search">
        <el-input class="search-item" v-model="searchOrder.isbn" placeholder="ISBN"></el-input>
        <el-input class="search-item" v-model="searchOrder.startTime" placeholder="开始时间"></el-input>
        <el-input class="search-item" v-model="searchOrder.endTime" placeholder="结束时间"></el-input>
        <el-button class="search-item" style="width: 100px" type="success" plain>搜索</el-button>
    </el-card>
    <el-card class="main">
        <div slot="header" style="font-size: 1em">借书记录</div>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      searchOrder: {
        userId: '',
        startTime: '',
        endTime: '',
        isbn: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    getOrder () {
      this.$axios.post('/order/detail', {
        userId: this.$store.state.user.userid,
        startTime: this.searchOrder.startTime,
        endTime: this.searchOrder.endTime,
        isbn: this.searchOrder.isbn
      }).then((resp) => {
      })
    }
  }
}
</script>

<style scoped>

</style>
