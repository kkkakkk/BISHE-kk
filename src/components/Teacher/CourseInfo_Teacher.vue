<template>
  <div>
    {{this.$store.state.user_id}} - {{this.$store.state.identity}}

    <div style="text-align: left">
      <el-button icon="el-icon-edit-outline" v-show="InfoBoolean" class="title_btn" @click="InitialCourse()">编辑课程信息</el-button>
      <el-button icon="el-icon-edit-outline" v-show="InfoBoolean" class="title_btn" @click="EditSupport()">编辑支撑关系</el-button>
      <el-button icon="el-icon-back" v-show="!InfoBoolean" class="title_btn" @click="BackCourse()">返回课程信息</el-button>
      
    </div>

    <br>

    <div>
      <router-view></router-view>
    </div>
    <!--<div>-->
      <!--<CourseInfo></CourseInfo>-->
    <!--</div>-->

  </div>

</template>

<script>
  import CourseInfo from '../Entity/Course/CourseInfo'
    export default {
        name: "CourseInfo_Teacher",
      props:['course_name','course_id'],
      created(){
          console.log("Teacher的课程信息，",this.course_name)

          this.InfoBoolean=true
        this.$router.push({
          path: '/Teacher/CourseManager/ShowCourseInfo',
          query: {
            course_id: this.course_id,
            course_name: this.course_name
          }
        })
      },
      data(){
          return {
            InfoBoolean:true,
          }

      },
      components:{
        CourseInfo,

      }, methods: {
        InitialCourse() {
          this.InfoBoolean = !this.InfoBoolean
          this.$router.push({
            path: "/Teacher/CourseManager/CourseInitial",
            query: {
              course_id: this.course_id,
              course_name: this.course_name
            }
          })
        },
        EditSupport(){
          this.InfoBoolean = !this.InfoBoolean
          this.$router.push({
            path: "/Teacher/CourseManager/EditSupport",
            query: {
              course_id: this.course_id,
              course_name: this.course_name
            }
          })
        },
        BackCourse() {
          this.InfoBoolean = !this.InfoBoolean
          this.$router.push({
            path: "/Teacher/CourseManager/ShowCourseInfo",
            query: {
              course_id: this.course_id,
              course_name: this.course_name
            }

          })
        }
      }
    }
</script>

<style scoped>
  .title_btn{
    background-color: rgba(195,208,222,100);
    border-style: none;
    color: black;
    font-size: 12px;
  }

</style>
