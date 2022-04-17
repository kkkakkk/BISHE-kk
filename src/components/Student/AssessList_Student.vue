<template>
  <el-table
    :header-cell-style="{background:'#8BA5C0',color:'#ffffff',
    'text-align':'center','font-size':'14px'}"
    :row-style="{background:'#D8DFE6',color:'#000000',height:'40px'}"
    :cell-style="{'text-align':'center','font-size':'12px',padding:'0px'}"
    :data="AssessmentData"
    style="width: 100%"
    stripe>
    <el-table-column
      label="考核类型"
      >
      <template slot-scope="scope">
        <p>{{ scope.row.assess_type}}</p>
      </template>
    </el-table-column>

    <el-table-column
      label="任务标题"
      >
      <template slot-scope="scope">
        <p>{{ scope.row.assess_title}}</p>
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
      label="截止时间"
      >
      <template slot-scope="scope">
        <p>{{ scope.row.end_date}}</p>
      </template>
    </el-table-column>

    <el-table-column
      label=任务状态
      >
      <template slot-scope="scope">
        <p><el-tag :type="options[scope.row.status]['type']">{{options[scope.row.status]['label']}}</el-tag></p>

      </template>
    </el-table-column>

    <el-table-column
      label="查看"
      >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="text"
          class="view_btn"
          @click="ViewAssessInfo(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "AssessList_Student",
  props: ['course_name','course_id'],
  data() {
    return {
      course_n:this.course_name,
      course_i:this.course_id,
      AssessmentData: [],

      options: [
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
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    // 查看具体学生的评价
    ViewAssessInfo(assess_data){
      console.log(assess_data);

      this.$router.push({
        path: '/Student/AssessInfo_Student',
        query: {
          assess_id: assess_data.assess_id,
          assess_type:assess_data.assess_type,
          people_count:assess_data.people_count,
          assess_title:assess_data.assess_title,
          end_date:assess_data.end_date,
          report_url:assess_data.report_url,
          assess_course_ability_list:assess_data.assess_course_ability_list,
          assess_content:assess_data.assess_content,
          status:assess_data.status,

          course_name:this.course_n,
          course_id:this.course_i,
          //assess_data: encodeURIComponent(this.assess_data)
        }
      })
    },
    //获取后端数据
    getData:function () {
      let that = this;
      axios.get("/assess/assessment_list",{
        params:{
          // course_id: that.course_i
          course_id:'PKU10085-SE080902-0036-2019A-001'
        }
      }).then(function (response){
          console.log(response.data);
          if((response.data.code=='000000')&&(response.data.msg=='成功')){
            that.AssessmentData = response.data.data.assessment_list;
            // that.AssessmentData = [obj];
            // let obj = JSON.parse(response.data.data);
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
