<template>
  <!--<div>提供上传教师信息的按钮 并显示上传结果</div>-->
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划设置 | 人员信息管理
        <hr/>
      </el-header>
      <el-main class="main_content">
        <el-row style="text-align: left" type="flex" align="middle">
          <el-col :span="8">
            <b class="title_text">培养方案|专业:</b>
            <el-select v-model="major_value" placeholder="请选择专业" @change="changYearByMajor">
              <el-option
                v-for="item in major_option"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="7">
            <b class="title_text" >年份:</b>
            <el-select v-model="year_value" placeholder="请选择培养方案的年份" :disabled="year_option.length == 0"  @change="changYear">
              <el-option
                v-for="item in year_option"
                :key="item.year"
                :label="item.year"
                :value="item.year">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button @click="getStudentListByMajorAndYear" type="primary"  class="title_btn">选择</el-button>
          </el-col>
          <el-col :span = '3'>
            <el-button @click="exportExcel" type="primary" icon="el-icon-upload" class="title_btn">下载模板</el-button>
          </el-col>
        </el-row>
        <el-table class="export_student_temple"
                  v-show="false">
          <!--export_general_temple-->
          <el-table-column label="学号" ></el-table-column>
          <el-table-column label="年级" ></el-table-column>
          <el-table-column label="专业" ></el-table-column>
          <el-table-column label="行政班" ></el-table-column>
          <el-table-column label="姓名" ></el-table-column>
        </el-table>


        <br><br>
        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <el-upload
          class="upload-demo"
          action=""
          :on-change="(file, fileList) => {handleChange(file, fileList)}"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          :auto-upload="false"
          :limit=1
          ref="uploadStudentList"
        >
          <el-button type="primary" icon="el-icon-upload" class="title_btn">上传名单</el-button>

          <b class="title_text"> 学生列表</b>

        </el-upload>
        <br><br>

        <!--显示学生列表-->
        <el-table
          :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'12px',height:'30px'}"
          :row-style="{background:'#D8DFE6',color:'#000000',height:'30px'}"
          :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          v-bind:data="student_list"
          style="width: 100%">
          <el-table-column label="学号">
            <template slot-scope="scope">
              <p>{{ scope.row.stu_no }}</p>
            </template>
          </el-table-column>
          <el-table-column label="年级">
            <template slot-scope="scope">
              <p>{{ scope.row.stu_grade }}</p>
            </template>
          </el-table-column>
          <el-table-column label="专业">
            <template slot-scope="scope">
              <p>{{ scope.row.stu_major }}</p>
            </template>
          </el-table-column>
          <el-table-column label="行政班">
            <template slot-scope="scope">
              <p>{{ scope.row.stu_class_no }}</p>
            </template>
          </el-table-column>

          <el-table-column label="姓名"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.stu_name }}</p>
            </template>
          </el-table-column>

        </el-table>

        <br>


      </el-main>

    </el-container>
  </div>

</template>

<script>
import TeacherInfoList from "./TeacherInfo/_TeacherInfoList"
import axios from "axios";
import XLSX from "xlsx";
export default {
  name: "AcademicStaff_StudentInfoInit",
  // inject:['reload'],
  data(){
    return {
      student_list : [],
      dalen:'',
      //从excel解析出来的数据

      major_option : [],
      year_option : [],
      major_value : '',
      year_value : '',
      major_year_list:{}

    }
  },
  created(){
    let that=this;
    axios.get("/data_init/history_training_program_list",{

      params:{

        school_no:'10085'
        // assess_id: "proident in",
        // stu_id: "non esse veniam reprehenderit"
      }
    }).then(function(response){
        // console.log("专业列表",response.data);
        if(response.data.code=='000000'){
          var majorlist_ori=response.data.data.major_list

          var majorlist=[]
          for(var i=0;i<majorlist_ori.length;i++){
            var major_name = majorlist_ori[i]['major_name']
            majorlist.push(major_name)
            that.major_year_list[major_name]=majorlist_ori[i]['year_list']
          }
          console.log("专业列表",majorlist,';',that.major_year_list)
          that.major_option =majorlist
        }
        else{alert('StudentInfoInit.vue created这个函数的code或msg错误')}
      },
      function (err) {
        alert('StudentInfoInit.vue created这个函数的code或msg错误');
      }
    );

  },
  methods:{
    getStudentListByMajorAndYear() {
      if (this.year_value == '' || this.major_value == '') {
        this.$alert('请先选择专业和年份', '', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
        return
      }
      let that=this;
      axios.get("/data_query/stu_list",{
        major:that.major_value,
        year:that.year_value,
        school_no:that.$store.state.school_no
      }).then(function(response){
          if(response.data.code=='000000'){
            that.student_list = response.data.data.student_forms
          }
          else{alert('StudentInfoInit.vue getStudentListByMajorAndYear这个函数的code或msg错误')}
        },
        function (err) {
          alert('StudentInfoInit.vue getStudentListByMajorAndYear这个函数的code或msg错误')
        }
      );
    },
    changYearByMajor() {
      this.student_list = []
      this.year_option = []
      this.year_value = ''
      let that=this;
      that.year_option = that.major_year_list[that.major_value]


      // axios.get("/data_init/history_training_program_list",{
      //   major:that.major_value
      // }).then(function(response){
      //     if(response.data.code=='000000'){
      //       var majorlist_ori=response.data.data.major_list
      //       var yearlist=majorlist_ori['']
      //
      //
      //       for(var i=0;i<majorlist_ori.length;i++){
      //         majorlist.push(majorlist_ori[i]['major_name'])
      //       }
      //
      //       that.year_option = response.data.data.year
      //     }
      //     else{alert('StudentInfoInit.vue changYearByMajor这个函数的code或msg错误')}
      //   },
      //   function (err) {
      //     alert('StudentInfoInit.vue changYearByMajor这个函数的code或msg错误');
      //   }
      // );
    },
    changYear() {
      this.student_list = []
    },
    //上传文件时处理方法
    handleChange(file, fileList){
      if (this.year_value == '' || this.major_value == '') {
        this.$alert('请先选择专业和年份', '', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
        this.$refs.uploadStudentList.clearFiles()
        return
      }
      fileList = []
      this.fileTemp = file.raw;
      if(this.fileTemp){
        if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          || (this.fileTemp.type == 'application/vnd.ms-excel')){
          this.importfxx(this.fileTemp);

        } else {
          this.$message({
            type:'warning',
            message:'附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type:'warning',
          message:'请上传附件！'
        })
      }
    },
    postStudentList() {
      axios.post("/user_list/student",{
        stu_list:this.student_list
      }).then(function(response){
          console.log(response.data);
          if(response.data.code=='000000'){
            this.$alert('上传成功', '', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
          else{alert('studentinfoinit.vue的 postStudentList code或msg错误')}
        },
        function (err) {
          console.log("error");
          alert('studentinfoinit.vue的 postStudentList code或msg错误')
        }
      );
    },
    //超出最大上传文件数量时的处理方法
    handleExceed(){
      this.$message({
        type:'warning',
        message:'超出最大上传文件数量的限制！'
      })
      return;
    },
    //移除文件的操作方法
    handleRemove(file,fileList){
      this.fileTemp = null
      this.student_list = []
    },

    importfxx(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          //此处引入，用于解析excel
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          //此处可对数据进行处理
          let arr = [];
          let arr_i=0;
          // let vm = this;
          //da:[{index:'',id:'',major:'',grounp:'',name:''}],
          outdata.map(v => {
            let obj = {}
            obj.stu_no = v['学号']
            obj.stu_grade = v['年级']
            obj.stu_major = v['专业']
            obj.stu_class_no = v['行政班']
            obj.stu_name = v['姓名']
            arr.push(obj)

            _this.$set(_this.student_list,arr_i,obj)
            arr_i=arr_i+1;
          });

          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    exportExcel() {
      var XLSX = require("xlsx");
      var FileSaver = require("file-saver");

      var wb = XLSX.utils.table_to_book(document.querySelector(".export_student_temple"));
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格

      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
           "学生名单上传模板.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
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
  background-color: rgba(255, 255, 255, 0.847058823529412);
  margin-top:0px;
}
.title_btn{
  background-color: rgb(159,181,203);
  border-style: none;
  /*margin-left: 10px;*/
}
.title_text{
  color:rgb(52,94,143);
  font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
  font-style:normal;
  font-size:14px;
  margin-right: 10px;
}


</style>
