<template>
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        课程评议 | {{this.course_name}}
        <hr/>
      </el-header>

      <el-main class="main_content">
        <CourseInfo></CourseInfo>

      </el-main>

    </el-container>
  </div>


</template>

<script>
  import CourseInfo from '../Entity/Course/CourseInfo'
    export default {
        name: "CourseEvaluateStaff_CourseInfo",
      components: {CourseInfo},
      comments:{
        CourseInfo
      },
      data(){
        return {
          course_id:'',
          course_name:'',
        }
      },
      created() {
        let courseId=''
        courseId=this.$route.query.course_id
        this.course_id=courseId

        let course_name=''
        course_name=this.$route.query.course_name
        this.course_name=course_name
      },
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
</style>
