<template xmlns="http://www.w3.org/1999/html">
  <div>
<!-- 未曾初始化课程  -->
    <b v-show="!isInitializedCourse" class="title_text">请先初始化课程信息</b>
<!--    已初始化课程，未初始化名单   -->
    <div v-show="isInitializedCourse&&!isInitializedStudent">
      <el-container>
        <el-main class="main_content">
          <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :auto-upload="false">
            <i class="el-icon-user-solid" style="color:rgb(52,94,143) "></i>
            <b class="title_text">学生列表</b>
            <el-button type="primary" icon="el-icon-upload" class="title_btn">点击上传人员名单</el-button>
          </el-upload>
          <br>

          <!--显示学生列表-->
          <el-table
            :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
        'text-align':'center','font-size':'14px'}"
            :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
            :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
            v-bind:data="da"
            style="width: 100%">
            <el-table-column
              label="序号"
              width="182">
              <template slot-scope="scope">
                <p>{{ scope.row.index }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="学号"
              width="182">
              <template slot-scope="scope">
                <p>{{ scope.row.id }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="专业"
              width="182">
              <template slot-scope="scope">
                <p>{{ scope.row.major }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="分组"
              width="182">
              <template slot-scope="scope">
                <p>{{ scope.row.group }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="182">
              <template slot-scope="scope">
                <p>{{ scope.row.name }}</p>
              </template>
            </el-table-column>
          </el-table>
          <br><br>
          <el-button type="primary" icon="el-icon-upload" class="title_btn" @click ='postStudentList'>提交学生名单</el-button>
        </el-main>
      </el-container>
    </div>
    <!--    已初始化课程，已初始化名单   -->
    <div v-show="isInitializedCourse&&isInitializedStudent">

      <!--显示学生列表-->
<!--      <i class="el-icon-user-solid" style="color:rgb(52,94,143) "></i>-->
      <b class="title_text">学生列表  </b>
      <el-button @click="exportExcel" type="primary" icon="el-icon-upload" class="title_btn">导出学生成绩单</el-button>
      <span style="font-size:8px; color:#710606;">   *提示：A为100分，B为90分，C为80分，D为70分，E为60分，F为不合格</span>
      <br> <br>
      <el-table
        :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
        'text-align':'center','font-size':'10px'}"
        :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
        :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
        v-bind:data="fakeStudentList"
        style="width: 100%"
      >
        <el-table-column label="序号" >
          <template slot-scope="scope">
            <span v-text="scope.$index+1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="学号">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="专业">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_major }}</p>
          </template>
        </el-table-column>
        <el-table-column label="分组">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_group_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="姓名" >
          <template slot-scope="scope">
            <p>{{ scope.row.stu_name }}</p>
          </template>
        </el-table-column>

        <el-table-column v-for="(item, index) in fakeAbilityItemList" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row.ability_score_list[index].ability_score}}</p>
          </template>
        </el-table-column>
        <el-table-column label="期中考试">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_mid_exam_score}}</p>
          </template>
        </el-table-column>
        <el-table-column label="期末考试">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_final_exam_score }}</p>
          </template>
        </el-table-column>
        <el-table-column label="总成绩">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_total_score }}</p>
          </template>
        </el-table-column>
        <el-table-column label="奖励分">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_bonus_score }}</p>
          </template>
        </el-table-column>
        <el-table-column label="修改奖励分">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="view_btn"
              @click="editBonusScore(scope.row.stu_no, scope.row.stu_name ,scope.row.stu_bonus_score)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      导出的学生列表-->
      <el-table
        :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
        'text-align':'center','font-size':'14px'}"
        :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
        :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
        v-bind:data="fakeStudentList"
        style="width: 100%"
        class="export_table"
        v-show="false"
      >
        <el-table-column label="序号" >
          <template slot-scope="scope">
            <span v-text="scope.$index+1"> </span>
          </template>
        </el-table-column>
        <el-table-column label="学号">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="专业">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_major }}</p>
          </template>
        </el-table-column>
        <el-table-column label="分组">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_group_no }}</p>
          </template>
        </el-table-column>
        <el-table-column label="姓名" >
          <template slot-scope="scope">
            <p>{{ scope.row.stu_name }}</p>
          </template>
        </el-table-column>

        <el-table-column v-for="(item, index) in fakeAbilityItemList" :key="index" :label="item" >
          <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
          <template slot-scope="scope"  >
            <p >{{scope.row.ability_score_list[index].ability_score}}</p>
          </template>
        </el-table-column>
        <el-table-column label="期中考试">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_mid_exam_score}}</p>
          </template>
        </el-table-column>
        <el-table-column label="期末考试">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_final_exam_score }}</p>
          </template>
        </el-table-column>
        <el-table-column label="总成绩">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_total_score }}</p>
          </template>
        </el-table-column>
        <el-table-column label="奖励分">
          <template slot-scope="scope">
            <p>{{ scope.row.stu_bonus_score }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

<!--    <div>{{studentList.ability_score_list}}</div>-->
<!--    <div>{{studentList}}</div>-->
<!--    -->
<!--    <div>{{courseAbilityNameList}}</div>-->
  </div>


</template>

<script>

    import axios from "axios";

    export default {
      name: "StudentInfoManager",
      props: ['course_name','course_id'],
      data() {
        return {
          studentList:'',
          courseAbilityList:'',
          courseAbilityNameList:[],
          isInitializedCourse:false,
          isInitializedStudent:false,
          dalen:'',
          da:[{index:'',id:'',major:'',grounp:'',name:''}],
          fakeAbilityItemList:['贪心','动态规划'],
          fakeStudentList:
            [{ stu_no: "ut non",
              stu_major: "consequat anim q",
              stu_name: "consequat Lorem Duis",
              stu_group_no: "est amet anim",
              ability_score_list: [ { ability_name: "贪心", ability_score: 'A' },{ ability_name: "动态规划", ability_score: "B" } ],
              stu_mid_exam_score: '-419205773471880.1',
              stu_final_exam_score: "nostrud adipisicing",
              stu_bonus_score: "dolo",
              stu_total_score: "mollit in" },
              { stu_no: "adipisicing quis ipsum commodo labore",
                stu_major: "proident in",
                stu_name: "tempor",
                stu_group_no: "ipsum sunt temp",
                ability_score_list: [{ ability_name: "贪心", ability_score: "C" },{ ability_name: "动态规划", ability_score: 'D' } ],
                stu_mid_exam_score: '6638967155736560',
                stu_final_exam_score: "ut nostrud",
                stu_bonus_score: "ad la",
                stu_total_score: "fugiat consectetur esse qui" }
            ]
        }
      },
      mounted() {
        this.getCourseInfomation()
        this.getStudentList()
      },
      methods:{
        editBonusScore(stu_no,stu_name ,stu_bonus_score) {
          let title = '设置 '+stu_name+' 的奖励分为'
          this.$prompt(title, '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:  /[0-9]+/,
            inputErrorMessage: '请输入一个正整数',
            inputValue:stu_bonus_score
          }).then(({ value }) => {
            axios.post("/teaching_process/setting_additional_score",{stu_no:stu_no,course_id:this.course_id,bonus_score:value}).then(function(response){
              console.log(response);
            })
            this.$message({
              type: '成功',
              message: '设置成功'
            });
            this.getStudentList()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });

        },
        exportExcel() {
          // 设置当前日期
          var XLSX = require("xlsx");
          var FileSaver = require("file-saver");
          // import FileSaver from "file-saver";
          let time = new Date();
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          let name = year + "" + month + "" + day;
          // console.log(name)
          /* generate workbook object from table */
          //  .table要导出的是哪一个表格
          var wb = XLSX.utils.table_to_book(document.querySelector(".export_table"));
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
              name + ".xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        },
        postStudentList(){
          var ret = [];
          for (var i in this.da) {
            var tmp = new Object();
            tmp.stu_no = this.da[i].id;
            tmp.major = this.da[i].major;
            tmp.group_no = this.da[i].group;
            tmp.stu_name = this.da[i].name;
            ret.push(tmp)
          }
          // var json_str = JSON.stringify(ret);
          // alert("json_str = " + json_str);
          this.$confirm('是否将此名单设置为本门课程的学生名单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(ret)
            axios.post("/teaching_process/input_student",{stu_list:ret}).then(function(response){
              console.log(response);
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
        getCourseInfomation(){
          let that = this;
          axios.get("/course/all_info",{
            params:{
              course_id: that.course_id
            }
          }).then(function (response){
              that.courseAbilityList = response.data.data.course_ability_list
              that.isInitializedCourse = (that.courseAbilityList.length > 0)
              for (var i in that.courseAbilityList) {
                that.courseAbilityNameList.push(that.courseAbilityList[i].course_ability_name)
              }
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );
        },
        getStudentList:function () {
          let that = this;
          axios.get("/teaching_process/query_students_and_score",{
            params:{
              course_id: that.course_id
            }
          }).then(function (response){
              // console.log(response.data);
              if((response.data.code=='000000')&&(response.data.msg=='成功')){
                that.studentList = response.data.data.student_list;
                that.isInitializedStudent = (that.studentList.length > 0)
              }
              else{alert('code或msg错误')}
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );
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
                obj.major = v['专业']
                obj.group = v['分组']
                obj.name = v['姓名']
                arr.push(obj)

                _this.$set(_this.da,arr_i,obj)

                arr_i=arr_i+1;
                console.log(arr_i,obj)

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
        },

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
  background-color: rgb(237,241,245);
  margin-top:0px;
}
.title_btn{
  background-color: rgb(159,181,203);
  border-style: none;
  margin-left: 10px;
}

</style>
