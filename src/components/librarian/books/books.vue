<template>
    <div>
            <template v-if="this.$route.path=='/books'">
        <!--工具栏-->
        <el-form :inline="true" size="mini" class="toolbar">
            <el-form-item label="关键字" >
                <el-input v-model='keyword' placeholder="书籍名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="gotoAdd" >新增</el-button>
            </el-form-item>
        </el-form>
        <!--表格区-->
        <el-table :data="tableData" border style="width: 100%;" size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column label="封面" width="74" align="center">
                <template slot-scope="scope" >
                    <el-image style="height: 66px" :src=scope.row.imgpath fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="bookname" label="图书名称">
            </el-table-column>
            <el-table-column prop="author" label="作者" >
            </el-table-column>
            <el-table-column prop="description" label="概述" >
            </el-table-column>
            <el-table-column prop="type" label="类型"  >
            </el-table-column>
            <el-table-column prop="isbn" label="ISBN" >
            </el-table-column>
            <el-table-column prop="id" label="ID"  >
            </el-table-column>
            <el-table-column prop="price" label="价格"  >
            </el-table-column>
            <el-table-column prop="publisher" label="出版社"  >
            </el-table-column>
            <el-table-column prop="storenum" label="库存"  >
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" plain
                @click="toHistory(scope.row.isbn)">借阅历史</el-button>
                <el-button size="mini" type="danger"  plain
                @click="Delete(scope.row.bookname)">下架</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!--分页区-->
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="size"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        </template>
        <router-view class="homeRouterView"></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      limit: 10,
      total: 0,
      keyword: '',
      currentPage: 1,
      size: 7
    }
  },
  created () {
    this.currentPage = 1
    this.getListData()
  },
  methods: {
    toHistory (isbn) {
      this.$router.push('/record?isbn=' + isbn)
    },
    Delete (bookname) {
      this.$confirm('确定要下架吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/book/delete', {
          params: {
            bookname: bookname
          }
        }).then(resp => {
          console.log('下架情况')
          console.log(resp)
          // eslint-disable-next-line eqeqeq
          if (resp.data.code == 200) {
            this.$message({
              type: 'info',
              message: '已下架图书'
            })
            this.currentPage = 1
            this.getListData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    getListData () {
      let form = {
        curPage: this.currentPage,
        size: this.size,
        bookname: this.keyword
      }
      this.$axios.get('/book/list', {
        params: form
      }).then(resp => {
        // eslint-disable-next-line eqeqeq
        if (resp.data.code == 200) {
          this.tableData = resp.data.data.records
          this.total = resp.data.data.total
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getListData()
    },
    onSearch () {
      this.getListData()
      this.keyword = ''
    },
    gotoAdd () {
      this.$router.push('/add')
    }
  }
}
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>
