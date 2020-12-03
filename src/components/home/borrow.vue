<template>
<div>
    <el-card class="main" style="min-height: 600px">
        <div slot="header" style="font-size: 1em">借书</div>
        <div style="margin-top: 170px" v-if="this.book.bookname===''">
            <el-input v-model="book.isbn"
                      placeholder="ISBN"
                      style="width: 400px"></el-input>
            <el-button type="success"
                       plain
                       @click="this.getSearch">点击借书</el-button>
        </div>
        <div v-else>
            <el-row>
                <el-card style="width: 150px;margin-bottom: 20px;height: 190px;float: left;margin-right: 15px"
                         bodyStyle="padding:10px" shadow="hover">
                    <div class="cover">
                        <el-image style="width: 100%;height: 100%;height: 170px;margin-bottom: 10px;" :src="book.imgpath" :fit="pic"></el-image>
                    </div>
                </el-card>
                <div style="float: left;min-width: 850px">
                    <el-card>
                        <div style="text-align: left;margin: 20px;font-size: 1.5em">
                            <span>{{book.bookname}}</span>
                        </div>
                        <div style="font-size: 13px;margin-bottom: 6px;text-align: left;font-size: 1em">
                            作者：<span>{{book.author}}</span>
                            <br/> 索书号：<span>{{book.isbn}}</span>
                            <br/> 价格：<span>{{book.price}}</span>
                            <br/>出版社：<span>{{book.publisher}}</span>
                            <br/>剩余：<span>{{book.storenum}} 本</span>
                            <br/>书本简介：<span>{{book.description}}</span>
                        </div>
                    </el-card>
                    <div @click="this.borrowBook">
                        <el-card style="background: #E6A23C;margin-top: 10px">点击借书</el-card>
                    </div>
                </div>
            </el-row>
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
      book: {
        id: 2,
        isbn: '索书号',
        bookname: '书名',
        author: '作者',
        imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
        publisher: '出版社',
        storenum: '11',
        price: '价格',
        description: '描述----------------=---------------------'
      }
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
      this.$axios.post('/book/list', {
        curPage: 1,
        isbn: isbn,
        bookname: '',
        author: '',
        publisher: '',
        size: 1
      }).then((resp) => {
        this.$message(resp.msg)
        this.books = resp.data.records[0]
      })
    },
    borrowBook () {
      console.log('借书')
      this.$axios.post('/book/borrow', {
        userId: this.$store.state.user.userid,
        isbn: this.book.isbn
      }).then((resp) => {
        this.$message(resp.msg)
        this.book = null
      })
    }
  }
}
</script>

<style scoped>

</style>
