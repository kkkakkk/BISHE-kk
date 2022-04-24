<template>

  <div class="main_container">


    <el-divider></el-divider>
    <span style="float: left;margin-left: 10px;font-weight: bold; margin-bottom: 10px;font-size: 16px">我教的课</span>

    <br>
    <br>
    <div>
      <el-row>
        <el-col :span="6" v-for="(course_item,index) in course_list" :key="index" v-if="course_item.status==1" :offset="0" >
            <el-card class="box-card" shadow="hover" @click.native =  "clickTab(course_item.course_id,course_item.course_name,course_item.semester)">
              <div slot="header" class="clearfix">

                <span style="float: left;font-size: 18px;font-weight: bold">{{course_item.course_name}}</span>
                <el-tag type="success" style="float: right">进行中</el-tag>
              </div>
              <div style="text-align: left;margin-top: 40px">
                <i class="el-icon-date"></i>
                <span style="font-size: 12px">{{course_item.start_date}}-{{course_item.end_date}}</span>

              </div>

            </el-card>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="6" v-for="(course_item,index) in course_list" :key="index"  v-if="course_item.status==0" :offset="0" >

            <el-card class="box-card" shadow="hover" @click.native =  "clickTab(course_item.course_id,course_item.course_name,course_item.semester)">

              <div slot="header" class="clearfix">

                <span style="float: left;font-size: 18px;font-weight: bold">{{course_item.course_name}}</span>
                <el-tag type="info" style="float: right">未开课</el-tag>
              </div>
              <div style="text-align: left;margin-top: 40px">
                <i class="el-icon-date"></i>
                <span style="font-size: 12px">{{course_item.start_date}}-{{course_item.end_date}}</span>

              </div>

            </el-card>

        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" v-for="(course_item,index) in course_list" :key="index"  v-if="course_item.status==2" :offset="0" >
            <el-card class="box-card"  shadow="hover" @click.native =  "clickTab(course_item.course_id,course_item.course_name,course_item.semester)">

              <div slot="header" class="clearfix">

                <span style="float: left;font-size: 18px;font-weight: bold">{{course_item.course_name}}</span>
                <el-tag type="warning" style="float: right">结课中</el-tag>
              </div>
              <div style="text-align: left;margin-top: 40px">
                <i class="el-icon-date"></i>
                <span style="font-size: 12px">{{course_item.start_date}}-{{course_item.end_date}}</span>

              </div>


            </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6" v-for="(course_item,index) in course_list" :key="index"  v-if="course_item.status==3" :offset="0" >

            <el-card class="box-card"  shadow="hover" @click.native = "clickTab(course_item.course_id,course_item.course_name,course_item.semester)">

              <div slot="header" class="clearfix">

                <span style="float: left;font-size: 18px;font-weight: bold">{{course_item.course_name}}</span>
                <el-tag type="" style="float: right">已结课</el-tag>
              </div>
              <div style="text-align: left;margin-top: 40px">
                <i class="el-icon-date"></i>
                <span style="font-size: 12px">{{course_item.start_date}}-{{course_item.end_date}}</span>

              </div>

            </el-card>

        </el-col>
      </el-row>









    </div>





  </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "TeacherCourseList",
      data(){
          return{
            course_list:[],
            current_date:''
          }
      },
      created(){
        let that = this;
        axios.get("/data_query/course_list",{
          params:{
            // course_id: that.course_i
            user_id:that.$store.state.user_id,
            user_identity: that.$store.state.identity
          }
        }).then(function (response){
            console.log(response.data);
            if(response.data.code=='000000'){
              that.course_list = response.data.data.course_list;
              console.log("get course_list:",that.course_list)

            }
            else{alert('code或msg错误')}
          },
          function (err) {
            console.log("error");
            alert("请求失败");
          }
        );


      },
      methods:{
        clickTab (course_id,course_name,semester) {

          this.$router.push({
            path: '/Teacher/CourseManager',
            query: {
              course_id: course_id,
              course_name: course_name,
              semester:semester
            }
          })

        },
        tagType(index){
          if(index === 0){
            return ""
          }else if(index==1){
            return "success"
          }else if(index==2){
            return "warning"
          }else if(index==3){
            return "info"
          }
          else{
            return "info"
          }
        },



      }
    }
</script>

<style scoped>

  .el-divider {
    background-color: #3b6998;
    height: 2px;
    margin-top:0px;
  }

  .main_container{
    width:100%;
    height: 100%;
  }
  hr{
    height: 1px;
    background: black;
    border:none;
  }


  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 320px;
    margin: 10px 10px 10px 10px;
    background-color: #f0f4f7;
  }




</style>
