<template>
  <el-col>
    <!--添加判断语句 如果有课程就自动active 第一个课程-->
    <el-menu default-active="this.$router.path"  @open="handleOpen" @close="handleClose">

      <el-menu-item index="1" @click="clickTab('/Teacher/CourseList')" >
      课程管理
      </el-menu-item>

    </el-menu>
  </el-col>
</template>

<script>
    export default {
        name: "Teacher_Header",


        methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
          clickTab (path) {
            this.$router.push(path)
          },

        // toCourseDetail(course) {
          //   console.log(course.name);
          //     this.$router.replace({
          //       path: "/redirect",
          //       query: {
          //         nextPath: '/Teacher/CourseManager',
          //         course_id: course.id,
          //         course_name:course.name
          //       }
          //     })
          //   },

        },

    }
</script>

<style scoped>
  /*.base{*/
    /*!*background-color: rgba(139, 165, 192,100);*!*/
    /*background-color:rgba(235, 239, 244, 100);*/
    /*text-color:"#000000";*/
    /*text-align:left;*/
    /*active-text-color:"#000000";*/
    /*active-color:rgba(210,220,231,100);*/

  /*}*/

  /deep/ .el-menu-item{
    height:50px;
    active-color: rgb(216, 223, 230);
    font-size: 14px;
    /*width:100%;*/

  }



  /deep/ .el-menu-item.is-active{
    background-color: rgb(216, 223, 230)!important;
    color: black;
  }


</style>
