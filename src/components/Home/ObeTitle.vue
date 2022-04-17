<template>
    <div>
      <el-row>
        <el-col :span="12"><div>教学过程管理与评价</div></el-col>
        <el-col :span="12">
          <div class="return_btn"><el-button @click="backtologin('/')">返回登录</el-button></div></el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "ObeTitle",
      methods:{
          backtologin(path){
            this.$router.push({
              path: path,
            })
          }
      }
    }
</script>

<style scoped>
  .return_btn{
    /*text-decoration: underline;*/
    color: #000;
    /*margin-right: 10px;*/
    text-align: right;
    font-size:12px;
  }
</style>
