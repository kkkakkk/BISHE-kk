<template>
  <el-container>
    <el-header style="height:40px" class="as_title">


      <el-col :span="12" style="text-align: left"> 培养方案管理 | 添加培养方案</el-col>
      <el-col :span="12" style="text-align: right">
        <el-button
          size="mini"
          type="text"
          style="color: #000000; text-decoration: underline"
          @click="Back2List()">返回培养方案列表</el-button>
      </el-col>

      <br/><hr/>
    </el-header>

    <el-main style="background-color: white; border-radius: 5px;">
      <!--初始化培养方案模块-->
      <InitialTPstep></InitialTPstep>
    </el-main>
  </el-container>
</template>

<script>
  import InitialTPstep from './_InitialTPstep.vue'
    export default {
        name: "AcademicStaff_InitialTrainingProgram",
      methods:{
        Back2List(){
          this.$router.go(-1)
        }
      },
      components:{
        InitialTPstep
      }
    }
</script>

<style scoped>
  .as_title{
    /*height:40px;*/
    text-align:left;
    font-weight:bold;
    font-size:16px;
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
  }
  hr{
    height: 1px;
    background: black;
    border:none;
  }

</style>
