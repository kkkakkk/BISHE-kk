
<template>
  <div class="main_container">
    {{this.$store.state.user_id}} - {{this.$store.state.identity}}
    <div>
      <el-row>
        <el-col :span="8">
          <div style="padding: 10px;border:2px solid #3b6998;background-color:white">
            <span style="font-weight: bold;font-size: 16px">考核任务方案</span>
            <br><br>
            <span style="font-size: 12px;color: grey">共{{this.assess_length}}个模块</span>
            <br><br>
            <!--{{this.assess_type}}-->
            <div v-for="(type,index) in this.assess_type" :key="index">
              <el-row>
                <el-col :span="12" style="font-size: 14px;color: grey;text-align: left;margin-bottom: 5px" >{{index}}</el-col>
                <el-col :span="12" style="font-size: 14px;color: grey;text-align: right" >{{type}}</el-col>
              </el-row>

            </div>
            <br>

          </div>

        </el-col>
        <el-col :span="16">
          <div style="padding: 10px;background-color:white;margin-left:10px">
            <span style="font-weight: bold;font-size: 16px">考核任务通知</span>
            <br>
          </div>
        </el-col>
      </el-row>
    </div>

    <br>

    <div class="SetBorder">
      <i class="el-icon-s-order" style="color:#345E8F "></i>
      <span style="font-weight: bold;font-size: 14px;color:#345E8F ">考核任务列表</span>
      <br><br>
      <el-table
        :header-cell-style="{background:'#F0F4F7',color:'#345E8F','text-align':'center'}"
        :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
        :cell-style="{padding:'0px',background:'#E3EAF0','text-align':'center'}"
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
          label="任务标题">
          <!--点击进去具体任务页面-->
          <template slot-scope="scope">
            <p style="cursor:pointer; text-decoration: underline" @click="">{{ scope.row.assess_title}}</p>
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
      <!--<AssessList :course_name="$props.course_name" :course_id="$props.course_id"></AssessList>-->
    </div>

  </div>

</template>

<script>
import AssessList from './AssessList'
import AssessInfo from './AssessInfo_Teacher'
import axios from "axios";
export default {
  name: "Assessment",
  props: ['course_name','course_id'],
  components:{
    AssessList,
    AssessInfo
  },
  data(){
    return{
      assess_type:{},
      assess_length:0,
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
      //0习题1实验2设计3期中考试4期末考试
    }
  },
  created() {
    let that = this;
    axios.get("/assess/assessment_list",{
      params:{
        course_id: that.course_id
      }
    }).then(function (response){
        if(response.data.code=='000000'){
          that.AssessmentData = response.data.data.assessment_list;
          var assessment_list = response.data.data.assessment_list;
          // console.log('assessment_list',assessment_list)

          var type_option={0:'习题',1:'实验',2:'设计',3:'期中考试',4:'期末考试'};
          var type=''
          for(var i=0;i<assessment_list.length;i++){

            type=type_option[assessment_list[i]['assess_type']]
            // console.log('assess_type:',type,assessment_list[i])

              if(type in that.assess_type){
                that.assess_type[type]=that.assess_type[type]+1
                // console.log(that.assess_type)
              }else {

                that.assess_type[type]=1
                // console.log(that.assess_type)
              }
            }
          console.log("类型:",that.assess_type)
          that.assess_length= Object.keys(that.assess_type).length


          }
        else{alert('code或msg错误')
        }
      },)
},
methods:{
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
}
}
</script>

<style scoped>

.SetBorder {
  border: 2px solid;
  border-radius: 5px;
  border-color: rgb(59, 105, 152);
  padding: 10px;
  position: relative;
}


</style>
