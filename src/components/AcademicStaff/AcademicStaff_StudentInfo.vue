<template>
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        学生信息管理
      <hr/>
      </el-header>

      <el-main class="main_content">
        <i class="el-icon-user-solid" style="color:rgb(52,94,143) "></i>
        <b class="title_text">学生列表</b>

        <el-button type="primary" icon="el-icon-search" class="title_btn" v-on:click="gotoPage()">就业推荐查询</el-button>
        <br>
        <br>

        <StudentEvaluateList></StudentEvaluateList>

      </el-main>

    </el-container>

  </div>

</template>

<script scoped>
  import StudentEvaluateList from "./StudentInfo/StudentEvaluateList.vue"
    export default {
      name: "AcademicStaff_StudentInfo",
      components:{
        StudentEvaluateList
      },
      methods:{
        //跳转就业推荐查询页面
        gotoPage(){
          this.$router.push({path:'/AcademicStaff/WorkRecommedation'})
        }
      }
    }
</script>

<style scoped>
  .main_container{
    width:100%;
    height: 100%;
  }
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
  .main_content{
    /*height:100%;*/
    text-align: left;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.847058823529412);
    margin-top:0px;
  }
  .title_text{
    color:rgb(52,94,143);
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
    font-style:normal;
    font-size:14px;
    margin-right: 10px;
  }
  .title_btn{
    background-color: rgb(159,181,203);
    border-style: none;
  }

</style>
