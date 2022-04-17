<template>

  <div>


    <hr>
    <CourseInfo :course_obj="currentRow"></CourseInfo>
    <!--<p v-show="!courseobj" style="text-align: left">{{this.courseobj_comment}}</p>-->

  </div>

</template>

<script>
  import CourseInfo from "../Entity/Course/CourseInfo";
    export default {
        name: "ShowCourseInfo",
      components: {CourseInfo},
      data(){
          return{
            currentRow:{course_id: 'defualt',course_name:'default_coursename'},

            courseobj_comment:'* 请从表格中选择课程查看课程信息'

          }
      }
    }
</script>

<style scoped>

</style>
