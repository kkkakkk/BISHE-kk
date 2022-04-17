<template>
  <div>

    <div style="text-align: left">
      <el-button icon="el-icon-edit-outline" v-show="InfoBoolean" class="title_btn" @click="InitialCourse()">编辑课程信息</el-button>
      <el-button icon="el-icon-edit-outline" v-show="InfoBoolean" class="title_btn" @click="EditSupport()">编辑支撑关系</el-button>
      <el-button icon="el-icon-back" v-show="!InfoBoolean" class="title_btn" @click="BackCourse()">返回课程信息</el-button>
      
    </div>

    <br>
    <!--<div>-->
      <!--<button @click="InitialCourse()">返回课程信息</button>-->
    <!--</div>-->


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
      created(){

          this.InfoBoolean=true
        this.$router.push({
          path: '/Teacher/CourseManager/ShowCourseInfo',
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
          })
        },
        EditSupport(){
          this.InfoBoolean = !this.InfoBoolean
          this.$router.push({
            path: "/Teacher/CourseManager/EditSupport",
          })
        },
        BackCourse() {
          this.InfoBoolean = !this.InfoBoolean
          this.$router.push({
            path: "/Teacher/CourseManager/ShowCourseInfo",

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
