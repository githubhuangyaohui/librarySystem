<template>
    <div class="defaultForm">
        <el-form :model="dataForm" :rules="rules" ref="dataForm" size="small" label-width="135px" >
            <el-form-item label="图书名称" prop="bookname">
                <el-input v-model="dataForm.bookname"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model="dataForm.type"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="dataForm.price"></el-input>
            </el-form-item>
            <el-form-item label="ISBN" prop="isbn">
                <el-input v-model="dataForm.isbn"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input v-model="dataForm.author"></el-input>
            </el-form-item>
            <el-form-item label="图书封面" prop="imgpath">
                <el-input v-model="dataForm.imgpath"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
                <el-input v-model="dataForm.publisher"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="storenum">
                <el-input v-model="dataForm.storenum"></el-input>
            </el-form-item>
            <el-form-item label="概述" prop="description">
                <el-input v-model="dataForm.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(dataForm)">确认</el-button>
                <el-button @click="$router.back(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      parentCascaderOptions: [],
      dataForm: {
        // bookname: "活着",
        // isbn: "TB123195",
        // author: "余华",
        // imgpath: "https://pic3.zhimg.com/80/v2-8d5eb1e1bc8686a8a23d3d50e8f915ea_720w.jpg",
        // publisher: "美好出版社",
        // storenum: "10",
        // price: "10",
        // type:"小说",
        // description: "一本小说"
      }
    }
  },
  created () {

  },
  methods: {
    submitForm (dataForm) {
      this.$axios.post('/book/add', dataForm)
        .then(() => {
          this.$router.push('/books')
          this.$message({
            type: 'info',
            message: '添加成功'
          })
        })
    }
  }
}
</script>

<style scoped>
    .defaultForm {
        margin-top: 20px;
        width: 85%
    }
    .el-cascader {
      width: 50%;
    }
</style>
