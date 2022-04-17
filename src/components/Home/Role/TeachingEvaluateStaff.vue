<template>
  <body>
    <el-container class="base">
      <el-aside  width="200px">
        <Profile></Profile>
        <div class="aside_left_margin">
          <TeachingEvaluateStaff_Header></TeachingEvaluateStaff_Header>
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
  </body>
</template>

<script>
    import Profile from "@/components/Home/Profile";
    import ObeTitle from "@/components/Home/ObeTitle";
    import TeachingEvaluateStaff_Header from "@/components/TeachingEvaluateStaff/TeachingEvaluateStaff_Header";

    export default {
        name: "TeachingEvaluateStaff",
      components:{
        Profile,
        ObeTitle,
        TeachingEvaluateStaff_Header

      }
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
</style>
