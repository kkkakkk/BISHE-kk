<template>
  <el-container>
    <el-header style="height:40px" class="as_title">

      <el-row >
        <el-col :span="12"  type="flex"><div>学生信息管理 | 就业推荐查询</div>

        </el-col>
        <el-col :span="12"  type="flex"  style="height:20px; text-align: right;">
          <el-button type="text" class="btn_back" @click="Back2Evaluate('/AcademicStaff/StudentInfo')">返回学生列表</el-button>


        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="main_content">就业推荐查询


    </el-main>

  </el-container>

</template>

<script scoped>
    export default {
      name: "AcademicStaff_WorkRecommedation",
      methods:{
        // 返回学生列表
        Back2Evaluate(path){
          this.$router.push({
            path: path
          })
        }
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
hr{
  height: 1px;
  background: black;
  border:none;
}
.main_content{
  text-align: left;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.847058823529412);
}
</style>
