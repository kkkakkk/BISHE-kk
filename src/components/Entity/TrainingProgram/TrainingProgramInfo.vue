<template>
  <div>
    <div class="grid-content bg">
      <div style="display:flex">
        <el-button type="primary" class="button" size="small" style="float: left;">培养目标</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59,105,152);margin-left:10px"></div>
      </div>
<!--      <div>{{trainingProgramData}}</div>-->
      <p align="left">
        {{trainingProgramData.training_objective_content}}
        <br>
      </p>
      <p align="left" v-for = "(item,index) in trainingProgramData.training_subobjective_list">·目标{{item.training_subobjective_no}}：{{item.training_subobjective_content}}。<br></p>
    </div>
    <div  style="display:flex;margin-top:10px">
      <div class="grid-content grid-content-left bg" style="width:700px">
        <el-button type="primary" class="button" size="small" style="float: left;">毕业要求与毕业要求分指标</el-button>
        <br>
        <br>
        <p align="left" style="font-weight: bold" v-for = "(item,index) in trainingProgramData.graduation_requirement_list">{{index + 1}}.{{item.graduation_requirement_name}}:{{item.graduation_requirement_content}}
          <br>
          <span align="left" v-for = "(i,idx) in item.graduation_subrequirement_list" style="font-weight: normal">{{index + 1}}-{{i.graduation_subrequirement_no}}:{{i.graduation_subrequirement_content}}<br></span>
        </p>
      </div>
      <div class="grid-content-right" style="flex:1">
        <div style="padding-bottom:10px;text-align:center;color:#fff;font-size:12px;font-weight:700">毕业要求分指标对培养目标的支撑关系</div>
        <el-table :data="graduation_requirement_support_training_subobjective_table" class="stand1" border style="width: 100%">
          <el-table-column label="培养目标与毕业要求分指标" width="100px"  align="center">
            <template slot-scope="scope"  >
              <p >{{scope.row['培养目标与毕业要求分指标']}}</p>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in graduation_requirement_support_training_subobjective_table_header.slice(1)" :label="item" width="70px"  align="center">
            <template slot-scope="scope"  >
              <p >{{scope.row[item]}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="grid-content bg" style="margin-top:10px;border:2px solid rgb(59,105,152);border-radius:10px">
      <div class="top_title">
        <i class="el-icon-document " style="font-weight: 800">课程列表</i>
      </div>

      <el-table class="class-table" :data="trainingProgramData.curriculum_list.slice((curriculumCurrentPage-1)*curriculumPagesize,curriculumCurrentPage*curriculumPagesize)" style="width: 100%">
        <el-table-column prop="curriculum_id" label="课程ID" >
        </el-table-column>
        <el-table-column prop="curriculum_arch_type" label="课程类型" >
        </el-table-column>
        <el-table-column prop="curriculum_name" label="课程名称" >
        </el-table-column>
        <el-table-column prop="semester" label="开课学期" >
        </el-table-column>
        <el-table-column prop="credit" label="学分">
        </el-table-column>
        <el-table-column prop="class_hour" label="学时">
        </el-table-column>
        <el-table-column prop="is_compulsory" label="是否必修">
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :total="totalCurriculumPage"
          @current-change="curriculumPageChange"
          :current-page="curriculumCurrentPage"
          :page-size="curriculumPagesize"
        >
        </el-pagination>
      </div>
    </div>
    <div class="grid-content bg" style="margin-top:10px;border:2px solid rgb(59,105,152);border-radius:10px">
      <div style="display:flex;">
        <el-button type="primary" class="button" size="small" style="float: left;">课程对毕业要求分指标的支撑</el-button>
        <div style="flex:1;border-bottom:1px solid rgb(59,105,152);margin-left:10px" />
      </div>

      <el-table :data="curriculum_support_graduation_subrequirement_table" style="width: 100%;margin-top:15px" class="course-table">
        <el-table-column prop="毕业要求分指标" label="毕业要求分指标">
        </el-table-column>
        <el-table-column prop="强支撑课程1" label="强支撑课程1（支撑权重）" width="135">
        </el-table-column>
        <el-table-column prop="强支撑课程2" label="强支撑课程2（支撑权重）" width="135">
        </el-table-column>
        <el-table-column prop="强支撑课程3" label="强支撑课程3（支撑权重）" width="135">
        </el-table-column>
        <el-table-column prop="强支撑课程4" label="强支撑课程4（支撑权重）" width="135">
        </el-table-column>
        <el-table-column prop="强支撑课程5" label="强支撑课程5（支撑权重）" width="135">
        </el-table-column>
        <el-table-column prop="强支撑课程6" label="强支撑课程6（支撑权重）" width="135">
        </el-table-column>
      </el-table>
    </div>
    <div class="grid-content bg" style="margin-top:10px;border:2px solid rgb(59,105,152);border-radius:10px">
      <div class="grid-content_inner">

        <div v-for = "(item,index) in trainingProgramData.graduation_requirement_and_subrequirement_achievement.slice((graduationRequirementCurrentPage-1)*graduationRequirementPagesize,graduationRequirementCurrentPage*graduationRequirementPagesize)">
          <div class="top_title" style="text-align:center;color:#000;font-size:14px;margin-top:10px">毕业要求达成情况</div>
          <div class="comlet_item" style="width:100%">
            <div style="width:100%;font-weight:bold">
              <p align="left" style="float:left;margin-left:10px;font-size: smaller">毕业要求（{{ item.graduation_requirement_name }}）<br>
                {{item.graduation_requirement_content}}</p>
              <div class="grid-content-medium bg fr" style="width:121px;margin-bottom:20px;background-color: rgb(195,208,222);box-shadow:1px 1px 5px #333333 ;">
                <p>总达成度：{{item.graduation_requirement_achievement}}</p>
              </div>
            </div>
          </div>
          <el-row  v-for = "(i,idx) in item.graduation_subrequirement_achievement" :gutter="20" type="flex" class="row-bg" justify="space-around">
            <el-col :span="20">
              <div class="grid-content-medium bg" style="height: 54px">
                <p align="left">分指标{{i.graduation_subrequirement_no}}</p>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content-medium bg" style="background-color: rgb(195,208,222);box-shadow:1px 1px 5px #333333 ;">
                <p >达成度：{{i.graduation_subrequirement_achievement}}</p>
              </div>
            </el-col>
          </el-row>

        </div>
        <div class="block">
          <span class="demonstration"></span>
          <el-pagination
            layout="prev, pager, next"
            :total="totalGraduationRequirementPage"
            @current-change="graduationRequirementPageChange"
            :current-page="graduationRequirementCurrentPage"
            :page-size="graduationRequirementPagesize"
          >
          </el-pagination>
        </div>
      </div>

    </div>

    <div class="grid-content bg" style="margin-top:10px;border:2px solid rgb(59,105,152);border-radius:10px;padding:10px 20px">
      <p align="left" style="color:rgb(29,52,79)">{{trainingProgramData.training_program_major}} | 培养方案{{trainingProgramData.training_program_year}}改进意见</p>
      <div class="contetn">
        <div style="background:#fff;padding:10px;border-radius:6px">
          <p align="left">改进意见：</p><br>
          <p align="left">
            {{trainingProgramData.training_program_comment}}
          </p>
        </div>
      </div>

    </div>
    <!-- <el-row>
      <el-col :span="24">
        <div class="grid-content bg" style="margin-top:10px;border:1px solid rgb(59,105,152);border-radius:10px">
          <p align="left">软件工程 | 培养方案2021改进意见</p>
          <p align="left">
            改进意见：<br>
            整体培养方案设置合理！<br>
            培养目标设置合理，课程设置合理！</p>
        </div>
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
  import axios from "axios";
  import trainingProgram from "@/components/AcademicStaff/TrainingProgram";

  export default {
    name: "TrainingProgramInfo",
    data() {
      return {
        //page
        curriculumPagesize:5,
        curriculumCurrentPage:1,
        totalCurriculumPage:30,
        graduationRequirementPagesize:1,
        graduationRequirementCurrentPage:1,
        totalGraduationRequirementPage:12,
        // 教学目标
        trainingProgramData:{
          curriculum_list:[],
          graduation_requirement_and_subrequirement_achievement:[]
        },
        //support table
        curriculum_support_graduation_subrequirement_table_header:['毕业要求分指标','强支撑课程1','强支撑课程2','强支撑课程3','强支撑课程4','强支撑课程5','强支撑课程6'],
        curriculum_support_graduation_subrequirement_table:[],
        graduation_requirement_support_training_subobjective_table_header:['培养目标与毕业要求分指标'],
        graduation_requirement_support_training_subobjective_table:[],
        graduation_subrequirement_name_list:[],
        course_objective_content:'',
        tableData1: [{
          target: '毕业要求1（工程知识）',
          subTarget1: '√',
          subTarget2: '',
          subTarget3: '',
          subTarget4: ''
        }, {
          target: '毕业要求2（问题分析）',
          subTarget1: '√',
          subTarget2: '',
          subTarget3: '',
          subTarget4: ''
        },
          {
            target: '毕业要求3（设计/开发解决方案）',
            subTarget1: '√',
            subTarget2: '',
            subTarget3: '',
            subTarget4: '√'
          },
          {
            target: '毕业要求4（研究）',
            subTarget1: '√',
            subTarget2: '',
            subTarget3: '',
            subTarget4: '√'
          },
          {
            target: '毕业要求5（使用现代工具）',
            subTarget1: '√',
            subTarget2: '',
            subTarget3: '',
            subTarget4: '√'
          },
          {
            target: '毕业要求6（工程与社会）',
            subTarget1: '√',
            subTarget2: '',
            subTarget3: '',
            subTarget4: '√'
          },
        ],
        tableData3: [{
          subTarget: '01',
          strongSupportCourse1: '高等数学（0.25）',
          strongSupportCourse2: '大学物理（0.2）',
          strongSupportCourse3: '大学物理实验（0.1）',
          strongSupportCourse4: '概率统计（0.2）',
          strongSupportCourse5: '线性代数B（0.25）',
          strongSupportCourse6: ''
        }]
      }

    },
    methods: {
      curriculumPageChange:function(currentPage){
        this.curriculumCurrentPage = currentPage;
      },
      graduationRequirementPageChange:function(currentPage){
        this.graduationRequirementCurrentPage = currentPage;
      },
      makeGraduationRequirementSupportTrainingSubobjectiveTabel(dataSource){
        let subObjectLength = dataSource.training_subobjective_list.length
        for (let i = 1; i <= dataSource.training_subobjective_list.length; ++i) {
          this.graduation_requirement_support_training_subobjective_table_header.push('子目标'+i)
        }
        let graduation_requirement_list = dataSource.graduation_requirement_list
        let graduation_requirement_support_training_subobjective_list = dataSource.graduation_requirement_support_training_subobjective_list
        for (let i = 0; i < graduation_requirement_list.length; ++i) {
          let tmpdict = {}
          for (let j = 1; j <= dataSource.training_subobjective_list.length; ++j) {
            tmpdict[this.graduation_requirement_support_training_subobjective_table_header[j]] = ''
          }
          tmpdict['培养目标与毕业要求分指标'] = graduation_requirement_list[i].graduation_requirement_name
          for (let j = 0; j < graduation_requirement_support_training_subobjective_list.length; ++j) {
            if (graduation_requirement_support_training_subobjective_list[j].graduation_requirement_name == tmpdict['培养目标与毕业要求分指标']) {
              let tmpno = graduation_requirement_support_training_subobjective_list[j].training_subobjective_no
              tmpdict['子目标'+tmpno] = '√'
            }
          }
          console.log(tmpdict)
          this.graduation_requirement_support_training_subobjective_table.push(tmpdict)
        }

      },
      makeCurriculumSupportGraduationSubrequirementTable(dataSource,supportSource){
        // console.log(supportSource)
        let subObjectiveNo = []
        for (let i = 0; i < dataSource.length; ++i) {
          let left_num = dataSource[i].graduation_requirement_no
          for (let j = 0; j < dataSource[i].graduation_subrequirement_list.length; ++j) {
            let right_num = dataSource[i].graduation_subrequirement_list[j].graduation_subrequirement_no
            // console.log(left_num + '-' + right_num)
            let subrequirement_no = left_num + '-' + right_num
            let subrequirement_dict = {}
            subrequirement_dict['毕业要求分指标'] = subrequirement_no
            for (let k = 1; k <= 6; ++k) {
              subrequirement_dict['强支撑课程'+k] = ''
            }
            var pos = 1;
            for (let k = 0; k < supportSource.length; ++k) {
              // console.log(k.graduation_subrequirement_no)
              if (supportSource[k].graduation_subrequirement_no == subrequirement_no) {
                subrequirement_dict['强支撑课程'+pos] = supportSource[k].curriculum_name + '(' + supportSource[k].weight + ')'
                pos = pos + 1
              }
            }
            // console.log(subrequirement_dict)
            this.curriculum_support_graduation_subrequirement_table.push(subrequirement_dict)
          }
        }
      },
      getTrainingProgramData:function () {
        let that = this;

        axios.get("/data_query/training_program",{
          params:{
            training_objective_id: this.$route.query.training_program_id
            // training_objective_id:'PKU10085-SE080902-2019'
          }
        }).then(function (response){
            console.log(response.data);
            if((response.data.code=='000000')&&(response.data.msg=='成功')){
              that.trainingProgramData = response.data.data;
              that.totalCurriculumPage = that.trainingProgramData.curriculum_list.length
              console.log('that.totalCurriculumPage'+that.totalCurriculumPage)
              that.makeCurriculumSupportGraduationSubrequirementTable( response.data.data.graduation_requirement_list,response.data.data.curriculum_support_graduation_subrequirement_list)
              that.makeGraduationRequirementSupportTrainingSubobjectiveTabel(response.data.data)
            }
            else{alert('code或msg错误')}
          },
          function (err) {
            console.log("error");
            alert("请求失败");
          }
        );
      },
    },
    created() {
      this.getTrainingProgramData()
    }

  }

</script>

<style scoped>
  .grid-content {
    border-radius: 10px;
    min-height: 100px;
    padding: 10px
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 200px;
    margin-right: 10px
  }

  .grid-content-right {
    border-radius: 4px;
    min-height: 200px;
    padding: 10px;
    background-color: rgb(86, 128, 168)
    /*width: 400px;*/
  }

  .grid-content-narrow {
    border-radius: 4px;
    min-height: 10px;
  }

  .grid-content-medium {
    border-radius: 4px;
    min-height: 20px;
    padding: 10px;
    height: 54px;
  }

  .grid-content-medium>p {
    padding: 10px
  }

  .bg {
    background: #ebeff4;
  }

  .button {
    background-color: #3b6998;
    font-weight: bold;
    border: none;
    font-weight: 700
  }

  .bg-white {
    background-color: white;
  }

  p {
    font-size: 2px;
  }

  h5 {
    color: #3b6998;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /deep/ .el-table tr {
    background-color: rgb(198, 212, 225)
  }

  /deep/ .el-table th.el-table__cell {
    background-color: rgb(198, 212, 225)
  }

  .top_title {
    text-align: left;
    margin: 10px;
    color: rgb(59, 105, 152);
    font-size: 14px;
    font-weight: 800
  }

  /deep/ .btn-prev {
    background-color: transparent
  }

  /deep/ .el-pager .number {
    background-color: transparent
  }

  /deep/ .btn-next {
    background-color: transparent
  }

  .grid-content_inner {
    padding: 10px;
    background-color: rgb(151, 174, 196);
    border-radius: 10px;
    overflow: hidden;
  }

  .comlet_item {
    display: flex;

  }

  /deep/ .row-bg {
    background: transparent
  }

  .contetn {
    background: rgb(229, 235, 241);
    padding: 10px
  }
  /deep/.stand1 td{
    color: #000 ;
    font-size: 11px;
    padding: 5px 0;
  }
  /deep/ .stand1 th{
    color: #000 ;
    font-size: 11px;
  }

  /deep/ .class-table th.el-table__cell{
    background: transparent;
    color: rgb(9, 9, 70);
    font-size: 12px;
  }

  /deep/ .class-table th{
    border-bottom: 1px solid #3b6998!important;
  }
  /deep/ .class-table tr{
    background: transparent;
    font-size: 12px;
  }
  .class-table{
    background: transparent;
  }

  /deep/ .course-table th{
    background: rgb(86, 128, 168)!important;
    color: #000;
    font-size: 12px;
  }
  .el-table{
    font-size: 12px;
  }

  .fr{
    float: right;
  }
</style>
