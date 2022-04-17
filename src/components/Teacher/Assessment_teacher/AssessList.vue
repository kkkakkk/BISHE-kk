<template>
  <div>
    <el-header class="as_title" style="height:40px;">
      <el-row :gutter="4">
        <el-col :span="4">
          <div style="color:#345E8F; font-size: 80%; margin:0 auto; text-align: left; margin:8px auto">考核方式</div>
        </el-col>
        <el-col :span="20">
          <div>
            <el-input placeholder="实验一"   class="searchClass"></el-input>
          </div>
        </el-col>
      </el-row>
      <div style="height:1px; width:900px; background-color:rgb(59,105,152); margin-top:4px"></div>
      <br>
    </el-header>
    <br>
    <el-table
      :header-cell-style="{background:'#F0F4F7',color:'#345E8F',}"
      :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
      :cell-style="{padding:'0px',background:'#E3EAF0'}"
      :data="this.AssessmentData"
      style="width: 100%"
      stripe>
      <el-table-column
        label="考核类型"
        prop="assess_type"
        :formatter="formatAssessType"
      >
      </el-table-column>
      <el-table-column
        label="任务标题"
        >
        <template slot-scope="scope">
          <p style="cursor:pointer; text-decoration: underline" @click="changeAssessment(scope.row)">{{ scope.row.assess_title}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        >
        <template slot-scope="scope">
          <p>{{ scope.row.start_date}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="截至时间"
        >
        <template slot-scope="scope">
          <p>{{ scope.row.end_date}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="任务状态"
        >
        <template slot-scope="scope">
          <p><el-tag :type="assess_status_options[scope.row.status]['type']">{{assess_status_options[scope.row.status]['label']}}</el-tag></p>
        </template>
      </el-table-column>
    </el-table>
    <el-divider class="Divider"></el-divider>
    <AssessInfo_Teacher
      ref="childComponent"
      :assess_row="this.assess_row"
      :homework_data_table = "this.homework_data_table"
      :homework_data_table_header = "this.homework_data_table_header"
    >
    </AssessInfo_Teacher>
  </div>
</template>

<script>
import axios from "axios";
import AssessInfo_Teacher from './AssessInfo_Teacher'
export default {
  name: "AssessManager",
  components:{
    AssessInfo_Teacher
  },
  data() {
    return {
      assess_status:-1,
      assess_row:'',
      AssessmentData:[],
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
      homework_data:'',
      homework_data_table:[],
      homework_data_table_header:[],
      fake_homework_data : [
        {
          stu_homework_status: 1,
          stu_major: "软件工程",
          stu_name: "phw",
          stu_homework_url: "https://www.obe.com/PKU10085/assess_homework/phw.doc",
          stu_no: "202011223344",
          stu_ability_score_list: [
            {
              ability_name: "B班能力二",
              ability_comment: "这个能力还可以再提高，看其后续表现",
              ability_score: "B",
              ability_feedback: "做得不错"
            },
            {
              ability_name: "B班能力三",
              ability_comment: "满意",
              ability_score: "A",
              ability_feedback: "做得很好"
            }
          ]
        },
        {
          stu_homework_status: 0,
          stu_major: "软件工程",
          stu_name: "sgh",
          stu_homework_url: "",
          stu_no: "202011556677",
          stu_ability_score_list: [
            {
              ability_name: "B班能力二",
              ability_comment: "",
              ability_score: "C",
              ability_feedback: ""
            },
            {
              ability_name: "B班能力三",
              ability_comment: "",
              ability_score: "",
              ability_feedback: ""
            }
          ]
        },
      ]
    }
  },
  created() {
    this.getData()
  },
  methods:{
    //同时还包括了批改学生作业的editable情况
    makeHomeworkDataToTable() {
      this.homework_data_table_header = []
      this.homework_data_table = []
      for (let i = 0; i < this.homework_data.length; ++i) {
        let tmp = {}
        // if (this.homework_data[i].stu_homework_status == 0) tmp["stu_homework_status"] = '未提交'
        // if (this.homework_data[i].stu_homework_status == 1) tmp["stu_homework_status"] = '已提交'
        tmp["stu_homework_status"] = this.homework_data[i].stu_homework_status
        tmp["stu_major"] = this.homework_data[i].stu_major
        tmp["stu_name"] = this.homework_data[i].stu_name
        tmp["stu_homework_url"] = this.homework_data[i].stu_homework_url
        tmp["stu_no"] = this.homework_data[i].stu_no
        tmp["disabled"] = true
        for (let j = 0; j < this.homework_data[i].stu_ability_score_list.length; ++j) {
          let ability_name = this.homework_data[i].stu_ability_score_list[j].ability_name
          tmp[ability_name] = this.homework_data[i].stu_ability_score_list[j].ability_score
          tmp[ability_name+'的反馈意见'] = this.homework_data[i].stu_ability_score_list[j].ability_feedback
          tmp[ability_name+'的评价意见'] = this.homework_data[i].stu_ability_score_list[j].ability_comment
          if (i == 0) {
            this.homework_data_table_header.push(ability_name)
            this.homework_data_table_header.push(ability_name + '的反馈意见')
            this.homework_data_table_header.push(ability_name + '的评价意见')
          }
        }

        this.homework_data_table.push(tmp)
      }

    },
    changeAssessment(r) {
      this.assess_row = r

      this.$refs.childComponent.handleRemove();

      if (this.assess_row.status==1 && (this.assess_row.assess_type == 0 || this.assess_row.assess_type == 1 || this.assess_row.assess_type == 2)) {
        this.getHomeworkData()
        this.homework_data = this.fake_homework_data
        this.makeHomeworkDataToTable()
      }
    },
    formatAssessType(row) {
      if (row.assess_type == '0') {
        return "习题"
      }
      if (row.assess_type == '1') {
        return "实验"
      }
      if (row.assess_type == '2') {
        return "设计"
      }
      if (row.assess_type == '3') {
        return "期中考试"
      }
      if (row.assess_type == '4') {
        return "期末考试"
      }
      return ''
    },
    getHomeworkData() {
      let that = this;
      axios.get("/assess/student_homework",{
        params:{
          course_id: that.course_id
        }
      }).then(function (response){
          if((response.data.code=='000000')&&(response.data.msg=='成功')){
            that.homework_data = response.data.data.stu_homework_list;
          }
          else{alert('code或msg错误')}
        },
        function (err) {
          console.log("error");
          alert("请求失败");
        }
      );
    },
    getData:function () {
      let that = this;
      axios.get("/assess/assessment_list",{
        params:{
          course_id: that.course_id
        }
      }).then(function (response){
          if((response.data.code=='000000')&&(response.data.msg=='成功')){
            that.AssessmentData = response.data.data.assessment_list;
            console.log(that.AssessmentData)
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
.as_title{
  font-weight:bold;
  font-size:16px;
  font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
}

.view_btn{
  color: #000000;
  text-decoration: underline;
}
.Divider {
  color:#345E8F;
  display: block;
  height: 1px;
  width: 100%;
  margin: 40px 24px;
}
hr{
  height: 1px;
  width: 100%;
  background: black;
  border:none;
}
.box{
  text-align:center;
//  font-size: 0;
}

</style>
.searchClass{
width: 200px;
height: 30px;
border: 1px solid #345E8F;
border-radius: 15px;
background: #000000;
padding:8px 2%;
}
