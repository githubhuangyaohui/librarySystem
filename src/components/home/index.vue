<template>
<div>
    <el-card class="search">
        <el-input class="search-item" v-model="searchName.isbn" placeholder="ISBN"></el-input>
        <el-input class="search-item" v-model="searchName.bookname" placeholder="书名"></el-input>
        <el-input class="search-item" v-model="searchName.author" placeholder="作者"></el-input>
        <el-input class="search-item" v-model="searchName.publisher" placeholder="出版社"></el-input>
        <el-button class="search-item" style="width: 100px" type="success" @click="initIdex(1)" plain>搜索</el-button>
    </el-card>
    <el-card class="main">
        <div>
            <el-row>
                <!--<search-bar></search-bar>-->
                <el-tooltip effect="dark" placement="right"
                            v-for="item in books"
                            :key="item.id">
                    <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.bookname}}</p>
                    <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                        作者：<span>{{item.author}}</span>
                        <br/> 索书号：<span>{{item.isbn}}</span>
                        <br/> 价格：<span>{{item.price}}</span>
                        <br/>出版社：<span>{{item.publisher}}</span>
                        <br/>剩余：<span>{{item.storenum}} 本</span>
                        <br/>书本简介：<span>{{item.description}}</span>
                    </p>
                    <el-card style="width: 150px;margin-bottom: 20px;height: 230px;float: left;margin-right: 15px"
                             bodyStyle="padding:10px" shadow="hover">
                        <div class="cover">
                            <el-image style="width: 100%;height: 100%;height: 170px;margin-bottom: 10px;" :src="item.imgpath" :fit="pic"></el-image>
                        </div>
                            <div>
                                <a @click="borrowBook(item.isbn)">{{item.bookname}}</a>
                            </div>
                    </el-card>
                </el-tooltip>
            </el-row>
            <el-row>
                <el-pagination
                        :current-page="searchName.curPage"
                        :page-size="12"
                        @current-change="this.initIdex">
                </el-pagination>
            </el-row>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'index',
  mounted () {
    this.initIdex(1)
  },
  data () {
    return {
      pic: 'cover',
      searchName: {
        curPage: 1,
        isbn: '',
        bookname: '',
        author: '',
        publisher: '',
        size: 12
      },
      books: [
        {
          id: 0,
          isbn: '',
          type: '',
          bookname: '',
          author: '',
          imgpath: '',
          publisher: '',
          storenum: '',
          price: '',
          description: ''
        }
      ]
    }
  },
  methods: {
    initIdex: function (curPage) {
      this.searchName.curPage = curPage
      console.log('获取首页列表')
      this.$axios.post('/book/list', {
        curPage: this.searchName.curPage,
        isbn: this.searchName.isbn,
        bookname: this.searchName.bookname,
        author: this.searchName.author,
        publisher: this.searchName.publisher,
        size: this.searchName.size
      }).then((resp) => {
        console.log(resp.data)
        this.$message(resp.data.msg)
        this.books = resp.data.data.records
      })
    },
    borrowBook (isbn) {
      let routerJump = this.$router.resolve({
        path: '/borrow', query: {isbn: isbn}
      })
      window.open(routerJump.href, '_self')
    }
  }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    a:visited, a:focus {
        color: #3377aa;
    }
</style>
