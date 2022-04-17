<template>
  <div>
    <el-container class="base">
      <el-aside width="200px" >
        <Profile></Profile>
        <div class="aside_left_margin">
          <CourseEvaluate_Header></CourseEvaluate_Header>
        </div>
      </el-aside>

      <el-container class="aside_right">

        <el-header class="obe_title">
          <ObeTitle></ObeTitle>
        </el-header>

        <el-container class="aside_main">
          <!--注入不同内容块-->
          <router-view/>
        </el-container>

      </el-container>
    </el-container>

  </div>
</template>

<script>
  import Profile from "../Profile"
  import ObeTitle from '../ObeTitle'
  import CourseEvaluate_Header from '../../CourseEvaluateStaff/CourseEvaluateStaff_Header'
    export default {
        name: "CourseEvaluateStaff",
      components:{
        Profile,
        ObeTitle,
        CourseEvaluate_Header
      },
      // data(){
      //     return{
      //       my_course_list:[]
      //     }
      //
      // },

    }
</script>

<style scoped>
  .base {
    background-color:rgba(59, 105, 152, 1);
    position: absolute;
    width:1200px;
    height:auto;
    min-height: 100%;
    top:0%;
    left:50%;
    transform: translate(-50%);
  }

  .aside_left_margin{
    margin-top:10px;
    margin-left:10px;
    margin-right:10px;
    margin-bottom:10px;
  }
  .obe_title{
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
    color: black;
    font-style:normal;
    font-size:20px;
    text-align:left;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 25px;
    margin-right: 10px;
  }

  .aside_right{
    border-radius: 5px;
    background-color:rgba(255, 255, 255, 255);
    margin-top:10px;
    margin-right:10px;
    margin-bottom: 10px;
  }
  .aside_main{
    border-radius: 5px;
    background-color:rgba(139, 165, 192, 83);
    margin-left:10px;
    margin-right:10px;
    margin-bottom: 10px;
    padding: 15px 10px 10px 10px;
    /*display:flex;*/
    /*flex-direction: row;*/
  }


  .main_page_title{
    color: #000;
    text-align: left;
    font-weight: bold;
    font-size:16px;
  }
  hr{
    height: 1px;
    background: black;
    border:none;
  }
  .main_content{
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.847058823529412);
    margin-top:0px;
  }

</style>
