<template>
<div>
  <el-tabs
    v-model="activeName"
    type="card"
    @tab-click="handleClick"
  >

    <el-tab-pane label="教学日志" name="one">
      <TeacherLog :course_name="course_name" :course_id="course_id" :semester="semester"></TeacherLog>
    </el-tab-pane>


    <el-tab-pane label="考核任务" name="two">
      <Assessment :course_name="course_name" :course_id="course_id"></Assessment>
    </el-tab-pane>

    <el-tab-pane label="数据统计" name="three">
      <TeacherDataStatistic :course_name="course_name" :course_id="course_id" :semester="semester"></TeacherDataStatistic>
      <!--<CourseInfo_Teacher ></CourseInfo_Teacher>-->
    </el-tab-pane>

    <el-tab-pane label="学生管理" name="four">
      <StudentInfoManager :course_name="course_name" :course_id="course_id" ></StudentInfoManager>
    </el-tab-pane>

    <el-tab-pane label="课程信息" name="five">
        <CourseInfo_Teacher  :course_name="course_name" :course_id="course_id" ></CourseInfo_Teacher>
    </el-tab-pane>


  </el-tabs>
</div>
</template>

<script>
  import CourseInfo_Teacher from './CourseInfo_Teacher'
  import StudentInfoManager from './StudentInfoManager'
  import Assessment from './Assessment_teacher/Assessment'
  import TeacherLog from './TeacherLog'
  import TeacherDataStatistic from './TeacherDataStatistic'

    export default {
      name: "CourseManagerTab",
      props: ['course_name','course_id','semester'],

      components:{
        CourseInfo_Teacher,
        StudentInfoManager,
        TeacherLog,
        Assessment,
        TeacherDataStatistic

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
      // created() {
      //   let courseId=''
      //   courseId=this.$route.query.course_id
      //   this.course_id=courseId
      //
      //   let course_name=''
      //   course_name=this.$route.query.course_name
      //   this.course_name=course_name
      //
      // },
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
