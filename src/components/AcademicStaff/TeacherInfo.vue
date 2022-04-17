<template>
  <!--<div>提供上传教师信息的按钮 并显示上传结果</div>-->
  <div class="main_container">
    <el-container>
      <el-header style="height:40px" class="as_title">
        教学计划设置 | 人员信息管理
        <hr/>
      </el-header>

      <el-main class="main_content">



          <b class="title_text">人员列表</b>
          <el-button @click="exportTemple" type="primary" icon="el-icon-upload" class="title_btn">下载模板</el-button>


        <el-table class="export_teacher_temple"
          v-show="false">
          <!--export_general_temple-->
          <el-table-column label="编号" ></el-table-column>
          <el-table-column label="教师类型" ></el-table-column>
          <el-table-column label="姓名" ></el-table-column>

        </el-table>

        <el-table class="export_general_temple"
                  v-show="false">
          <!--export_general_temple-->
          <el-table-column label="编号" ></el-table-column>
          <el-table-column label="姓名" ></el-table-column>

        </el-table>


        <br>
        <br>


        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <el-upload
          class="upload-demo"
          action=""
          :on-change="(file, fileList) => {handleChange(file, fileList, ['教师','id','type','name'])}"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          :auto-upload="false"
          :limit=1>
          <el-button type="primary" icon="el-icon-upload" class="title_btn">上传名单</el-button>

          <b class="title_text"> 教师列表</b>
          <div slot="tip" class="el-upload__tip">教师类型仅有：校外教师，校内教师</div>

        </el-upload>
        <br>

        <!--显示教师列表-->
        <el-table
          :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'12px',height:'30px'}"
          :row-style="{background:'#D8DFE6',color:'#000000',height:'30px'}"
          :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          v-bind:data="jiaoshi_data"
          style="width: 100%">
          <el-table-column label="编号">
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
            </template>
          </el-table-column>

          <el-table-column label="教师类型">
            <template slot-scope="scope">
              <p>{{ scope.row.type }}</p>
            </template>
          </el-table-column>

          <el-table-column label="姓名"
           >
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>

        </el-table>

        <br>

        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <el-upload
          class="upload-demo"
          action=""
          :on-change="(file, fileList) => {handleChange(file, fileList, ['教指委','id','name'])}"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          :auto-upload="false"
          :limit=1>
          <el-button type="primary" icon="el-icon-upload" class="title_btn">上传名单</el-button>
          <b class="title_text"> 教学指导委员会列表</b>

        </el-upload>
        <br>

        <!--显示教师列表-->
        <el-table
          :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'12px',height:'30px'}"
          :row-style="{background:'#D8DFE6',color:'#000000',height:'30px'}"
          :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          v-bind:data="jiaozhiwei_data"
          style="width: 100%">
          <el-table-column label="编号">
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
            </template>
          </el-table-column>

          <el-table-column label="姓名"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>

        </el-table>


        <br>

        <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
        <el-upload
          class="upload-demo"
          action=""
          :on-change="(file, fileList) => {handleChange(file, fileList, ['评阅专家','id','name'])}"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          :auto-upload="false"
          :limit=1>
          <el-button type="primary" icon="el-icon-upload" class="title_btn">上传名单</el-button>

          <b class="title_text">评阅专家列表</b>

        </el-upload>
        <br>




        <el-table
          :header-cell-style="{background:'#8BA5C0',color:'#ffffff','text-align':'center','font-size':'12px',height:'30px'}"
          :row-style="{background:'#D8DFE6',color:'#000000',height:'30px'}"
          :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          v-bind:data="pingyue_data"
          style="width: 100%">
          <el-table-column label="编号">
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
            </template>
          </el-table-column>


          <el-table-column label="姓名"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>

        </el-table>






      </el-main>

    </el-container>
  </div>

</template>

<script>
  import TeacherInfoList from "./TeacherInfo/_TeacherInfoList"
  import axios from "axios";
    export default {
        name: "AcademicStaff_TeacherInfo",
      // inject:['reload'],
      data(){
        return {
          dalen:'',
          //从excel解析出来的数据
          jiaoshi_data:[],
          jiaozhiwei_data:[],
          pingyue_data:[],

        }
      },
      created(){
          let that=this;
        axios.get("/data_query/get_all_staff_list",{
          school_id:that.$store.state.school_no
        }).then(function(response){
            console.log("人员列表",response.data.data);
            if(response.data.code=='000000'){
              let i=0;
              for(i=0;i<response.data.data.teacher_list.length;i++){
                var staff_dict={}
                staff_dict['id']=response.data.data.teacher_list[i]['teacher_no'];
                staff_dict['type']=response.data.data.teacher_list[i]['teacher_type'];
                staff_dict['name']=response.data.data.teacher_list[i]['teacher_name'];
                that.jiaoshi_data.push(staff_dict)
              }
              for(i=0;i<response.data.data.teaching_guidance_commitee_list.length;i++){
                var staff_dict={}
                staff_dict['id']=response.data.data.teaching_guidance_commitee_list[i]['teaching_guidance_commitee_no'];
                staff_dict['name']=response.data.data.teaching_guidance_commitee_list[i]['teaching_guidance_commitee_name'];
                that.jiaozhiwei_data.push(staff_dict)
              }
              for(i=0;i<response.data.data.professional_certification_expert_list.length;i++){
                var staff_dict={}
                staff_dict['id']=response.data.data.professional_certification_expert_list[i]['professional_certification_expert_no'];
                staff_dict['name']=response.data.data.professional_certification_expert_list[i]['professional_certification_expert_name'];
                that.pingyue_data.push(staff_dict)
              }

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
        //上传文件时处理方法
        handleChange(file, fileList,property_list){
          this.fileTemp = file.raw;
          if(this.fileTemp){
            if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
              || (this.fileTemp.type == 'application/vnd.ms-excel')){
              this.importfxx(this.fileTemp,property_list);

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

        importfxx(obj,property_list) {
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
              outdata.map(v => {
                  let obj = {}

                  let myi=0;

                  for(myi=1;myi<property_list.length;myi++){
                    if(property_list[myi]=='id'){

                      obj.id = v['编号']
                    }
                    if(property_list[myi]=='type'){
                      obj.type = v['教师类型']
                    }
                    if(property_list[myi]=='name'){
                      obj.name = v['姓名']
                    }

                  }
                  arr.push(obj)

                  arr_i=arr_i+1;


              });
              console.log(arr)
              if(property_list[0]=='教师'){
                _this.jiaoshi_data=arr;

              }else if(property_list[0]=='教指委'){
                _this.jiaozhiwei_data=arr;

              }else if(property_list[0]=='评阅专家'){
                _this.pingyue_data=arr
              }

              // _this.da=arr;
              // console.log('在外面',_this.jiaoshi_data)
              _this.updateStafflist(property_list[0])
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

        updateStafflist(_identity){


          let that = this;
          let datalist=[],path='',identity=''

          if(_identity=='教师'){
            datalist=that.jiaoshi_data;
            identity=0
          }else  if(_identity=='评阅专家'){
            datalist=that.pingyue_data;
            identity=2
          }else  if(_identity=='教指委'){
            datalist=that.jiaozhiwei_data;
            identity=1
          }


          var post_datalist=[]

          var i = 0;
          for(i=0;i<datalist.length;i++){
            post_datalist[i]={}
            post_datalist[i]['no']=datalist[i]['id']
            post_datalist[i]['name']=datalist[i]['name']
            if('type' in datalist[i]){
              post_datalist[i]['type']=datalist[i]['type']
            }else{
              post_datalist[i]['type']=''
            }
          }

          console.log("上传的信息",post_datalist)

          axios.post("/user_list/staff",{
            staff_list:post_datalist,
            identity:identity,
            school_id:this.$store.state.school_no
          }).then(function(response){
            console.log(response.data);
            if(response.data.code=='000000'){
              console.log("上传成功",_identity,post_datalist)

          }
          else{alert('code或msg错误')}
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );

        },

        exportTemple(){
          this.exportExcel('教师')
          this.exportExcel('其他人员')
        },


        exportExcel(identity) {


          var XLSX = require("xlsx");
          var FileSaver = require("file-saver");

          if(identity=='教师'){
            var wb = XLSX.utils.table_to_book(document.querySelector(".export_teacher_temple"));
          }else{
            var wb = XLSX.utils.table_to_book(document.querySelector(".export_general_temple"));
          }

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
              identity + "上传模板.xlsx"
            );
          } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
        },
      },
      components:{
        TeacherInfoList
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
