<template>
  <el-container>
    <el-header style="height:40px" class="as_title">
      <div>教学进度状态监控</div>
      <hr/>
    </el-header>
    <el-main class="main_content">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in this.training_program_monitor_data_list"
                     :label="item.training_program_major+' | '+item.training_program_year">
          <el-row style="text-align: right;margin-bottom: 5px">
            <span><el-button size="mini" class="notification_button">查看培养方案详情</el-button></span>
            <span><el-button size="mini" class="notification_button">查看课程进度详情</el-button></span>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="4" class="course_start_graph"></el-col>
            <el-col :span="5" class="course_start_graph"></el-col>
            <el-col :span="5" class="course_start_graph"></el-col>
            <el-col :span="5" class="course_start_graph"></el-col>
            <el-col :span="5" class="course_start_graph"></el-col>
          </el-row>

          <el-row class="course_start_graph">
            <p>考核任务情况<i class="el-icon-warning-outline"></i></p>
            <span style="font-size: 18px">
                    {{item.training_program_monitor_data.assessment_graph.total_published_curriculum_assessment_num}}
                  </span>
            <span>已发布</span>
            <span style="font-size: 18px">
                    {{item.training_program_monitor_data.assessment_graph.total_unpublished_curriculum_assessment_num}}
                  </span>
            <span>未发布</span>
            <span style="font-size: 18px;color: #9b1445">
                    {{item.training_program_monitor_data.assessment_graph.total_abnormal_curriculum_assessment_num}}
                  </span>
            <span style="color: #9b1445">异常</span>
            <div :id="'bar_charts'+index" style="width: 1020px;height:300px;margin-top: -200px"></div>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" >
              <div class="course_start_graph">
                <div :id="'pie_charts'+index" style="width: 200px;height:250px;margin-left: -20px;margin-top: -50px"></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="course_start_graph">

              </div>
            </el-col>
            <el-col :span="8">
              <div class="course_start_graph">
                <p>毕业要求达成情况</p>
                <div :id="'radar_charts'+index" style="width: 300px;height: 300px;"></div>
                <p style="text-align: center;">达成情况雷达图</p>
              </div>
            </el-col>
          </el-row>

          <el-row class="graduation_requirement_achievement">
            <p>毕业要求达成情况</p>
            <div :id="'bar2_charts'+index" style="width: 1000px;height: 350px"></div>
          </el-row>

          <el-row class="bottom_row">
            <el-col :span="17">
              <el-row class="course_start_graph">
                <el-col :span="7">
                  <p>开课情况</p>
                  <span style="font-size: 20px">
                    {{item.training_program_monitor_data.course_start_graph.started_course_num}}
                  </span>
                  <span>已开课</span>
                  <span style="font-size: 20px;color: #9b1445">
                    {{item.training_program_monitor_data.course_start_graph.abnormal_course_num}}
                  </span>
                  <span style="color: #9b1445">异常</span>
                </el-col>
                <el-col :span="17">
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
            </el-col>
            <el-col :span="7">
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
            <el-col :span="11.7">
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

            <el-col :span="11.1" style="margin-left: 10px">
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
                考核任务批改异常：
                {{Object.keys(item.training_program_monitor_data.abnormal_achievement_table.abnormal_assessment_check_list).length}}
              </span>
              <span>
                考试成绩上传异常：
                {{Object.keys(item.training_program_monitor_data.abnormal_achievement_table.abnormal_assessment_upload_list).length}}
              </span>
              <span>
                课程支撑权重确认异常：
                {{Object.keys(item.training_program_monitor_data.abnormal_achievement_table.abnormal_course_support_confirm_list).length}}
              </span>
            </el-row>
            <el-row style="background-color: #ebeff4;margin-top: 5px;font-size: 10px;padding: 10px">
              <el-col :span="11">考核任务批改异常
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

              <el-col :span="8" style="margin-left: 10px">考试成绩上传异常
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

              <el-col :span="2.9" style="margin-left: 10px">课程支撑权重确认异常
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
      training_program_monitor_data_list:[],
      currentPage:1,
      pageData:[1,2,3,4,5,6,7,8,9,10,11,12]
    };
  },
  mounted() {
    this.getASMData();
  },
  methods: {
    //切换标签页时触发
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // //页面切换
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    // },
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
    //开课情况环形图
    getCharts_pie(index,pie_value){
      var chartDom = document.getElementById('pie_charts'+index);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '0%',
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
              { value: pie_value[0], name: '已开课' },
              { value: pie_value[1], name: '未开课' },
              { value: pie_value[2], name: '已结课' },
              { value: pie_value[3], name: '结课中' }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    //考核任务情况柱状图
    getCharts_bar(index,bar_published_assessment_num, bar_unpublished_assessment_num,
                  bar_abnormal_assessment_num,bar_curriculum_name){
      var chartDom = document.getElementById('bar_charts'+index);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          bottom: '5%',
          left: 'left'
        },
        grid: {
          left: '25%',
          right: '4%',
          top:'60%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: bar_curriculum_name
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '已发布考核任务数',
            type: 'bar',
            stack: 'Ad',
            color:'#5470c6',
            emphasis: {
              focus: 'series'
            },
            data: bar_published_assessment_num
          },
          {
            name: '未发布考核任务数',
            type: 'bar',
            stack: 'Ad',
            color:'#91cc75',
            emphasis: {
              focus: 'series'
            },
            data: bar_unpublished_assessment_num
          },
          {
            name: '异常考核任务数',
            type: 'bar',
            stack: 'Ad',
            color:'#9b1445',
            emphasis: {
              focus: 'series'
            },
            data: bar_abnormal_assessment_num
          },
        ]
      };
      option && myChart.setOption(option);
    },
    //毕业要求达成情况雷达图
    getCharts_radar(index,radar_graduation_requirement_achievement_name,
                    radar_graduation_requirement_achievement_value){
      var chartDom = document.getElementById('radar_charts'+index);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: ['#8BA5C0'],
        radar: {
          //有正式数据换回来
          // indicator:[{name:radar_graduation_requirement_achievement_name}]
          indicator:[{name:'indicator'},{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'}]
        },
        series: [
          {
            name: 'comprehensive ability evaluation',
            type: 'radar',
            areaStyle: {},
            data: [
              {
                // value: radar_graduation_requirement_achievement_value
                value:[1,2,3,2,3,1]
              }
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    //毕业要求子目标达成情况柱形图
    getCharts_bar2(index,radar_graduation_requirement_achievement_name,
                   radar_graduation_subrequirement_achievement_list){

      // console.log('函数这里',radar_graduation_subrequirement_achievement_list)
      // console.log('长度',radar_graduation_subrequirement_achievement_list.length)
      // console.log('第一个',radar_graduation_subrequirement_achievement_list[0])

      let radar_graduation_subrequirement_achievement_name = [];
      let radar_graduation_subrequirement_achievement_value = [];
      // for(let page=0;page<12;page++){ //之后恢复
      for(let page=0;page<radar_graduation_subrequirement_achievement_list.length;page++){

        //将分指标的name和value分开
        let exchange_graduation_subrequirement_achievement_name = [];
        let exchange_graduation_subrequirement_achievement_value = [];

        radar_graduation_subrequirement_achievement_list[page].map((sub_item, sub_index) => {
          exchange_graduation_subrequirement_achievement_name.push(sub_item.graduation_subrequirement_achievement_name);
          exchange_graduation_subrequirement_achievement_value.push(sub_item.graduation_subrequirement_achievement_value);
        })
        // console.log('这里',exchange_graduation_subrequirement_achievement_name)
        radar_graduation_subrequirement_achievement_name.push(exchange_graduation_subrequirement_achievement_name);
        radar_graduation_subrequirement_achievement_value.push(exchange_graduation_subrequirement_achievement_value)
      }

      console.log('全部',radar_graduation_subrequirement_achievement_name)

      //后台value不是数字，之后换回radar_graduation_subrequirement_achievement_value
      var mon_data = [[120,89,49,23,22],[53,78,99,63,44,55],[11,94,80,66],
        [13,54,40],[11,23,22], [120,89,49,23,22],[53,78,99,63,44,55],
        [11,94,80,66],[13,54,40],[11,23,22], [120,89,49,23,22],[53,78,99,63,44,55]];

      var myChart = echarts.init(document.getElementById('bar2_charts'+index));
      var option={
        timeline:{
          axisType: 'category',
          autoPlay: false,
          playInterval: 1500,
          data:[1,2,3,4,5,6,7,8,9,10,11,12]
        },
        options: [{
          tooltip: {
            'trigger': 'axis'
          },
          grid: {
            'bottom': '20%',
            'left':'left',
            'containLabel': true
          },
          xAxis:[{
            'type':'value',
          }],
          // 第1页 对应 option
          yAxis:[{
            'type':'category',
            'data':radar_graduation_subrequirement_achievement_name[0],
          }],
          title: {'subtext': radar_graduation_requirement_achievement_name[0]},
          series: [{
            'name':'达成情况',
            'type':'bar',
            'data': mon_data[0]
          }]
        },
        {// 第2页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[1]},
          series : [{'data': mon_data[1]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[1]}]
        },
        {// 第3页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[2]},
          series : [{'data': mon_data[2]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[2]}]
        },
        {// 第4页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[3]},
          series : [{'data': mon_data[3]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[3]}]
        },
        {// 第5页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[4]},
          series : [{'data': mon_data[4]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[4]}]
        },
        {// 第6页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[5]},
          series : [{'data': mon_data[5]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[5]}]
        },
        {// 第7页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[6]},
          series : [{'data': mon_data[6]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[6]}]
        },
        {// 第8页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[7]},
          series : [{'data': mon_data[7]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[7]}]
        },
        {// 第9页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[8]},
          series : [{'data': mon_data[8]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[8]}]
        },
        {// 第10页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[9]},
          series : [{'data': mon_data[9]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[9]}]
        },
        {// 第11页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[10]},
          series : [{'data': mon_data[10]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[10]}]
        },
        {// 第12页 对应 option
          title: {'subtext': radar_graduation_requirement_achievement_name[11]},
          series : [{'data': mon_data[11]}],
          yAxis:[{'data':radar_graduation_subrequirement_achievement_name[11]}]
        }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    //获取后端数据
    getASMData:function () {
      let that = this;
      axios.get("/data_query/get_monitor_data_by_training_program",{
        params:{
          // 未写好
          school_no: that.school_no
        }
      }).then(function (response){
          // console.log(response.data);
          // if((response.data.code=='000000')&&(response.data.msg=='success')){
          if(true){
            that.training_program_monitor_data_list = response.data.data.training_program_monitor_data_list;

            // 数据改变之后，在nextTick刷新chart
            that.training_program_monitor_data_list.map((v, index) => {
              let pie_value = [];
              pie_value.push(v.training_program_monitor_data.course_start_graph.started_course_num,
                v.training_program_monitor_data.course_start_graph.not_start_course_num,
                v.training_program_monitor_data.course_start_graph.ended_course_num,
                v.training_program_monitor_data.course_start_graph.ending_course_num);

              let bar_published_assessment_num = [];
              let bar_unpublished_assessment_num = [];
              let bar_abnormal_assessment_num = [];
              let bar_curriculum_name = [];
              v.training_program_monitor_data.assessment_graph.curriculum_assessment_list.map((bar_item, bar_index) => {
                bar_published_assessment_num.push(bar_item.published_assessment_num);
                bar_unpublished_assessment_num.push(bar_item.unpublished_assessment_num);
                bar_abnormal_assessment_num.push(bar_item.abnormal_assessment_num);
                bar_curriculum_name.push(bar_item.curriculum_name);
              });

              let radar_graduation_requirement_achievement_name = [];
              let radar_graduation_requirement_achievement_value = [];
              let radar_graduation_subrequirement_achievement_list = [];
              v.training_program_monitor_data.graduation_requirement_achievement_list.map((radar_item, radar_index) => {
                radar_graduation_requirement_achievement_name.push(radar_item.graduation_requirement_achievement_name);
                radar_graduation_requirement_achievement_value.push(radar_item.graduation_requirement_achievement_value);
                radar_graduation_subrequirement_achievement_list.push(radar_item.graduation_subrequirement_achievement_list)
              });

              that.$nextTick(() => {
                that.getCharts_pie(index,pie_value)
                that.getCharts_bar(index,bar_published_assessment_num,bar_unpublished_assessment_num,
                  bar_abnormal_assessment_num,bar_curriculum_name)
                that.getCharts_radar(index,radar_graduation_requirement_achievement_name,
                  radar_graduation_requirement_achievement_value)
                that.getCharts_bar2(index,radar_graduation_requirement_achievement_name,
                  radar_graduation_subrequirement_achievement_list)
              })
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
.sub_requirement_achievement{
  background-color: white;
  padding: 10px;
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
