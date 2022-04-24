<template>
  <div class="main_container">
    <el-container>
      <el-header style="height:30px" class="as_title">
        {{this.course_name}} {{this.semester}}
      </el-header>

      <el-main class="main_content">
        <StudentCourseManagerTab  :course_name="course_name" :course_id="course_id" :semester="semester"></StudentCourseManagerTab>

      </el-main>

    </el-container>
  </div>

</template>

<script>
  import StudentCourseManagerTab from './StudentCourseManagerTab'
    export default {
        name: "StudentCourseManager",
      components:{
        StudentCourseManagerTab,
      },
      data(){
        return {
          course_id:'',
          course_name:'',
          activeName: 'first',
          semester:''
        }
      },
      created() {
        let courseId=''
        courseId=this.$route.query.course_id
        this.course_id=courseId

        let course_name=''
        course_name=this.$route.query.course_name
        this.course_name=course_name


        this.semester=this.$route.query.semester

      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style scoped>
  .main_container{
    width:100%;
    height: 100%;
    background-color: rgba(139, 165, 192, 0.85);
  }
  .as_title{
    /*height:40px;*/
    margin-top: 10px;
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
    margin-right: 10px;
    margin-left: 10px;
    text-align: left;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.847058823529412);
    margin-top:0px;
  }

</style>
