<template>
  <el-table
    :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
    'text-align':'center','font-size':'14px'}"
    :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
    :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
    :data="StudentEvaluateData"
    style="width: 100%">

    <el-table-column
      label="学生ID"
      width="220">
      <template slot-scope="scope">
        <p>{{ scope.row.stu_no }}</p>
      </template>
    </el-table-column>

    <el-table-column
      label="姓名"
      width="220">
      <template slot-scope="scope">
        <p>{{ scope.row.name }}</p>
      </template>
    </el-table-column>

    <el-table-column
      label="专业"
      width="220">
      <template slot-scope="scope">
        <p>{{ scope.row.major }}</p>
      </template>
    </el-table-column>

    <el-table-column label="学习评价">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          class="view_btn"
          @click="ViewEvaluate(scope.row, '/StudentInfo/StudentInfoDetail')">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script scoped>
    import axios from "axios";

    export default {
      name: "StudentEvaluateList",
      data() {
        return {
          StudentEvaluateData: []
        }
      },
      mounted() {
        this.getStudentEvaluateData();
      },
      methods:{
        // 查看具体学生的评价
        ViewEvaluate(rowData,path){
          this.$router.push({
            path: path,
            query: {
              student_id: rowData.stu_no,
              student_name:rowData.name,
              student_major:rowData.major,
            }
          })
        },
        //获取后端数据
        getStudentEvaluateData:function () {
          let that = this;
          axios.get("/data_query/stu_list")
            .then(function (response){
              console.log(response.data);
              if((response.data.code=='000000')&&(response.data.msg=='成功')){
                that.StudentEvaluateData = response.data.data.student_forms;
              }
              else{alert('code或msg错误')}
            },
            function (err) {
              console.log("error");
              alert("请求失败");
            }
          );
        },
      }
    }
</script>

<style scoped>
  .view_btn{
    color: #000000;
    text-decoration: underline;
  }


</style>
