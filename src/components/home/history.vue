<template>
<div>
    <el-card class="search">
        <el-input class="search-item" v-model="searchOrder.isbn" placeholder="ISBN"></el-input>
        <el-date-picker
                class="search-item"
                v-model="searchOrder.startTime"
                type="date"
                placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
                class="search-item"
                v-model="searchOrder.endTime"
                type="date"
                placeholder="选择结束日期">
        </el-date-picker>
         <el-button class="search-item"
                    style="width: 100px"
                    type="success"
                    plain
                    @click="getOrder">搜索</el-button>
    </el-card>
    <el-card class="main">
        <div slot="header" style="font-size: 1em">借书记录</div>
        <div v-for="item in order" :key="item.borrowTime">
            <el-card class="history-item">
                <el-card class="history-item-card"
                         style="width: 150px">ISBN:{{item.isbn}}</el-card>
                <el-card class="history-item-card"
                         style="width: 150px">{{item.book.bookname}}</el-card>
                <el-card class="history-item-card"
                         style="width: 250px">借书时间:{{item.borrowTime}}</el-card>
                <el-card class="history-item-card"
                         style="width: 250px"
                      v-if="item.expireStatus===1">还书时间:{{item.returnTime}}</el-card>
                <el-card class="history-item-card"
                         style="width: 250px"
                         v-if="item.expireStatus===2">到期时间:{{item.dueTime}}</el-card>
                <el-card class="history-item-card"
                         style="float: right;background: #909399"
                      v-if="item.expireStatus===1">已还</el-card>
                <el-card class="history-item-card"
                      style="float: right;background: #E6A23C"
                      v-if="item.expireStatus===2">未还</el-card>
            </el-card>
        </div>
        <el-row>
            <el-pagination
                    :current-page="searchOrder.curPage"
                    :page-size="5"
                    @current-change="getOrder">
            </el-pagination>
        </el-row>
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
        username: '',
        startTime: '',
        endTime: '',
        curPage: 1,
        pageSize: 5
      },
      order: [{
        isbn: '0001',
        borrowTime: '2020-10-10',
        returnTime: '2020-10-12',
        dueTime: '2020-10-13',
        expireStatus: '2',
        userId: '0001',
        book: {
          bookname: '放牛班的春天'
        },
        user: {
          username: 'persistenthuang'
        }
      }]
    }
  },
  mounted () {
    this.getOrder(1)
  },
  methods: {
    getOrder: function (curPage) {
      this.searchOrder.curPage = curPage
      this.$axios.get('/order/oneuserDetail', {
        params: {
          userId: this.$store.state.user.id,
          username: this.$store.state.user.username,
          startTime: this.searchOrder.startTime,
          endTime: this.searchOrder.endTime,
          curPage: this.searchOrder.curPage,
          pageSize: this.searchOrder.pageSize
        }
      }).then((resp) => {
        this.$message(resp.data.msg)
        console.log(resp)
        this.order = resp.data.data.list
      })
    }
  }
}
</script>

<style scoped>
.history-item{
    width: 98%;
    height: 100px;
    margin: 10px;
}
.history-item-card{
    width: 100px;
    height: 50%;
    background: #409EFF;
    margin-right: 10px;
    padding-top: 0px;
    float: left;
}
</style>
