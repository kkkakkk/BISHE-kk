<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >

      <el-tab-pane label="教学日志" name="one">
        <StudentLog :course_name="course_name" :course_id="course_id" :semester="semester"></StudentLog>
      </el-tab-pane>


      <el-tab-pane label="考核任务" name="two">
        <AssessmentManager :course_name="course_name" :course_id="course_id"></AssessmentManager>
      </el-tab-pane>

      <el-tab-pane label="课程信息" name="five">
        <CourseInfo_Student  :course_name="course_name" :course_id="course_id" ></CourseInfo_Student>
      </el-tab-pane>


    </el-tabs>
  </div>
</template>

<script>
  import StudentLog from './StudentLog';
  import AssessmentManager from './AssessmentManager';
  import CourseInfo_Student from './CourseInfo_Student'
    export default {
        name: "StudentCourseManagerTab",
      props: ['course_name','course_id','semester'],

      components:{
        StudentLog,
        AssessmentManager,
        CourseInfo_Student


      },
      data(){
        return {
          activeName: 'one',
          // course_id:'default_course_id',
          // course_name:'default_course_name',
          // semester:'default_semester'

        }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
    }
</script>

<style scoped>


  /deep/ .el-tabs__item {
    color: #000000;
    /*background-color: rgba(195,208,222,0.51);*/
  }
  /deep/ .el-tabs__item.is-active {
    color: #000000;
    font-weight: bold;
    background-color: rgba(139, 165, 192, 0.8);
  }

</style>
