<template>
  <el-container>
    <el-header style="height:40px" class="as_title">
      培养方案{{this.tp_year}}-{{this.tp_major}} | 课程评价组成员管理
      <hr/>
    </el-header>

    <el-main class="el-main-style">

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
          <b class="title_text">评价组成员列表</b>
          <el-button type="primary" icon="el-icon-upload" class="title_btn">上传名单</el-button>
          * 请参照下方表格形式上传文件
        </el-upload>
        <br>

        <!--显示教师列表-->
        <el-table
          :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
          'text-align':'center','font-size':'14px'}"
          :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
          :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
          v-bind:data="da"
          style="width: 100%">
          <el-table-column
            label="教师ID"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="教师类型"
            >
            <template slot-scope="scope">
              <p>{{ scope.row.type }}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="教师姓名"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="评价课程名称"
        >
            <template slot-scope="scope">
              <p>{{ scope.row.course_name }}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="课程类型"
            >
            <template slot-scope="scope">
              <p>{{ scope.row.course_type }}</p>
            </template>
          </el-table-column>

          <el-table-column
            label="课程ID"
 >
            <template slot-scope="scope">
              <p>{{ scope.row.course_id }}</p>
            </template>
          </el-table-column>



        </el-table>

      </el-main>

  </el-container>
</template>

<script>
    export default {
        name: "EvaluateMember",
      data(){
        return {
          tp_id:'',
          tp_year:'',
          tp_major:'',
          da:[{id:'',type:'',name:'',course_name:'',course_type:'',course_id:''}]
        }
      },
      created() {
        console.log("GET",this.$route.query)

        // // console.log('get',tp1)
        this.tp_id = this.$route.query.tp_id;
        this.tp_year = this.$route.query.tp_year;
        this.tp_major = this.$route.query.tp_major;

        // console.log(this.tp_id)
      },
      methods:{
        //上传文件时处理方法
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
              outdata.map(v => {

                // da:[{id:'',type:'',name:'',course_name:'',course_type:'',course_id:''}]
                let obj = {}
                obj.id = v['教师ID']
                obj.type = v['教师类型']
                obj.name = v['教师姓名']
                obj.course_name = v['评价课程名称']
                obj.course_type = v['课程类型']
                obj.course_id = v['课程ID']
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
        }
      },
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

  .el-main-style{
    background-color: rgba(255, 255, 255, 0.82);
    border-radius: 5px;
    border:2px solid #3b6998;
    text-align: left;
  }


  .title_btn{
    background-color: rgb(159,181,203);
    border-style: none;
    margin-left: 10px;
  }
  .title_text{
    color:rgb(52,94,143);
    font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
    font-style:normal;
    font-size:14px;
    margin-right: 10px;
  }

</style>
