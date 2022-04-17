<template>
  <el-container>
    <el-header style="height:40px" class="as_title">

      <el-row >
        <el-col :span="12"  type="flex"><div>培养方案管理 | 查看培养方案</div>

        </el-col>
        <el-col :span="12"  type="flex"  style="height:20px; text-align: right;">
            <el-button type="text" class="btn_back" @click="clickevent('/AcademicStaff/TrainingProgram')">返回培养方案列表</el-button>


        </el-col>
      </el-row>
      <hr/>

    </el-header>

    <el-main class="main_tp_info">

          <TrainingProgramInfo></TrainingProgramInfo>

    </el-main>


  </el-container>
</template>

<script>
   import TrainingProgramInfo from "../../Entity/TrainingProgram/TrainingProgramInfo.vue"
    export default {
        name: "AcademicStaff_ViewTrainingProgram",
      components:{
          TrainingProgramInfo
      },
      methods:{
        clickevent (path) {
          this.$router.push(path)
        },
      }
    }
</script>

<style scoped>

  .as_title{
    height:40px;
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

  .main_tp_info{
    background-color: white;
    border-radius: 5px;
    padding-top: 0px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;

    /*margin-top:0px;*/
    /*margin-bottom:0px;*/
    /*height: 100%;*/
    /*width: 100%;*/
  }
  .btn_back{
    color: #000000;
    text-decoration: underline;

    font-size:12px;
  }
  .btn_back:hover,
  .btn_back:focus{
    color: #555555;
    text-decoration: underline;
    font-size:12px;
  }

</style>
