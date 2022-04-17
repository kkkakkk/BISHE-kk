<template>
  <el-container>
    <el-header style="height:40px" class="as_title">

      <el-row >
        <el-col :span="12"  type="flex"><div>培养方案管理 | 查看教学数据</div>

        </el-col>
        <el-col :span="12"  type="flex"  style="height:20px; text-align: right;">
          <el-button type="text" class="btn_back" @click="clickevent('/AcademicStaff/TrainingProgram')">返回培养方案列表</el-button>


        </el-col>
      </el-row>
      <hr/>

    </el-header>

    <el-main style="padding: 1px">
      <!--查看课程信息-->
      <CourseList></CourseList>
      <!--<CourseInfo></CourseInfo>-->
    </el-main>
  </el-container>
</template>


<script>

  import CourseList from '../../Entity/Course/CourseList'
  export default {
    name: "AcademicStaff_TeachingInfo",
    components:{
      CourseList,
      // CourseInfo
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

  .btn_back{
      color: #000000;
      text-decoration: underline;

      font-size:12px;
    }.btn_back:hover,
     .btn_back:focus{
       color: #555555;
       text-decoration: underline;
       font-size:12px;
     }

</style>
