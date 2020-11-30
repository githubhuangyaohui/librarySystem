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
                                <a href="">{{item.bookname}}</a>
                            </div>
                    </el-card>
                </el-tooltip>
            </el-row>
            <el-row>
                <el-pagination
                        :current-page="curPage"
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
          bookname: '',
          author: '',
          imgpath: '',
          publisher: '',
          storenum: '',
          price: '',
          description: ''
        },
        {
          id: 2,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '11',
          price: '价格',
          description: '描述----------------=---------------------'
        },
        {
          id: 3,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606730271175&di=d17aa51b2b85f28f334aa893b83300b8&imgtype=0&src=http%3A%2F%2Fhbimg.huabanimg.com%2Fba60d9bb3a3fda9beed7c813abc7c6b9cf686f8718928-lwZ4Ns_fw658',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 4,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 5,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 6,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 7,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 8,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 9,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 10,
          isbn: '索书号',
          bookname: '书名',
          author: '作者',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        },
        {
          id: 11,
          isbn: '索书号',
          bookname: '111111111111111',
          author: '作者111111111111111111',
          imgpath: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2033382903,3094869815&fm=26&gp=0.jpg',
          publisher: '出版社',
          storenum: '',
          price: '价格',
          description: '描述'
        }
      ]
    }
  },
  methods: {
    initIdex: function (curPage) {
      this.searchName.curPage = curPage
      console.log('获取一次列表')
      this.$axios.post('/book/list', {
        curPage: this.searchName.curPage,
        isbn: this.searchName.isbn,
        bookname: this.searchName.bookname,
        author: this.searchName.author,
        publisher: this.searchName.publisher,
        size: this.searchName.size
      }).then((resp) => {
        this.books = resp.data
      })
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
