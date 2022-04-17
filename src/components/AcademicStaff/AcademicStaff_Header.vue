<template>
  <div  style="text-align: left;width: 100%">


      <!--<h5>自定义颜色</h5>-->
      <el-menu default-active="1-1"
               @open="handleOpen" @close="handleClose"
              >

        <el-submenu index="1"
                    @click="clickTab('/AcademicStaff/MonitoringCourse')"
                    class="mysubmenu">
          <template slot="title">
            <i class="el-icon-s-data" :style="{color:'#ffffff'}"></i>
            <span  slot="title" >教学状态监控</span>


          </template>

          <el-menu-item index="1-1"
                        @click="clickTab('/AcademicStaff/MonitoringCourse')">
            <span slot="title" >考核任务情况</span>
          </el-menu-item>

          <el-menu-item index="1-2"
                        @click="clickTab('/AcademicStaff/MonitoringCourse')">
            <span slot="title">课程评价情况</span>
          </el-menu-item>

          <el-menu-item index="1-3"
                        @click="clickTab('/AcademicStaff/MonitoringCourse')">
            <span slot="title">毕业要求达成情况</span>
          </el-menu-item>

        </el-submenu>



        <el-submenu index="2"
                    @click="clickTab('/AcademicStaff/EndingCourse')">
          <template slot="title">
            <i class="el-icon-s-platform" :style="{color:'#ffffff'}"></i>
            <span>教学计划管理</span>
          </template>

          <el-menu-item index="2-1"
                        @click="clickTab('/AcademicStaff/EndingCourse')">
            <span slot="title">课程结课管理</span>
          </el-menu-item>

          <el-menu-item index="2-2"
                        @click="clickTab('/AcademicStaff/HistoryTP')">
            <span slot="title">历史培养方案管理</span>
          </el-menu-item>

          <el-menu-item index="2-3"
                        @click="clickTab('/AcademicStaff/JobRecommendation')">
            <span slot="title">就业推荐管理</span>
          </el-menu-item>

        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-edit-outline" :style="{color:'#ffffff'}"></i>
            <span>教学计划设置</span>
          </template>

          <el-menu-item index="3-1"
                        @click="clickTab('/AcademicStaff/TrainingProgram')">
            <span slot="title">培养方案列表</span>
          </el-menu-item>

          <el-menu-item index="3-2"
                        @click="clickTab('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_1/FatherStep_1')">
            <span slot="title">培养目标与毕业要求设置</span>
          </el-menu-item>

          <el-menu-item index="3-3"
                        @click="clickTab('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_2/FatherStep_2')">
            <span slot="title">课程信息设置</span>
          </el-menu-item>

          <el-menu-item index="3-4"
                        @click="clickTab('/AcademicStaff/TrainingProgram/InitialTPstepComponents/Part_3/FatherStep_3')">
            <span slot="title">班级信息设置</span>
          </el-menu-item>

          <el-menu-item index="3-5"
                        @click="clickTab('/AcademicStaff/TeacherInfo')">
            <span slot="title">教师信息设置</span>
          </el-menu-item>
          <el-menu-item index="3-6"
                        @click="clickTab('/AcademicStaff/StudentInfoInit')">
            <span slot="title">学生信息设置</span>
          </el-menu-item>

        </el-submenu>



      </el-menu>


  </div>

</template>

<script>
    export default {
        name: "AcademicStaff_Header",
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


      }
    }

</script>

<style scoped>


  /deep/ .el-submenu{
    background-color: rgb(139, 165, 192);
    /*width:100%;*/
  }


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
