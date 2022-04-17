<template>
  <el-container>
    <el-header style="height:40px" class="as_title">
      培养方案{{this.tp_year}}-{{this.tp_major}} | 查看教学数据
      <hr/>
    </el-header>

    <el-main style="background-color: white; border-radius: 5px;">
      <!--查看课程信息-->
      <CourseList></CourseList>
      <CourseInfo></CourseInfo>
    </el-main>
  </el-container>
</template>

<script>
  import CourseInfo from '../Entity/Course/CourseInfo'
  import CourseList from '../Entity/Course/CourseList'
    export default {
        name: "TeachingEvaluateStaff_Course",
      components:{
        CourseList,
        CourseInfo
      },
      data(){
        return {
          tp_id:'',
          tp_year:'',
          tp_major:''
        }
      },
      created() {
        console.log("GET",this.$route.query)

        // // console.log('get',tp1)
        this.tp_id = this.$route.query.tp_id;
        this.tp_year = this.$route.query.tp_year;
        this.tp_major = this.$route.query.tp_major;

        // console.log(this.tp_id)
      }
    }
</script>

<style scoped>
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
</style>
