<template>
    <div>
        <!--工具栏-->
        <!--表格区-->
        <el-table :data="tableData" border style="width: 100%;" size="small">
            <template slot="empty">
                还没有数据呢~ (⊙︿⊙)
            </template>
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间">
            </el-table-column>
            <el-table-column prop="lastTime" label="上次登录时间">
            </el-table-column>
            <el-table-column align="center" label="操作" width="240">
            <template slot-scope="scope" >
                <el-button size="mini" type="danger"  plain
                @click="handleDelete(scope.row.username)">取消授权</el-button>
                <el-button size="mini" type="normal"  plain
                @click="handleDetails(scope.row.id,scope.row.username)">详情</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!--分页区-->
        <div class="Pagination" style="text-align: left; margin-top: 10px;">
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
      tableData: [
        {
        }
      ],
      limit: 10,
      total: 0,
      currentPage: 1,
      size: 1
    }
  },
  created () {
    this.getListData()
  },
  methods: {
    toPage (name) {
      this.$router.push({path: name})
    },
    handleDetails (id, username) {
      this.$router.push('/personal?id=' + id + '&username=' + username)
    },
    handleEdit (id) {
      this.$router.push('/personal' + id)
    },
    handleDelete (name) {
      this.$confirm('确定要取消授权吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log({
          username: name
        })
        this.$axios.get('/user/delete', {
          params: {
            username: name
          }
        }).then(resp => {
          console.log(resp)
          // eslint-disable-next-line eqeqeq
          if (resp.data.code == 200) {
            this.$message({
              type: 'info',
              message: '注销成功'
            })
            this.getListData()
            console.log(resp)
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
      this.$axios.get('/user/listUsers',
        {
          params: {
            curPage: 1,
            size: 10}
        }).then(resp => {
        console.log('列表请求')
        console.log(resp)

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
    },
    gotoAdd () {
      this.$router.push('/book/author-add')
    }
  }
}
</script>

<style scoped>
    .toolbar{
        height: 40px;
    }
</style>
