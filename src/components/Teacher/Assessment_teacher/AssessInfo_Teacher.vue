<template>
  <div>
    <!-- 选择的是“待开启” -->
    <div v-if="assess_row.status==0">
      <div class="SetBorder">
        <div style="width: 100%;">
          <el-container class="main_container">
            <el-header class="as_title" style="height:40px;">
              <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
                <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">发布考核任务</div>
                <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:8px"></div>
              </div>
              <br/><hr/>
            </el-header>

            <el-row>
              <el-col :span="24">
                <el-main class="main_content">
                  <el-col :span="12">
                    <div style="font-size: 12px;font-weight: 700;margin-right: 25px">
                      <p>考核编码：{{assess_row.assess_id}}</p>
                      <p>类型编码：{{assess_row.assess_type}}</p>
                      <p>任务人数：{{assess_row.people_count}}</p>
                      <p>任务标题：{{assess_row.assess_title}}</p>
                      <p>截至时间：{{assess_row.end_date}}</p>
                      <p>考核能力项：</p>
                      <p v-for="li in assess_row.assess_course_ability_list"> {{li.course_ability_no}}.{{li.course_ability_name}}:{{li.course_ability_content}}</p>
                      <el-row :gutter="10">
                        <el-col :span="4">
                          <p>考核内容 </p>
                        </el-col>
                        <el-col :span="20">
                          <div class="commitarea" style="width: 80%">
<!--                            <el-input-->
<!--                              id="input1"-->
<!--                              type="textarea"-->
<!--                              v-model="inputAssessmentContent"-->
<!--                              :rows="2"-->
<!--                              style="width: 300px"-->
<!--                              placeholder="请输入内容"-->
<!--                              show-word-limit-->
<!--                              clearable-->
<!--                            ></el-input>-->
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>

                </el-main>
              </el-col>
            </el-row>
            <br><br>
            <el-row :gutter="40">
              <div style="text-align:center;vertical-align:middle;">
                <el-button type="primary" size="mini" style="width: 8%;background: #710606;border: none;position: absolute;bottom:0;" @click="publishAssessment()">发布</el-button>
              </div>
            </el-row>
          </el-container>

        </div>
      </div>
    </div>

    <!-- 选择的是“进行中的（期中考试、期末考试）” -->
    <div v-if="assess_row.status==1 && (assess_row.assess_type == 3 || assess_row.assess_type == 4)">
      <div class="SetBorder" style="width: 100%;">
        <el-container class="main_container">
          <el-header class="as_title" style="height:40px;">
            <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">考核任务</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:8px"></div>
            </div>
            <br/><hr/>
          </el-header>

          <el-row>
            <el-col :span="24">
              <el-main class="main_content">
                <el-col :span="12">
                  <div style="font-size: 12px;font-weight: 700;margin-right: 30px">
                    <p>考核编码：{{assess_row.assess_id}}</p>
                    <p>类型编码：{{assess_row.assess_type}}</p>
                    <p>任务人数：{{assess_row.people_count}}</p>
                    <p>任务标题：{{assess_row.assess_title}}</p>
                    <p>截至时间：{{assess_row.end_date}}</p>
                    <p>任务状态：<el-tag :type="assess_status_options[assess_row.status]['type']">{{assess_status_options[assess_row.status]['label']}}</el-tag></p>
                  </div>
                </el-col>
              </el-main>
            </el-col>
          </el-row>
        </el-container>
      </div>
      <br>
      <div class="SetBorder">
        <el-container class="main_container">
          <el-header class="as_title" style="height:40px;">
            <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">考核任务批改</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>

          </el-header>
          <!-- 表格部分 -->
          <br>
          <el-upload
            class="upload-demo"
            action=""
            :file-list="examExcelFileList"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :auto-upload="false">
            <el-button type="primary" icon="el-icon-upload" class="title_btn" >点击上传考试成绩的excel</el-button>
          </el-upload>
          <br>
          <el-table
            v-bind:data="examExcel"
            border style="width: 100%"
            :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'14px'}"
            :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
            :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          >
            <el-table-column
              label="序号"
              header-align="center"
            >
              <template slot-scope="scope">
                <p placeholder="">{{scope.row.index}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="学号"
              header-align="center"
            >
              <template slot-scope="scope">
                <p  placeholder="">{{scope.row.id}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              header-align="center"
            >
              <template slot-scope="scope">
                <p >{{scope.row.name}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="考试成绩"
              header-align="center"
            >
              <template slot-scope="scope">
                <p placeholder="">{{scope.row.score}}</p>
              </template>
            </el-table-column>

          </el-table>
          <br><br>
          <el-button style="width:25%" type="primary" icon="el-icon-upload" class="title_btn" @click ='postExamList'>提交考试成绩</el-button>
        </el-container>
      </div>
    </div>

<!--     选择的是“进行中的（习题、实验、设计）” -->
    <div v-if="assess_row.status==1 && (assess_row.assess_type == 0 || assess_row.assess_type == 1 || assess_row.assess_type == 2)">
      <div class="SetBorder" style="width: 100%;">
        <el-container class="main_container">
          <el-header class="as_title" style="height:40px;">
            <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">考核任务</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:8px"></div>
            </div>
            <br/><hr/>
          </el-header>
          <el-row>
            <el-col :span="24">
              <el-main class="main_content">
                <el-col :span="12">
                  <div style="font-size: 12px;font-weight: 700;margin-right: 30px">
                    <p>考核编码：{{assess_row.assess_id}}</p>
                    <p>类型编码：{{assess_row.assess_type}}</p>
                    <p>任务人数：{{assess_row.people_count}}</p>
                    <p>任务标题：{{assess_row.assess_title}}</p>
                    <p>截至时间：{{assess_row.end_date}}</p>
                    <p>任务状态：<el-tag :type="assess_status_options[assess_row.status]['type']">{{assess_status_options[assess_row.status]['label']}}</el-tag></p>
                  </div>
                </el-col>
              </el-main>
            </el-col>
          </el-row>
        </el-container>
      </div>
      <br><br>
      <div class="SetBorder">
        <el-container class="main_container">
          <el-header class="as_title" style="height:40px;">
            <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
              <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">考核任务批改</div>
              <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:10px"></div>
            </div>
          </el-header>
          <!-- 表格部分 -->
          <br>
          <el-table
            width="1440px"
            :data="homework_data_table"
            :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'12px',height:'30px'}"
            :row-style="{background:'#D8DFE6',color:'#000000',height:'30px'}"
            :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          >
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                <p v-text="scope.$index+1">1 </p>
              </template>
            </el-table-column>
            <el-table-column
              label="专业"
              align="center" >
              <template slot-scope="scope">
                <p>{{ scope.row.stu_major }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="学号"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.stu_no }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="姓名"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.stu_name }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="提交情况"
              align="center"
              >
              <template slot-scope="scope">
                <p v-if="scope.row.stu_homework_status == 1"> 已提交 </p>
                <p v-if="scope.row.stu_homework_status == 0" style="background-color: rgb(209,161,162)"> 未提交 </p>
<!--                <p>{{scope.row.stu_homework_status}}</p>-->
              </template>
            </el-table-column>
            <el-table-column v-for="(item, index) in homework_data_table_header" :key="index" :label="item" align="center" width="200px">
              <template slot-scope="scope"  >
<!--                <p>{{scope.row[item]}} {{ index}}</p>-->
                <div v-if="index % 3 == 0">
                  <el-select v-model="scope.row[item]" :disabled="scope.row.disabled">
<!--                    <el-option v-for="i in ABCDE"  :label="i.label" :value="i.value">-->
<!--                    </el-option>-->
                    <el-option v-for="i in fiveToZero" :label="i" :value="i"></el-option>
                  </el-select>
                </div>
<!--                <p v-if="index % 3 != 0"> {{scope.row[item]}}</p>-->
                <el-input
                  type="textarea"
                  size="mini"
                  autosize
                  v-if="index % 3 != 0"
                  v-model="scope.row[item]"
                  placeholder="请输入评价"
                  :disabled="scope.row.disabled"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="下载"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-download" style="font-size: large"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="编辑成绩"
              align="center"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.disabled" style="text-decoration: underline;cursor: pointer "@click="changeDisabled(scope.row)">编辑</p>
                <p v-if="!scope.row.disabled" style="text-decoration: underline;cursor: pointer "@click="changeDisabled(scope.row)">确认</p>
              </template>
            </el-table-column>
          </el-table>

        </el-container>
      </div>
    </div>

    <!--     选择的是“已完成的” -->
    <div v-if="assess_row.status==2">
      <div class="SetBorder">
        <div style="width: 100%;">
          <el-container class="main_container">
            <el-header class="as_title" style="height:40px;">
              <div style="height:30px; width:80px; background-color:rgb(59,105,152); padding:5px; border-radius:3px">
                <div style="color:white; font-size: 80%; margin:0 auto; text-align: center; margin:8px auto">考核任务</div>
                <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:8px"></div>
              </div>
              <br/><hr/>
            </el-header>

            <el-row>
              <el-col :span="24">
                <el-main class="main_content">
                  <el-col :span="12">
                    <div style="font-size: 12px;font-weight: 700;margin-right: 25px">
                      <p>考核编码：{{assess_row.assess_id}}</p>
                      <p>类型编码：{{assess_row.assess_type}}</p>
                      <p>任务人数：{{assess_row.people_count}}</p>
                      <p>任务标题：{{assess_row.assess_title}}</p>
                      <p>截至时间：{{assess_row.end_date}}</p>
                      <p>考核能力项：</p>
                      <p v-for="li in assess_row.assess_course_ability_list"> {{li.course_ability_no}}.{{li.course_ability_name}}:{{li.course_ability_content}}</p>
                    </div>
                  </el-col>
                </el-main>
              </el-col>
            </el-row>
          </el-container>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";
export default {
  name: "AssessInfo",
  props: ['assess_row','homework_data_table','homework_data_table_header'],
  methods:{
    postReviewHomework(row) {
      let ret = new Object()
      ret.stu_no = row.stu_no
      ret.assess_id = this.assess_row.assess_id
      ret.stu_score_list = []
      let i = 0
      for (;i < this.homework_data_table_header.length;++i) {
        let v = new Object()
        v["course_ability_name"] = this.homework_data_table_header[i]
        v["score"] = row[this.homework_data_table_header[i]]
        i = i + 1
        v["feedback"] = row[this.homework_data_table_header[i]]
        i = i + 1
        v["evaluation_tag"] = row[this.homework_data_table_header[i]]
        ret.stu_score_list.push(v)
      }
      // console.log(ret)
      axios.post("/teaching_process/review_homework",{
        stu_score_list:ret.stu_score_list,
        assess_id:ret.assess_id,
        stu_no:ret.stu_no
      }).then(function(response){
        // console.log(response);
      })
      this.isInitializedStudent = true
      this.$message({
        type: 'success',
        message: '成绩修改成功'
      });
    },
    changeDisabled(row) {
      row.disabled = !row.disabled
      if (row.disabled == true) {
        this.postReviewHomework(row)
      }
    },
    postExamList(){
      var ret = {
        stu_score_list:[],
        assess_id:this.assess_row.assess_id
      };
      for (var i in this.examExcel) {
        var tmp = new Object();
        tmp.stu_no = this.examExcel[i].id;
        tmp.stu_score = this.examExcel[i].score;
        ret.stu_score_list.push(tmp)
      }
      // var json_str = JSON.stringify(ret);
      // alert("json_str = " + json_str);
      this.$confirm('是否将该份成绩作为本次考试的成绩上传?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(ret)
        axios.post("/teaching_process/upload_exam_score",{stu_list:ret.stu_score_list,assess_id:ret.assess_id}).then(function(response){
          // console.log(response);
        })
        this.isInitializedStudent = true
        this.$message({
          type: '成功',
          message: '上传成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上传'
        });
      });
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
            obj.index = v['序号']
            obj.id = v['学号']
            obj.name = v['姓名']
            obj.score = v['考试成绩']
            arr.push(obj)

            _this.$set(_this.examExcel,arr_i,obj)

            arr_i=arr_i+1;
            // console.log(arr_i,obj)

          });
          // console.log(arr)
          _this.da=arr;

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
    handleChange(file, fileList){
      // this.handleRemove()
      this.examExcelFileList = fileList.slice(-1)
      this.examExcel = [{index:'',id:'',name:'',score:''}]
      // alert(this.examExcelFileList.length)
      // if (this.examExcelFileList.length > 1) {
      //   alert(456456)
      //   this.examExcelFileList = this.examExcelFileList.slice(1)
      // }
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
      this.examExcel = [{index:'',id:'',name:'',score:''}]


    },

    publishAssessment(){
      // console.log(assess_row)
      let that = this;
      axios.post("/assess/publish_assessment",{
        params:{
          assess_id: that.assess_row.assess_id,
          assess_content: that.inputAssessmentContent,
          assess_report_url:that.assess_report_url
        }
      }).then(function (response){
          that.assess_row.status = -1
          that.$alert('任务发布成功', '', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          that.$parent.getData();
        },
        function (err) {
          // console.log("error");
          alert("AssessInfo_Teacher.vue 的 publishAssessment 请求失败");
        }
      );
    }
  },
  data() {
    return {
      examExcelFileList : [],
      examExcel : [{index:'',id:'',name:'',score:''}],
      inputAssessmentContent : '',
      assess_report_url : '',
      assess_status_options: [
        {
          value: "0",
          label: "待开启",
          type:"danger"
        },
        {
          value: "1",
          label: "进行中",
          type:"success"
        },
        {
          value: "2",
          label: "已完成",
          type:"info"
        }
      ],
      fiveToZero:[5,4.5,4,3.5,3,2.5,2,1.5,1,0]
      ,
      ABCDE: [{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }, {
        value: 'E',
        label: 'E'
      }],
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
  font-weight:bold;
  font-size:16px;
  font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
}
hr{
  height: 1px;
  width: 100%;
  background: black;
  border:none;
}
.main_content{
  text-align: left;
  border-radius: 5px;
  background-color: rgb(240, 244, 247);
  margin-top:0px;
  margin-left:10px;
  margin-right:10px;
}
/*设置最后两列高度一致*/
.bottom_row{
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap
}

.commit_content{
  height: 100%;
  border-radius: 5px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top:-20px;
  margin-left:50px;
  margin-right: 10px;
  margin-bottom: -10px;
  border: 2px solid rgb(192, 192, 192);
}

.score_content{
  height: 100%;
  border-radius: 5px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top:10px;
  margin-left: 10px;
  margin-right:10px;
  margin-bottom: -10px;
}
.upload_button {
  background-color: rgb(159, 181, 203);
  border-color: rgb(159, 181, 203);
  float: right;
  display: block;
}
.SetBorder {
  border: 2px solid;
  border-radius: 5px;
  border-color: rgb(59, 105, 152);
  padding: 10px;
  position: relative;
}
.commitarea /deep/ #input1 {
  min-height: 30px;
  margin: 0px;
  width: 800px;
}
.el-button-submit {
  background-color: #000;
  color: red;
}
.title_btn{
  background-color: rgb(159,181,203);
  border-style: none;
  margin-left: 10px;
}
</style>

