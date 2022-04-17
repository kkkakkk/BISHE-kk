<template>
  <div style="width: 100%;">
    <el-container class="main_container">
      <el-header style="height:40px" class="as_title">
        {{this.course_name}} | 考核任务列表
        <hr/>
      </el-header>

      <el-main class="main_content">
        <!--        传递coursename id 参数-->
        <AssessList :course_name="course_name" :course_id="course_id" ></AssessList>

      </el-main>

    </el-container>
  </div>
</template>

<script scoped>
import AssessList from './AssessList_Student'
export default {
  name: "AssessmentManager",
  components:{
    AssessList,
  },
  data(){
    return{
      course_name:'',
      course_id:''
    }
  },

  created() {
    let courseId=''
    courseId=this.$route.query.course_id
    this.course_id=courseId

    let course_name=''
    course_name=this.$route.query.course_name
    this.course_name=course_name
    this.$route.params.username
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
}
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
.main_content{
  /*height:100%;*/
  text-align: left;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top:0px;
  margin-left:10px;
  margin-right:10px;
  /*height:100%;*/
  /*border: 2px solid rgb(59,105,152);*/
}

</style>
