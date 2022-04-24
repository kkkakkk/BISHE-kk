<template>
  <div class="main_container">
    <!-- <el-row>
      <el-col :span="24"><div class="grid-content bg"> -->
    <div class="top_content">
      <div class="top_content_left">
        <i class="el-icon-document" style="width:170px">
          <span style="font-size: 14px;font-weight: bold;text-align: left">班级列表</span>

        </i>
        <el-input v-model="input" placeholder="软件工程基础" class="top_content_input" style="font-size: 12px"></el-input>
      </div>
      <!--<el-button type="primary" class="button" size="small">设置班级信息</el-button>-->
    </div>


    <el-table
      :header-cell-style="{background:'#ebeff4',color:'#1d344f','text-align':'center','font-size':'12px',border:'1px solid rgb(59,105,152)'}"
      :cell-style="{background:'#f0f4f7',color:'#2b4b71',height:'40px','text-align':'center','font-size':'12px',padding:'0px',border:'1px solid rgb(59,105,152)'}"
      @current-change="handleSelectCourse"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      :current-page.sync="currentPage">

      <el-table-column prop="course_name" label="课程名称" >
      </el-table-column>
      <el-table-column prop="course_no" label="子班序号" >
      </el-table-column>
      <el-table-column prop="semester" label="开课学期" >
      </el-table-column>
      <el-table-column prop="start_date" label="开课时间" >
      </el-table-column>
      <el-table-column prop="end_date" label="结课时间" >
      </el-table-column>
      <el-table-column prop="teacher_name" label="授课老师" >
      </el-table-column>

    </el-table>

    <div style="font-size:12px;text-align: center;margin-top: 30px;">
      <el-pagination background layout="prev, pager, next"
                     :total="total"
                     :page-size="pagesize"
                     @size-change="handleSizeChange"
                     @current-change="current_change">
      </el-pagination>
    </div>



    <div>


      <hr>
      <CourseInfo v-show="courseobj" :course_obj="currentRow"></CourseInfo>
      <p v-show="!courseobj" style="text-align: left">{{this.courseobj_comment}}</p>

    </div>



  </div>




</template>

<script>
  import axios from "axios";
  import CourseInfo from '../../Entity/Course/CourseInfo'
  export default {
    name: "CourseList",
    props:['training_program_id','major','year'],
    components:{
      CourseInfo
    },
    data() {
      return {
        input: '',
        tableData: [{}],
        total: 1,
        pagesize: 10,
        currentPage: 1,
        currentRow:[],
        courseobj:false,
        courseobj_comment:'* 请从表格中选择课程查看课程信息'
      }
    },
    created() {
      console.log("create func")
      let that = this;
      axios.get("/data_query/course_list_by_training_program_id", {
        params: {
            major:that.major,
          year:that.year
        }
      }).then(function (response) {
          console.log(response)
          if ((response.data.code == '000000') ) {
            that.tableData = response.data.data.course_list
            that.total = that.tableData.length
            console.log("tableData", that.tableData, "length", that.total)
          } else {
            alert('提交任务部分code或msg错误')
          }
        },
        function (err) {
          console.log("error");
          alert("请求失败");
        }
      );
    },
    // watch: {
    //   courseobj_comment:{}
    // },
    methods: {
      addUser() {
        let that = this;

        axios.get("/data_query/course_list", {
          params: {
            user_id: that.$store.state.user_id,
            user_identity: that.$store.state.identity
          }
        })
        // axios({
        //   method: 'GET',
        //   url: '/data_query/course_list',
        //   data: {
        //     user_id: 'PKU10085-SE080902-ST202011223344',
        //     user_identity: 'ST'
        //   }
        // })
          .then(function (response) {
              console.log(response)
              if (response.data.code == '000000') {
                //alert('上传成功')
                console.log(response)
              } else {
                alert('提交任务部分code或msg错误')
              }
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );



      },
      handleSelectCourse(val){
        this.currentRow = val;
        console.log("当前选中",this.currentRow)
        if(this.currentRow.status==0){
          //没有开课
          this.courseobj = false;
          this.courseobj_comment='* 该课程没有初始化'
        }else {
          this.courseobj = true;
        }


      },
      current_change: function (currentPage) {
        this.currentPage = currentPage;
      },
      handleSizeChange: function(val) {
        this.pagesize=val;
      },
      mounted: function () {
        // console.log("adduser func")
        // this.addUser();
      }
    }
  }

</script>

<style scoped>
  .main_container {
    /*margin-top: 10px;*/
    /*border: 2px solid rgb(59, 105, 152);*/
    border-radius: 10px;
    background: #ebeff4;
    padding: 15px
  }

  .button {
    background-color: #3b6998;
    font-weight: bold;
    border: none;
    font-weight: 700
  }

  .top_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*border-bottom: 1px solid rgb(59,105,152);*/
    padding-bottom:10px

  }
  .top_content_left{
    display: flex;
    align-items: center;
    color:  rgb(59,105,152);

  }
  .top_content_input{

  }
  /deep/ .el-input__inner{
    width: 300px;
    height: 25px;
    border-radius: 25px;
    border:1px solid rgb(59,105,152);
  }


  .bg {
    background: #ebeff4;
  }



  .bg-white {
    background-color: white;
  }

  p {
    font-size: 2px;
  }

  h5 {
    color: #3b6998;
  }
  hr{
    /*height: 1px;*/
    background: rgb(59,105,152);
    border:1px solid rgb(59,105,152);
  }



</style>
