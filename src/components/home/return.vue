<template>
<div>
    <el-card class="main" style="min-height: 600px">
        <div slot="header" style="font-size: 1em">还书</div>
        <div style="margin-top: 170px">
            <el-input v-model="isbn"
                      placeholder="ISBN"
                      style="width: 400px"></el-input>
            <el-button type="success"
                       plain
                       @click="returnBook">点击还书</el-button>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'return',
  data () {
    return {
      isbn: ''
    }
  },
  mounted () {
    if (this.$route.query.isbn) {
      this.isbn = this.$route.query.isbn
    }
  },
  methods: {
    returnBook () {
      console.log('还书')
      this.$axios.get('/book/return', {
        params: {
          isbn: this.isbn
        }
      }).then((resp) => {
        this.$message(resp.data.msg)
        this.$router.push('/history')
      })
    }
  }
}
</script>

<style scoped>

</style>
