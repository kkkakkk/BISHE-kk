<template>
<div>
  <el-tabs
    v-model="activeName"
    type="card"
    @tab-click="handleClick"
  >
    <el-tab-pane label="考核任务管理" name="first">
      <Assessment :course_name="course_name" :course_id="course_id"></Assessment>
    </el-tab-pane>

    <el-tab-pane label="课程信息管理" name="second">
        <CourseInfo_Teacher ></CourseInfo_Teacher>
    </el-tab-pane>

    <el-tab-pane label="学生信息管理" name="third">
      <StudentInfoManager :course_name="course_name" :course_id="course_id" ></StudentInfoManager>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
  import CourseInfo_Teacher from './CourseInfo_Teacher'
  import StudentInfoManager from './StudentInfoManager'
  import Assessment from './Assessment_teacher/Assessment'

    export default {
      name: "CourseManagerTab",
      components:{
        CourseInfo_Teacher,
        StudentInfoManager,
        Assessment,

      },
      data(){
        return {
          activeName: 'second',
          course_name:'',
          course_id:''
        }
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
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
