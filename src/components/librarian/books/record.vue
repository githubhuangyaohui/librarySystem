<template>
    <div>
        <!--工具栏-->
        <el-form :inline="true" size="mini" class="toolbar">
        </el-form>
        <!--表格区-->
        <el-table :data="tableData" border style="width: 100%;" size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column prop="book.bookname" label="图书名称" >
            </el-table-column>
            <el-table-column prop="isbn" label="ISBN">
            </el-table-column>
            <el-table-column prop="borrowTime" label="借书时间">
            </el-table-column>
            <el-table-column prop="returnTime" label="还书时间">
            </el-table-column>
            <el-table-column prop="dueTime" label="到期时间">
            </el-table-column>
            <el-table-column prop="expireStatus" label="当前状态">
            </el-table-column>
        </el-table>
        <!--分页区-->
        <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      limit: 10,
      total: 0,
      currentPage: 1
    }
  },
  created () {
    this.getListData()
  },
  methods: {
    handleEdit (id) {
      this.$router.push('/org/role-edit/' + id)
    },
    handleDelete (id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/org/role/delete', {id: id}).then(resp => {
          // eslint-disable-next-line eqeqeq
          if (resp.code == 200) {
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
      let isbn = this.$route.query.isbn
      console.log(isbn)
      this.$axios.get('/order/bookDetail', {
        params: {
          isbn: isbn
        }
      }).then(resp => {
        console.log(resp)
        // eslint-disable-next-line eqeqeq
        if (resp.data.code == 200) {
          this.tableData = resp.data.data.list
          // this.total = resp.data.data.total;
          this.total = resp.data.data.total
          console.log(this.userForm)
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
    },
    gotoAdd () {
      this.$router.push('/org/role-add')
    }
  }
}
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>
