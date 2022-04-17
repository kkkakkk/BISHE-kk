<template>
  <el-container>
    <el-header style="height:40px" class="as_title">
      <div>教学进度状态监控</div>
      <hr/>
    </el-header>
    <el-main class="main_content">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in this.training_program_monitor_data_list" :label="item.training_program_major+' | '+item.training_program_year">
          <el-row class="bottom_row">
            <el-col span="17">

              <el-row class="course_start_graph">
                <el-col span="7">
                  <p>开课情况</p>
                  <span style="font-size: 20px">200</span>
                  <span>已开课</span>
                  <span style="font-size: 20px;color: #9b1445">300</span>
                  <span style="color: #9b1445">异常</span>
                  <div :key="index" :id="'pie'+index" style="width: 100%;height: 200px"></div>


                </el-col>
<!--                <el-divider direction="vertical"></el-divider>-->
                <el-col span="17">
                  <p>异常开课情况<i class="el-icon-warning-outline"></i></p>
                  <el-table
                    :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                    'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                    :row-style="{background:'#ffffff',color:'#606266',height:'30px'}"
                    :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
                    :data="item.training_program_monitor_data.course_start_graph.abnormal_course_list"
                    style="width: 100%">

                    <el-table-column
                      label="课程名称"
                      width="145">
                      <template slot-scope="scope">
                        <p>{{ scope.row.course_name }}</p>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="开课时间"
                      width="100">
                      <template slot-scope="scope">
                        <p>{{ scope.row.start_date	 }}</p>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="逾期时长"
                      width="80">
                      <template slot-scope="scope">
                        <p style="color: #9b1445">{{ scope.row.overdue_days }}</p>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="授课老师"
                      width="80">
                      <template slot-scope="scope">
                        <p>{{ scope.row.teacher_name }}</p>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="课程状态"
                      width="80">
                      <template slot-scope="scope">
                        <p style="color: #9b1445">{{ scope.row.course_status }}</p>
                      </template>
                    </el-table-column>

                  </el-table>
                </el-col>

              </el-row>

              <el-row class="course_start_graph">
                <p>考核任务情况<i class="el-icon-warning-outline"></i></p>
              </el-row>

            </el-col>
            <el-col span="7">
              <el-row style="text-align: right">
                <span><el-button size="mini" class="notification_button">查看培养方案详情</el-button></span>
                <span><el-button size="mini" class="notification_button">查看课程进度详情</el-button></span>
              </el-row>
              <el-row class="notification">
                <div style="color: #3B6998">
                  <span><i class="el-icon-date"></i> 课程进度通知板</span>
                  <span style="margin-left: 115px">{{ getdate() }}</span>
                </div>
                <hr/>
                <div class="notification_content">
                  <span style="color: #3B6998">课程</span>
                  <span style="margin-left: 10px">数据结构</span>
                  <span style="margin-left: 20px"><el-button size="mini" class="notification_button" style="color: #5dacff">课程信息</el-button></span>
                  <p style="color: #606266;font-size: 10px">请通知老师</p>
                </div>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="abnormal_assessment">
            <el-col span="11.7">
              考核任务发布异常
              <span>
                异常考核任务数：{{item.training_program_monitor_data.abnormal_assessment_publishment_table.abnormal_num}}
              </span>

              <el-table
                :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                :row-style="{background:'#f0f4f7',color:'#606266',height:'30px'}"
                :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
                :data="item.training_program_monitor_data.abnormal_assessment_publishment_table.abnormal_assessment_list"
                style="width: 100%;margin-top: 5px">

                <el-table-column
                  label="课程名称"
                  width="87">
                  <template slot-scope="scope">
                    <p>{{ scope.row.course_name }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="任务标题"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.assessment_title }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="开始时间"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.assessment_start_date	 }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="逾期时长"
                  width="80">
                  <template slot-scope="scope">
                    <p style="color: #9b1445">{{ scope.row.overdue_days }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="授课老师"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.teacher_name }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="任务状态"
                  width="80">
                  <template slot-scope="scope">
                    <p style="color: #9b1445">{{ scope.row.assessment_start_date }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>

            <el-col span="11.1" style="margin-left: 10px">
              考核任务提交异常
              <span>
                异常考核任务数：{{item.training_program_monitor_data.abnormal_assessment_submission_table.abnormal_num}}
              </span>

              <el-table
                :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                :row-style="{background:'#f0f4f7',color:'#606266',height:'30px'}"
                :cell-style="aas_cellStyle"
                :data="item.training_program_monitor_data.abnormal_assessment_submission_table.abnormal_assessment_list"
                style="width: 100%;margin-top: 5px">

                <el-table-column
                  label="课程名称"
                  width="87">
                  <template slot-scope="scope">
                    <p>{{ scope.row.course_name }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="任务标题"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.assessment_title }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="应提交"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.total_requirement_num	 }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="已提交数"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.submitted_num }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="未提交"
                  width="80">
                  <template slot-scope="scope">
                    <p style="color: #9b1445">{{ scope.row.not_submitted_num }}</p>
                  </template>
                </el-table-column>

                <el-table-column
                  label="授课老师"
                  width="80">
                  <template slot-scope="scope">
                    <p>{{ scope.row.teacher_name }}</p>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row class="abnormal_achievement">
            <el-row>
              课程达成度计算异常
              <span>
                考核任务批改异常：无数据
              </span>
              <span>
                考试成绩上传异常：无数据
              </span>
              <span>
                课程支撑权重确认异常：无数据
              </span>
            </el-row>
            <el-row style="background-color: #ebeff4;margin-top: 5px;font-size: 10px;padding: 10px">
              <el-col span="11">考核任务批改异常
                <el-table
                  :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                  'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                  :row-style="{background:'#ffffff',color:'#606266',height:'30px'}"
                  :cell-style="aacl_cellStyle"
                  :data="item.training_program_monitor_data.abnormal_achievement_table.abnormal_assessment_check_list"
                  style="width: 100%;margin-top: 5px;">

                  <el-table-column
                    label="课程名称"
                    width="103">
                    <template slot-scope="scope">
                      <p>{{ scope.row.course_name }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="任务标题"
                    width="80">
                    <template slot-scope="scope">
                      <p>{{ scope.row.assessment_title }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="应批改"
                    width="60">
                    <template slot-scope="scope">
                      <p>{{ scope.row.total_requirement_check_num	 }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="已批改"
                    width="60">
                    <template slot-scope="scope">
                      <p>{{ scope.row.checked_num }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="未批改"
                    width="60">
                    <template slot-scope="scope">
                      <p style="color: #9b1445">{{ scope.row.not_check_num }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="授课老师"
                    width="80">
                    <template slot-scope="scope">
                      <p>{{ scope.row.teacher_name }}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>

              <el-col span="8" style="margin-left: 10px">考试成绩上传异常
                <el-table
                  :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                  'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                  :row-style="{background:'#ffffff',color:'#606266',height:'30px'}"
                  :cell-style="aaul_cellStyle"
                  :data="item.training_program_monitor_data.abnormal_achievement_table.abnormal_assessment_upload_list"
                  style="width: 100%;margin-top: 5px;">

                  <el-table-column
                    label="课程名称"
                    width="103">
                    <template slot-scope="scope">
                      <p>{{ scope.row.course_name }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="任务标题"
                    width="80">
                    <template slot-scope="scope">
                      <p>{{ scope.row.assessment_title }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="逾期"
                    width="60">
                    <template slot-scope="scope">
                      <p style="color: #9b1445;background-color: #decbd7">{{ scope.row.overdue_days }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="授课老师"
                    width="80">
                    <template slot-scope="scope">
                      <p>{{ scope.row.teacher_name }}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>

              <el-col span="2.9" style="margin-left: 10px">课程支撑权重确认异常
                <el-table
                  :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px',
                  'border-top':'solid 1px #7695b5','border-left':'solid 1px #7695b5','border-right':'solid 1px #7695b5'}"
                  :row-style="{background:'#ffffff',color:'#606266',height:'30px'}"
                  :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
                  :data="item.training_program_monitor_data.abnormal_achievement_table.abnormal_course_support_confirm_list"
                  style="width: 100%;margin-top: 5px;">

                  <el-table-column
                    label="课程名称"
                    width="101">
                    <template slot-scope="scope">
                      <p>{{ scope.row.course_name }}</p>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="授课老师"
                    width="80">
                    <template slot-scope="scope">
                      <p>{{ scope.row.teacher_name }}</p>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-row>

          <el-row class="course_comment">
            课程评价情况<i class="el-icon-warning-outline"></i>
            <el-table
              :header-cell-style="{background:'#ebeff4',color:'#264161','text-align':'center','font-size':'12px'}"
              :row-style="{background:'#ffffff',color:'#606266',height:'30px'}"
              :cell-style="{'text-align':'center','font-size':'10px',padding:'0px'}"
              :data="item.training_program_monitor_data.course_comment_list"
              style="width: 100%;margin-top: 5px;">

              <el-table-column
                label="课程名称"
                width="150">
                <template slot-scope="scope">
                  <p>{{ scope.row.course_name }}</p>
                </template>
              </el-table-column>

              <el-table-column
                label="课程类型"
                width="120">
                <template slot-scope="scope">
                  <p>{{ scope.row.course_type }}</p>
                </template>
              </el-table-column>

              <el-table-column
                label="评价组评议"
                width="300">
                <template slot-scope="scope">
                  <p>{{ scope.row.course_evaluation_comment }}</p>
                </template>
              </el-table-column>

              <el-table-column
                label="老师自评"
                width="300">
                <template slot-scope="scope">
                  <p>{{ scope.row.teacher_self_comment }}</p>
                </template>
              </el-table-column>

<!--              后期需转化标签-->
              <el-table-column
                label="课程状态"
                width="115">
                <template slot-scope="scope">
                  <p>{{ scope.row.course_status }}</p>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <el-row class="graduation_requirement_achievement">
            <el-col span="8">
              毕业要求达成情况
            </el-col>

            <el-col span="16"></el-col>
          </el-row>

        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
// import echarts from 'echarts';
import * as echarts from 'echarts';
export default {
  name: "AcademicStaffMonitor",
  data() {
    return {
      training_program_monitor_data_list:[]
    };
  },
  mounted() {
    this.getASMData();
    // this.training_program_monitor_data_list.map((v, index) => {
    //   let chartDom = document.getElementById('pie' + index);/* 动态绑定容器元素 */
    //   let myChart = echarts.init(chartDom);
    //   myChart.setOption(this.setData(index));
    // });
  },
  methods: {
    //切换标签页时触发
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 设置表格某列背景
    aas_cellStyle({columnIndex}){
      if(columnIndex === 4){
        return 'text-align:center;font-size:10px;padding:0px;background-color: #efd8e0'
      }else{
        return 'text-align:center;font-size:10px;padding:0px'
      }
    },
    aacl_cellStyle({columnIndex}){
      if(columnIndex === 4){
        return 'text-align:center;font-size:10px;padding:0px;background-color: #decbd7'
      }else{
        return 'text-align:center;font-size:10px;padding:0px'
      }
    },
    aaul_cellStyle({columnIndex}){
      if(columnIndex === 2){
        return 'text-align:center;font-size:10px;padding:0px;background-color: #decbd7'
      }else{
        return 'text-align:center;font-size:10px;padding:0px'
      }
    },
    // setData(index) {
    //   return {
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     legend: {
    //       bottom: '5%',
    //       left: 'center'
    //     },
    //     color: ['#3b6998', '#e9e9e9', '#b7b2c8', '#c4d1de'],
    //     series: [
    //       {
    //         name: '开课情况',
    //         type: 'pie',
    //         radius: ['40%', '70%'],
    //         avoidLabelOverlap: false,
    //         itemStyle: {
    //           borderRadius: 10,
    //           borderColor: '#fff',
    //           borderWidth: 2
    //         },
    //         label: {
    //           show: false,
    //           position: 'center'
    //         },
    //         emphasis: {
    //           label: {
    //             show: false
    //           }
    //         },
    //         labelLine: {
    //           show: false
    //         },
    //         data: [
    //           { value: 1048, name: '已开课' },
    //           { value: 735, name: '未开课' },
    //           { value: 580, name: '已结课' },
    //           { value: 484, name: '结课中' }
    //         ]
    //       }
    //     ]
    //   }
    // },
    //获取后端数据
    getASMData:function () {
      let that = this;
      axios.get("/data_query/get_monitor_data_by_training_program",{
        params:{
          school_no: that.school_no
        }
      }).then(function (response){
          console.log(response.data);
          // if((response.data.code=='000000')&&(response.data.msg=='success')){
          if(true){
            that.training_program_monitor_data_list = response.data.data.training_program_monitor_data_list;

            //环形图
            that.training_program_monitor_data_list.map((v, index) => {
              var chartDom = document.getElementById('pie' + index);/* 动态绑定容器元素 */
              var myChart = echarts.init(chartDom);
              // myChart.setOption(this.setData(index));
              var option;
              option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  bottom: '5%',
                  left: 'center'
                },
                color: ['#3b6998', '#e9e9e9', '#b7b2c8', '#c4d1de'],
                series: [
                  {
                    name: '开课情况',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                    },
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: [
                      { value: 1048, name: '已开课' },
                      { value: 735, name: '未开课' },
                      { value: 580, name: '已结课' },
                      { value: 484, name: '结课中' }
                    ]
                  }
                ]
              };
              option && myChart.setOption(option);
            });
          }
          else{alert('code或msg错误')}
        },
        function (err) {
          console.log("error");
          alert("请求失败");
        },
      );
    },
    // 获取某月某日
    getdate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = month + "月" + strDate + "日";
      return currentdate;
    },
  }
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
.main_content{
  text-align: left;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.847058823529412);
  font-size: 13px;
  font-family:'Microsoft YaHei Regular', 'Microsoft YaHei';
}
.course_start_graph{
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.notification{
  background-color: #ebeff4;
  margin-top: 20px;
  margin-left: 10px;
  border-bottom-color: #3B6998;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.notification_content{
  padding: 5px;
}
.notification_button{
  background-color: #ecf5ff;
  border-color: #b3d8ff;
  border-radius: 6px;
}
/*设置最后两列高度一致*/
.bottom_row{
  display: flex;
  flex-wrap: wrap;
}
.abnormal_assessment{
  background-color: white;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px #3B6998 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.abnormal_assessment span{
  font-size: 10px;
  color: #9b1445;
  margin-left: 8px;
}
.abnormal_achievement{
  background-color: white;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.abnormal_achievement span{
  font-size: 10px;
  color: #9b1445;
  margin-left: 8px;
}
.course_comment{
  background-color: white;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px #3B6998 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.graduation_requirement_achievement{
  background-color: white;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>

<style class="ASM">
.el-tabs__item{
  color: #274466;
}
.el-tabs__item.is-active{
  color: #274466;
  font-weight: bold;
}

.el-tabs__active-bar {
  background-color: #274466;
}


</style>
