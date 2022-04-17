<template>
  <el-container>
    <el-header style="height:40px" class="as_title">

      <el-row >
        <el-col :span="12"  type="flex"><div> 学生信息管理 | 查看学习评价</div>

        </el-col>
        <el-col :span="12"  type="flex"  style="height:20px; text-align: right;">
          <el-button type="text" class="btn_back" @click="Back2Evaluate('/AcademicStaff/StudentInfo')">返回学生列表</el-button>
        </el-col>
      </el-row>
      <hr/>
    </el-header>

    <p style="margin: 20px 15px;text-align: right">
      {{this.student_id}} | {{this.student_major}} | {{this.student_name}}</p>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="margin: -55px 10px auto 10px"
    >
      <el-tab-pane label="培养达成度" name="first">
        <el-main class="main_content">
          <el-button type="primary" icon="el-icon-download" class="title_btn" v-on:click="exportExcel('achievementTable')">导出</el-button>

          <el-row>
            <el-col :span="11">
              <el-table
                :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
              'text-align':'center','font-size':'14px'}"
                :row-style="{background:'#D8DFE6',color:'#000000',height:'20px'}"
                :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
                :data="graduation_requirement_and_achievement"
                id="achievementTable"
                style="width: 100%;margin-top: 20px">

                <el-table-column
                  label="毕业要求"
                  width="238">
                  <template slot-scope="scope">
                    <p>{{ scope.row.graduation_requirement_name }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="达成度"
                  width="170">
                  <template slot-scope="scope">
                    <p>{{ scope.row.achievement }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>

            <el-col :span="13">
              <div id="radar" style="width: 400px;height: 400px;margin-left: 70px;margin-top: 50px"></div>
              <p style="text-align: center;margin-left: 40px">{{this.student_name}}综合能力评价图</p>
            </el-col>
          </el-row>
        </el-main>
      </el-tab-pane>

      <el-tab-pane label="课程学习情况" name="second">
        <el-main class="main_content">
          <el-button type="primary" icon="el-icon-download" class="title_btn" v-on:click="exportExcel('evaluationTable')" >导出</el-button>

          <el-table
            :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
            'text-align':'center','font-size':'14px'}"
            :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
            :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
            :data="course_list"
            id="evaluationTable"
            style="width: 100%;margin-top: 20px">

            <el-table-column
              label="课程ID"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.course_id }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="课程名称"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.course_name }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="课程评价"
              width="650">
              <template slot-scope="scope">
                <p>{{ scope.row.course_evaluation }}</p>
              </template>
            </el-table-column>
          </el-table>

        </el-main>
      </el-tab-pane>

    </el-tabs>


  </el-container>

</template>

<script>
import axios from "axios";
import * as echarts from 'echarts';

import * as XLSX from 'xlsx'
import FileSaver from "file-saver";

export default {
  name: "AcademicStaff_StudentInfoDetail",
  data(){
    return {
      //默认进入课程学习情况
      activeName: 'second',
      course_list:[],
      graduation_requirement_and_achievement:[]
    }
  },
  mounted() {
    this.getStudentInfoDetailData();
  },
  methods:{
    // 返回
    Back2Evaluate(path){
      this.$router.push({
        path: path
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //导出表格
    exportExcel (id) {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#'+id))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), id+'.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    //获取后端数据
    getStudentInfoDetailData:function () {
      let that = this;
      axios.get("/evaluate/student_achievement",{
        params:{
          stu_no: that.student_id
        }
      }).then(function (response){
          console.log(response.data);
          // if((response.data.code=='000000')&&(response.data.msg=='成功')){
          //   that.course_list = response.data.data.course_list;
          //   that.graduation_requirement_and_achievement = response.data.data.graduation_requirement_and_achievement;
          // }
          // else{alert('code或msg错误')}

          that.course_list = response.data.data.course_list;
          that.graduation_requirement_and_achievement = response.data.data.graduation_requirement_and_achievement;

          //雷达图
          var chartDom = document.getElementById('radar');
          var myChart = echarts.init(chartDom);
          var option;

          let indicator = [];
          let abilityAchievement = [];

          that.graduation_requirement_and_achievement.forEach(info => {
            let key =  info.graduation_requirement_name;
            let value = info.achievement;
            abilityAchievement[key] = value;
          })
          //变成数组形式
          let abilityAchievementKeys = Object.keys(abilityAchievement);
          let abilityAchievementValues = Object.values(abilityAchievement);

          abilityAchievementKeys.forEach(item => indicator.push({
            'name':item,
            'max':1
          }))

          option = {
            color: ['#8BA5C0'],
            radar: {
              indicator:indicator
            },
            series: [
              {
                name: 'comprehensive ability evaluation',
                type: 'radar',
                areaStyle: {},
                data: [
                  {
                    value: abilityAchievementValues
                  }
                ]
              }
            ]
          };
          option && myChart.setOption(option);

        },
        function (err) {
          console.log("error");
          alert("请求失败");
        },
      );
    },
  },
  created() {
    console.log('路由',this.$route.query)
    this.student_id=this.$route.query.student_id;
    this.student_name=this.$route.query.student_name;
    this.student_major=this.$route.query.student_major;
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
.btn_back{
  color: #000000;
  text-decoration: underline;

  font-size:12px;
}
.btn_back:hover,
.btn_back:focus{
  color: #555555;
  text-decoration: underline;
  font-size:12px;
}
hr{
  height: 1px;
  background: black;
  border:none;
}
.main_content{
  text-align: left;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85);
}
.title_btn{
  background-color: rgb(159, 181, 203);
  border-style: none;
}

</style>

<style class="lang">
.el-tabs__item{
  color: #ffffff;
  background-color: rgba(195,208,222,0.51);
}
.el-tabs__item.is-active{
  color: #000000;
  font-weight: bold;
  background-color: rgba(195, 208, 222, 0.8);
}
/*.el-tabs--card>.el-tabs__header .el-tabs__nav {*/
/*  border: none;*/
/*}*/
/*.el-tabs__nav-wrap::after{*/
/*  height: 0;*/
/*}*/
</style>
