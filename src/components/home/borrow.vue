<template>
<div>
    <el-card class="main" style="min-height: 600px">
        <div slot="header" style="font-size: 1em">借书</div>
        <div style="margin-top: 170px" v-if="this.book[0].bookname==''">
            <el-input v-model="book.isbn"
                      placeholder="ISBN"
                      style="width: 400px"></el-input>
            <el-button type="success"
                       plain
                       @click="this.getSearch">点击搜索</el-button>
        </div>
        <div v-else>
            <div v-for="item in book" :key="item.id">
                <el-row>
                    <el-card style="width: 150px;margin-bottom: 20px;height: 190px;float: left;margin-right: 15px"
                             bodyStyle="padding:10px" shadow="hover">
                        <div class="cover">
                            <el-image style="width: 100%;height: 100%;height: 170px;margin-bottom: 10px;" :src="item.imgpath" :fit="pic"></el-image>
                        </div>
                    </el-card>
                    <div style="float: left;min-width: 850px">
                        <el-card>
                            <div style="text-align: left;margin: 20px;font-size: 1.5em">
                                <span>{{item.bookname}}</span>
                            </div>
                            <div style="font-size: 13px;margin-bottom: 6px;text-align: left;font-size: 1em">
                                作者：<span>{{item.author}}</span>
                                <br/> 索书号：<span>{{item.isbn}}</span>
                                <br/> 价格：<span>{{item.price}}</span>
                                <br/>出版社：<span>{{item.publisher}}</span>
                                <br/>剩余：<span>{{item.storenum}} 本</span>
                                <br/>书本简介：<span>{{item.description}}</span>
                            </div>
                        </el-card>
                        <div @click="borrowBook(item.isbn)">
                            <el-card style="background: #E6A23C;margin-top: 10px">点击借书</el-card>
                        </div>
                    </div>
                </el-row>
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'borrow',
  data () {
    return {
      pic: 'cover',
      book: [{
        id: 0,
        isbn: '',
        bookname: '',
        author: '',
        imgpath: '',
        publisher: '',
        storenum: '',
        price: '',
        description: ''
      }]
    }
  },
  mounted () {
    if (this.$route.query.isbn) {
      this.book.isbn = this.$route.query.isbn
      this.getSearch()
    }
  },
  methods: {
    getSearch () {
      this.getBook(this.book.isbn)
    },
    getBook (isbn) {
      console.log('图书信息')
      this.$axios.get('/book/list', {
        params: {
          curPage: 1,
          isbn: this.book.isbn,
          bookname: '',
          author: '',
          publisher: '',
          size: 1
        }
      }).then((resp) => {
        this.$message(resp.data.msg)
        this.book = resp.data.data.records
      })
    },
    borrowBook (isbn) {
      console.log('借书')
      this.$axios.post('/book/borrow', {
        userId: this.$store.state.user.userid,
        isbn: isbn
      }).then((resp) => {
        console.log(resp.data)
        this.$message(resp.data.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>
